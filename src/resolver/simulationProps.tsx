import { getSchematicPointIndex, getSortedPoints } from "../services/geometryUtilities"
import { CompletionType, SchematicCompletion, SchematicPoint, SchematicSimulationData } from "./schematicProps"

export const TUBING = 'Tubing'
export const STINGER = 'Stinger'
export const INFLOW_CONTROL = 'Inflow control'
export const SCREEN = 'Sand control'
export const LINER = 'Casing / Liner'
export const RESERVOIR = 'Reservoir'

export const getNumLayer = (layerName: string): number => {
    if (layerName == TUBING)
        return 1
    else if (layerName == STINGER)
        return 2
    else if (layerName == INFLOW_CONTROL)
        return 3
    else if (layerName == SCREEN)
        return 4
    else if (layerName == LINER)
        return 5
    else if (layerName == RESERVOIR)
        return 6
    else
        return 7
}

export const sortSimulationResults = (param1: any, param2: any): number => {
    if (param1.MD == param2.MD)
        return getNumLayer(param1.layerName) - getNumLayer(param2.layerName)
    else
        param1.MD - param2.MD
}

export interface SimulationDataZone {
    dataObject: any,
    points: Array<SchematicPoint>,
    inner?: number
    outer?: number
}

export interface FlowZone {
    flowRate: SchematicSimulationData,
    points: Array<SchematicPoint>,
    influxInnerRate?: number,
    influxOuterRate?: number,
}

export interface FlowPath {
    X: number
    Y: number

    rotate: number
    scale: number

    flowRate: number
    influxRate: number
}

export interface ColorizedPath {
    inner: number
    outer: number
    points: Array<SchematicPoint>
    color: string
}

export interface FilterDataZone {
    dataObject: any
    inner: number
    outer: number
}

export const getDataZone = (filterZones: Array<FilterDataZone>, sortedCompletionPoints: Array<SchematicPoint>): Array<SimulationDataZone> => {
    const returnZones = new Array<SimulationDataZone>()
    const uniqueLayers: Array<string> = new Array
    filterZones.forEach(simulationData => { if (!uniqueLayers.includes(simulationData.dataObject.layerName)) uniqueLayers.push(simulationData.dataObject.layerName) })
    uniqueLayers.forEach(uniqueLayer => {
        filterZones
            .filter(filterZone => { return filterZone.dataObject.layerName == uniqueLayer })
            .sort((filterZone1, filterZone2) => { return filterZone1.dataObject.MD - filterZone2.dataObject.MD })
            .forEach((filterZone, index, self) => {

                if (self.length == 1) {
                    // one point on all segment
                    returnZones.push({
                        dataObject: filterZone.dataObject,
                        points: sortedCompletionPoints,
                        inner: filterZone.inner,
                        outer: filterZone.outer
                    })
                }
                else {
                    const schematicPointIndex = getSchematicPointIndex(sortedCompletionPoints, filterZone.dataObject.MD)
                    if (index != self.length - 1) {
                        const nextSchematicPoint = self[index + 1]
                        const nextSchematicPointIndex = getSchematicPointIndex(sortedCompletionPoints, nextSchematicPoint.dataObject.MD)

                        // check first point
                        if (index == 0 && schematicPointIndex != 0) {
                            returnZones.push({
                                dataObject: filterZone.dataObject,
                                points: sortedCompletionPoints.slice(0, schematicPointIndex + 1),
                                inner: filterZone.inner,
                                outer: filterZone.outer
                            })
                        }

                        returnZones.push({
                            dataObject: filterZone.dataObject,
                            points: sortedCompletionPoints.slice(schematicPointIndex, nextSchematicPointIndex + 1),
                            inner: filterZone.inner,
                            outer: filterZone.outer
                        })
                    }
                    else if (schematicPointIndex != sortedCompletionPoints.length - 1) {
                        returnZones.push({
                            dataObject: filterZone.dataObject,
                            points: sortedCompletionPoints.slice(schematicPointIndex),
                            inner: filterZone.inner,
                            outer: filterZone.outer
                        })
                    }
                }
            })
    })
    return returnZones
}

