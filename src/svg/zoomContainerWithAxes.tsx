import * as d3 from "d3"
import * as React from 'react'
import { useEffect, useState } from "react"
import { SCHEMATIC_UNIT_LENGTH, UnitVariant } from "../resolver/schematicProps"
import { fromInternal, getUnitName } from "../services/commonUtilities"
import { useSvg } from "./stage"

export const ZoomContainerWithAxes: React.FC<Map<string, UnitVariant>> = (units) => {
    const svgElement = useSvg()
    const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 })

    var selection: any

    const initD3 = (): any => {
        const animValWidth = svgElement.width.animVal.value
        // magic React + SVG
        const animValHeight = svgElement.height.animVal.value
        if (animValWidth == 0 || animValHeight == 0)
            window.setTimeout(initD3, 100)
        else {

            // set the dimensions and margins of the graph
            const margin = { top: 20, right: 0, bottom: 50, left: 50 },
                width = animValWidth - margin.left - margin.right,
                height = animValHeight - margin.top - margin.bottom

            selection = d3.select(svgElement)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)

            // set X data
            var xData = d3.scaleLinear()
                .domain([fromInternal(margin.left, units, SCHEMATIC_UNIT_LENGTH), fromInternal(width, units, SCHEMATIC_UNIT_LENGTH)])
                .range([margin.left, width])
            // Add X axis
            var xAxis = selection.append("g")
                .attr("key", "x_axis_group")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xData))

            // set X label
            selection.append("text")
                .attr("key", "x_label_text")
                .attr("transform",
                    "translate(" + (width / 2) + " ," +
                    (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .style("font-family", "sans-serif")
                .text("Deviation [" + getUnitName(units, SCHEMATIC_UNIT_LENGTH) + "]")

            //set Y data
            var yData = d3.scaleLinear()
                .domain([fromInternal(margin.top, units, SCHEMATIC_UNIT_LENGTH), fromInternal(height, units, SCHEMATIC_UNIT_LENGTH)])
                .range([margin.top, height])
            // Add Y axis
            var yAxis = selection.append("g")
                .attr("key", "y_axis_group")
                .attr("transform", "translate(" + margin.left + ", 0)")
                .call(d3.axisLeft(yData))

            // text label for the y axis
            selection.append("text")
                .attr("key", "y_label_text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x", - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .style("font-family", "sans-serif")
                .text("TVD [" + getUnitName(units, SCHEMATIC_UNIT_LENGTH) + "]")

            var xGrid = selection.append("g")
                .attr('class', 'grid')
                .attr("id", "grid")
                .attr("key", "x_grid_group")
                .attr("transform", "translate(0, " + height + ")")
                .style("stroke-dasharray", ("3,3"))
                .style("stroke-width", "0.5px")
                .call(d3.axisBottom(xData)
                    .ticks(8)
                    .tickSize(-height + margin.top)
                    .tickFormat(""))

            var yGrid = selection.append("g")
                .attr('class', 'gridY')
                .attr("id", "gridY")
                .attr("key", "y_grid_group")
                .attr("transform", "translate(" + margin.left + ", 0)")
                .style("stroke-dasharray", ("3,3"))
                .style("stroke-width", "0.5px")
                .call(d3.axisLeft(yData)
                    .ticks(9)
                    .tickSize(-width + margin.left)
                    .tickFormat("")
                )

            // Add a clipPath: everything out of this area won't be drawn.
            selection.append("defs").append("SVG:clipPath")
                .attr("id", "clip")
                .attr("key", "d3_clipPath")
                .append("SVG:rect")
                .attr("key", "d3_clipRect")
                .attr("width", width - margin.left)
                .attr("height", height - margin.top)
                .attr("x", margin.left)
                .attr("y", margin.top)
            selection.select("#clipRect").attr("clip-path", "url(#clip)")

            const zoom = d3.zoom().on("zoom", function (event) {
                var newX = event.transform.rescaleX(xData)
                var newY = event.transform.rescaleY(yData)
                // update axes with these new boundaries
                xAxis.call(d3.axisBottom(newX))
                yAxis.call(d3.axisLeft(newY))

                xGrid.call(d3.axisBottom(newX)
                    .ticks(8)
                    .tickSize(-height + margin.top)
                    .tickFormat(""))

                yGrid.call(d3.axisLeft(newY)
                    .ticks(9)
                    .tickSize(-width + margin.left)
                    .tickFormat("")
                )

                setTransform(event.transform)
            })
            selection.call(zoom)

            const box = selection.select("#schematicCanvas").node().getBBox()
            if (box.height != 0) {
                const scale = Math.min(width / (box.width + margin.left), height / box.height)

                // Reset transform.
                var transform = d3.zoomIdentity
                // Center [0, 0].
                transform = transform.translate((width + margin.left) / 2, height / 2)
                // Apply scale.
                transform = transform.scale(scale)
                // Center elements.
                transform = transform.translate(-box.x - box.width / 2, -box.y - box.height / 2)
                zoom.transform(selection, transform)
            }
        }
    }

    useEffect(() => {
        if (!svgElement)
            return
        initD3()
        if (selection == null)
            return

        return () => selection.on(".zoom", null)
    }, [svgElement])

    return <g key="zoomContainerWithAxes" id="clipRect"><g key="schematicCanvasWithAxes" id="schematicCanvas" transform={`translate(${x}, ${y}) scale(${k})`}>{units.children}</g></g>
}