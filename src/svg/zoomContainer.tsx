import * as React from 'react'
import { useEffect } from "react"
import { GlobalObserver } from '../resolver/globalObserver'
import { JavaResolver } from '../resolver/javaResolver'
import { Listener } from '../resolver/observer'
import { ResolverFactory } from '../resolver/resolverFactory'
import { TestResolver } from '../resolver/testResolver'
import { WebsocketResolver } from '../resolver/websocketResolver'
import { useSvg } from "./stage"
const svgPanZoom = require('svg-pan-zoom')
const throttle = require('lodash.throttle')

/**
 * Simple zoom container to display simulation results and "Deviation schematic"
 * Use vanilla JS so the fastest way to display data
 * 
 * @param props only to allow access to children into th group 
 */

const onZoomIn: Listener<void> = { update: (_: void) => { } }
const onZoomOut: Listener<void> = { update: (_: void) => { } }
const onZoomReset: Listener<void> = { update: (_: void) => { } }

export const ZoomContainer = React.forwardRef<{}, { children: React.ReactNode }>((props, ref) => {
	const svgElement = useSvg()
	const [panZoom, setPanZoom] = React.useState(null)

	var fictivePoint

	useEffect(() => {
		if (!svgElement)
			return

		if (fictivePoint == null && !(ResolverFactory.getResolver() instanceof TestResolver)) {
			fictivePoint = svgElement.createSVGPoint()
		}

		const beforePan = function (_, newPan) {
			return newPan
		}
		const newPanZoom = svgPanZoom(svgElement, {
			zoomEnabled: true,
			fit: 1,
			center: 1,
			maxZoom: 1000,
			minZoom: 0.001,
			beforePan: beforePan,
			onUpdatedCTM: 
				throttle((ctm) => {
					if (fictivePoint != null) {
						fictivePoint.x = 0
						fictivePoint.y = 0
						var pointLeftUpCorner = fictivePoint.matrixTransform(ctm.inverse())

						fictivePoint.x = svgElement.getBoundingClientRect().width
						fictivePoint.y = svgElement.getBoundingClientRect().height
						var pointRightDownCorner = fictivePoint.matrixTransform(ctm.inverse())

						if (ResolverFactory.getResolver() instanceof JavaResolver || ResolverFactory.getResolver() instanceof WebsocketResolver) {
							ResolverFactory.getResolver().onUpdatePanZoom({
								leftUpCornerX: pointLeftUpCorner.x,
								leftUpCornerY: pointLeftUpCorner.y,
								rightDownCornerX: pointRightDownCorner.x,
								rightDownCornerY: pointRightDownCorner.y,
								realZoom: newPanZoom.getSizes().realZoom
							})
						}
					}
				}, 300, { 'leading': false, 'trailing': true })
		})
		onZoomIn.update = () => { newPanZoom.zoomIn() }
		onZoomOut.update = () => { newPanZoom.zoomOut() }
		onZoomReset.update = () => { newPanZoom.resetZoom() }
		GlobalObserver.getInstance().observableZoomIn.attach(onZoomIn)
		GlobalObserver.getInstance().observableZoomOut.attach(onZoomOut)
		GlobalObserver.getInstance().observableZoomReset.attach(onZoomReset)

		setPanZoom(newPanZoom)
	}, [svgElement])

	//React.useImperativeHandle(ref, () => ({
	//	updateZoom(expand: boolean) {
	//		if (panZoom != null) {
	//			panZoom.resize()
	//			panZoom.fit()
	//			panZoom.center()
	//		}
	//	},
	//	fitZoom() {
	//		if (panZoom != null) {
	//			panZoom.resize()
	//			panZoom.fit()
	//			panZoom.center()
	//		}
 //       }
	//}))

	return <g key="zoomContainer">{props.children}</g>
})