// Use this method to find zones between segments (pressure, flow rate, temperature)
export const searchZones = (sortedData: Array<any>, schematicCompletion: SchematicCompletion, includeRange: boolean): Array<SimulationDataZone> => {

    const sortedCompletionPoints = getSortedPoints(schematicCompletion.points)
    //const sortedCompletionPoints = schematicCompletion.points

    const firstCompletionPoint = sortedCompletionPoints[0]
    const backCompletionPoint = sortedCompletionPoints[sortedCompletionPoints.length - 1]

    const filterData = new Array<FilterDataZone>()
    // tubing
    const tubingRadius = schematicCompletion.layers != undefined && schematicCompletion.layers.filter(s => s.completionName != CompletionType.JUNCTION_HTML).length > 0
        ? schematicCompletion.layers
            .filter(layer => layer.completionName != CompletionType.JUNCTION_HTML)
            .sort((layer1, layer2) => { return layer1.inner - layer2.inner })[0].inner
        : schematicCompletion.viewDiameterWell / 2
    sortedData.filter((simulationData) => {
        return simulationData.MD >= firstCompletionPoint.MD
            && (includeRange ? simulationData.MD <= backCompletionPoint.MD : simulationData.MD < backCompletionPoint.MD)
            && simulationData.outer <= tubingRadius
            && simulationData.layerName == TUBING
    }).forEach((simulationData) => filterData.push({ dataObject: simulationData, inner: 0, outer: tubingRadius }))

    if (schematicCompletion.layers != undefined && schematicCompletion.layers.length > 0) {
        schematicCompletion.layers
            .filter(layer => layer.completionName != CompletionType.JUNCTION_HTML)
            .sort((layer1, layer2) => { return layer1.inner - layer2.inner })
            .forEach((layer, index, self) => {
                // between layers
                if (index != self.length - 1) {
                    const inner = layer.outer
                    const outer = self[index + 1].inner
                    sortedData.filter((simulationData) => {
                        return simulationData.MD >= firstCompletionPoint.MD
                            && (includeRange ? simulationData.MD <= backCompletionPoint.MD : simulationData.MD < backCompletionPoint.MD)
                            && simulationData.inner >= inner && simulationData.outer <= outer
                    }).forEach((simulationData) => filterData.push({ dataObject: simulationData, inner: inner, outer: outer }))
                }
                // annulus layer
                if (index == self.length - 1) {
                    const outer = layer.outer
                    sortedData.filter((simulationData) => {
                        return simulationData.MD >= firstCompletionPoint.MD
                            && (includeRange ? simulationData.MD <= backCompletionPoint.MD : simulationData.MD < backCompletionPoint.MD)
                            && simulationData.inner >= outer && simulationData.outer <= schematicCompletion.viewDiameterWell / 2
                    }).forEach((simulationData) => filterData.push({ dataObject: simulationData, inner: outer, outer: schematicCompletion.viewDiameterWell / 2 }))
                }
            })
    }

    if (filterData.length == 0 && !includeRange) {
        return searchZones(sortedData, schematicCompletion, true)
    }

    // reservoir layer (for fractions)
    sortedData.filter((simulationData) => {
        return simulationData.MD >= firstCompletionPoint.MD
            && (includeRange ? simulationData.MD <= backCompletionPoint.MD : simulationData.MD < backCompletionPoint.MD)
            && simulationData.layerName == RESERVOIR
    }).forEach((simulationData) => filterData.push({ dataObject: simulationData, inner: simulationData.inner, outer: simulationData.outer }))

    return getDataZone(filterData, sortedCompletionPoints)
}


// Use this method to find zones across segments (influx rates)
export const searchInfluxZones = (sortedData: Array<any>, schematicCompletion: SchematicCompletion): Array<SimulationDataZone> => {
    //const sortedCompletionPoints = getSortedPoints(schematicCompletion.points)
	const sortedCompletionPoints = schematicCompletion.points
	
    const firstCompletionPoint = sortedCompletionPoints[0]
    const backCompletionPoint = sortedCompletionPoints[sortedCompletionPoints.length - 1]

    var filterData = new Array<FilterDataZone>()
    filterData = sortedData.filter(influxRate => {
        return influxRate.MD >= firstCompletionPoint.MD && influxRate.MD < backCompletionPoint.MD &&
            (influxRate.layerName == RESERVOIR
            || schematicCompletion.layers == undefined
            || schematicCompletion.layers.length == 0
            || schematicCompletion.layers.length > 0
        && schematicCompletion.layers.filter(layer => {
            return layer.completionName != CompletionType.SECTION_PACKER_HTML
                && layer.completionName != CompletionType.BLANK_PIPE_HTML
                && layer.completionName != CompletionType.JUNCTION_HTML
                        && layer.layerName == influxRate.layerName
                }).length > 0)
    }).map(simulationData => { return { dataObject: simulationData, inner: simulationData.inner, outer: simulationData.outer } })
    return getDataZone(filterData, sortedCompletionPoints)
}

// Special search for rates - combination of influx and flow rate
// Compare to completions and expand points (example: -|-|-| will stay |--|-|, where '|' is FlowPoint) or |-- -> |--|
export function searchFlowZones(sortedCompletions: Array<SchematicCompletion>, sortedFlowRates: Array<SchematicSimulationData>, sortedInfluxRates: Array<SchematicSimulationData>): Array<FlowZone> {
    const mixFlowZones: Array<FlowZone> = new Array
    sortedCompletions.forEach((schematicCompletion) => {
        const flowZones = searchZones(sortedFlowRates, schematicCompletion, false)
        const influxZones = searchInfluxZones(sortedInfluxRates, schematicCompletion)

        flowZones.forEach(flowZone => {

            const beginFlowPoint = flowZone.points[0]
            const backFlowPoint = flowZone.points[flowZone.points.length - 1]

            var added = false
            // Try to init inner influx zone
            {
                influxZones.filter(influxZone => {
                    const beginInfluxPoint = influxZone.points[0]
                    const backInfluxPoint = influxZone.points[influxZone.points.length - 1]
                    return influxZone.dataObject.outer == flowZone.dataObject.inner &&
                        (beginInfluxPoint.MD <= beginFlowPoint.MD && backInfluxPoint.MD >= backFlowPoint.MD
                            || beginInfluxPoint.MD > beginFlowPoint.MD && beginInfluxPoint.MD < backFlowPoint.MD
                            || backInfluxPoint.MD > beginFlowPoint.MD && backInfluxPoint.MD < backFlowPoint.MD)
                }).forEach(influxZone => {
                    const beginInfluxPoint = influxZone.points[0]
                    const backInfluxPoint = influxZone.points[influxZone.points.length - 1]
                    added = true
                    mixFlowZones.push({
                        flowRate: flowZone.dataObject,
                        influxInnerRate: influxZone.dataObject.value,
                        points: flowZone.points.filter((point) => point.MD >= beginInfluxPoint.MD && point.MD <= backInfluxPoint.MD)
                    })
                })
            }
            // Try to init outer influx zone
            {
                influxZones.filter(influxZone => {
                    const beginInfluxPoint = influxZone.points[0]
                    const backInfluxPoint = influxZone.points[influxZone.points.length - 1]

                    return influxZone.dataObject.inner == flowZone.dataObject.outer &&
                        (beginInfluxPoint.MD <= beginFlowPoint.MD && backInfluxPoint.MD >= backFlowPoint.MD
                            || beginInfluxPoint.MD > beginFlowPoint.MD && beginInfluxPoint.MD < backFlowPoint.MD
                            || backInfluxPoint.MD > beginFlowPoint.MD && backInfluxPoint.MD < backFlowPoint.MD)
                }).forEach(influxZone => {
                    const beginInfluxPoint = influxZone.points[0]
                    const backInfluxPoint = influxZone.points[influxZone.points.length - 1]
                    added = true

                    const addedZones = mixFlowZones.filter(addedZone => { return addedZone.flowRate == flowZone.dataObject && addedZone.points[0].MD >= beginInfluxPoint.MD })
                    if (addedZones.length == 0) {
                        // Doesn't exist zone which was added earlier with influx inner rate
                        mixFlowZones.push({
                            flowRate: flowZone.dataObject,
                            influxOuterRate: influxZone.dataObject.value,
                            points: flowZone.points.filter((point) => point.MD >= beginInfluxPoint.MD && point.MD <= backInfluxPoint.MD)
                        })
                    } else {
                        addedZones.forEach(addedZone => addedZone.influxOuterRate = influxZone.dataObject.value)
                    }
                })
            }
            // Don't have influx 
            if (!added) {
                mixFlowZones.push({
                    flowRate: flowZone.dataObject,
                    points: flowZone.points
                })
            }
        })
    })

    // Collision flow rates to influx rates. Split zones
    var index1 = 0
    while (index1 < mixFlowZones.length) {
        var flowZone1 = mixFlowZones[index1]
        var index2 = index1 + 1
        while (index2 < mixFlowZones.length) {
            var flowZone2 = mixFlowZones[index2]
            if (flowZone1 != flowZone2 &&
                flowZone1.flowRate.inner == flowZone2.flowRate.inner &&
                flowZone1.flowRate.outer == flowZone2.flowRate.outer &&
                flowZone1.points[0].MD <= flowZone2.points[0].MD &&
                flowZone2.points[flowZone2.points.length - 1].MD <= flowZone1.points[flowZone1.points.length - 1].MD) {
                // New splitted zones
                const newFlowZones: Array<FlowZone> = new Array
                // Begin      |---flowZone1---|---flowZone2---|
                if (flowZone1.points[0].MD < flowZone2.points[0].MD) {
                    var newFlowZone: FlowZone = {
                        flowRate: flowZone1.flowRate,
                        points: flowZone1.points.filter(p => p.MD <= flowZone2.points[0].MD),
                        influxInnerRate: flowZone1.influxInnerRate,
                        influxOuterRate: flowZone1.influxOuterRate
                    }
                    newFlowZones.push(newFlowZone)
                }
                // Middle      |---flowZone1---|---flowZone2---|---flowZone1---|
                {
                    var newFlowZone: FlowZone = {
                        flowRate: flowZone1.flowRate,
                        points: flowZone2.points,
                        influxInnerRate: flowZone2.influxInnerRate != undefined ? flowZone2.influxInnerRate : flowZone1.influxInnerRate,
                        influxOuterRate: flowZone2.influxOuterRate != undefined ? flowZone2.influxOuterRate : flowZone1.influxOuterRate,
                    }
                    newFlowZones.push(newFlowZone)
                }
                // End         |---flowZone2---|---flowZone1---|
                if (flowZone2.points[flowZone2.points.length - 1].MD < flowZone1.points[flowZone1.points.length - 1].MD) {
                    var newFlowZone: FlowZone = {
                        flowRate: flowZone1.flowRate,
                        points: flowZone1.points.filter(p => p.MD >= flowZone2.points[flowZone2.points.length - 1].MD),
                        influxInnerRate: flowZone1.influxInnerRate,
                        influxOuterRate: flowZone1.influxOuterRate
                    }
                    newFlowZones.push(newFlowZone)
                }
                if (newFlowZones.length > 1) {
                    // We have non-trivial collision. Remove previous zones and add 2 or 3 new zones
                    mixFlowZones.splice(index1, 1) // remove element with index1
                    mixFlowZones.splice(index2 > index1 ? index2 - 1 : index2, 1) // remove element with index2
                    mixFlowZones.splice(index1, 0, ...newFlowZones)    // add new elements

                    index1 = index1 - 1                // go to previous element before deleted
                    index2 = index1 + 1                // index2 is looking for the next elements
                    flowZone1 = mixFlowZones[index1]
                    continue
                }
                else {
                    // We have simple collision with the same coordinates. Remove element with index2
                    mixFlowZones.splice(index2, 1)
                    if (index2 < index1) {
                        index1 = index1 - 1
                        flowZone1 = mixFlowZones[index1]
                    }
                }
            }
            index2 = index2 + 1
        }
        index1 = index1 + 1
    }

    return mixFlowZones
}