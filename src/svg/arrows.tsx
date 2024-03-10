import * as React from "react"
import { ObservablePanZoomType, ObservableScheduleType, ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { SchematicCompletion, SchematicSimulationResults, SchematicDirection, SchematicSimulationData, SchematicPoint, ScheduleParameters, WellTrajectory, CompletionType } from "../resolver/schematicProps"
import { FlowPath, FlowZone, searchFlowZones, sortSimulationResults } from "../resolver/simulationProps"
import { getArrowOffsetMD, getPointOffset, getRotateAngle } from "../services/geometryUtilities"

interface Props {
    // All model data (rates, temperature, pressure...) with MD
    simulationResults: Array<SchematicSimulationResults>
    // Completions
    completions: Array<SchematicCompletion>
    // Time schedule or Oil rate to get num to extract data from simulationResults
    currentschedule: ScheduleParameters
    // All points of well
    wellTrajectory: WellTrajectory
    // If true = no Tree Head.
    horizontalWell: boolean
}

interface State {
    // all model data (rates, temperature, pressure...) with MD
    simulationResults: Array<SchematicSimulationResults>
    // completions
    completions: Array<SchematicCompletion>
    // Time schedule or Oil rate to get num to extract data from simulationResults
    currentschedule: ScheduleParameters
}

const onChangePanZoom: Listener<ObservablePanZoomType> = { update: () => void {} }
const onChangeSchedule: Listener<ObservableScheduleType> = { update: () => { } }
const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: () => void {} }

export const ArrowsComponent: React.FC<Props> = (props) => {

    const [arrowsState, setArrowsState] = React.useState<State>({ ...props })

    // For server solution
    React.useEffect(() => {
        if (ResolverFactory.getResolver().isInitiated()) {
            ResolverFactory.getResolver().observablePanZoom.attach(onChangePanZoom)
            ResolverFactory.getResolver().observableSchedule.attach(onChangeSchedule)
            ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)
        }
        onChangePanZoom.update = (updatedData: ObservablePanZoomType) => {
            setArrowsState({ ...updatedData, currentschedule: arrowsState.currentschedule })
        }
        onChangeSchedule.update = (updateData: ObservableScheduleType) => {
            setArrowsState({ ...updateData, completions: arrowsState.completions })
        }
        onChangeViewDiameterWell.update = (updatedData: ObservableViewDiameterWellType) => {
            setArrowsState({ ...updatedData, currentschedule: arrowsState.currentschedule })
        }
    })

    const ARROW_HEIGHT_ORIG = 29.104

    const sortedCompletions = props.completions
        .filter(completion => {
            return completion.layers == undefined || completion.layers.length == 0
                || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
        })
        .sort((completion1, completion2) => { return completion1.points[0].MD - completion2.points[0].MD })

    const flowPathes: Array<FlowPath> = new Array

    var globalIndexPoint = 0
    const getOffsetGlobalPoint = (schematicPoint: SchematicPoint, arrowMD: number): SchematicPoint => {
        while (props.wellTrajectory.points[globalIndexPoint].MD != schematicPoint.MD) {
            globalIndexPoint++
            if (globalIndexPoint == props.wellTrajectory.points.length)
                globalIndexPoint = 0
        }

        if (arrowMD < schematicPoint.MD) {
            // should take prevoius global point
            if (globalIndexPoint == 0)
                return null
            else
                return props.wellTrajectory.points[globalIndexPoint - 1]
        } else {
            // should take next global point (Always)
            if (globalIndexPoint == props.wellTrajectory.points.length - 1)
                return null
            else
                return props.wellTrajectory.points[globalIndexPoint + 1]
        }
    }

    const searchFlowPathes = (sortedFlowRates: Array<SchematicSimulationData>, sortedInfluxRates: Array<SchematicSimulationData>) => {
        const mixFlowZones: Array<FlowZone> = searchFlowZones(sortedCompletions, sortedFlowRates, sortedInfluxRates)

        mixFlowZones.forEach(flowZone => {

            // calculate size of arrow rectangle
            var countArrows: number = 2    // default value when we don't have influx  
            if (flowZone.influxInnerRate != undefined
                && flowZone.influxOuterRate != undefined
                && Math.sign(flowZone.influxInnerRate) != Math.sign(flowZone.influxOuterRate))
                countArrows = 3
            var ARROW_LENGTH = (flowZone.flowRate.outer - flowZone.flowRate.inner) / countArrows
            if (flowZone.points[flowZone.points.length - 1].MD - flowZone.points[0].MD < ARROW_LENGTH)
                ARROW_LENGTH = (flowZone.points[flowZone.points.length - 1].MD - flowZone.points[0].MD) / countArrows
            var indexSchematicPoint = 0
            var arrowMD = flowZone.points[indexSchematicPoint].MD
            while (arrowMD + ARROW_LENGTH < flowZone.points[flowZone.points.length - 1].MD ||
                flowZone.points[flowZone.points.length - 1].MD - flowZone.points[0].MD < ARROW_LENGTH) {

                const scaleArrow = ARROW_LENGTH / ARROW_HEIGHT_ORIG
                // Move to the next schematic point and break if we are in the end
                while (indexSchematicPoint + 1 < flowZone.points.length && arrowMD > flowZone.points[indexSchematicPoint + 1].MD)
                    indexSchematicPoint = indexSchematicPoint + 1
                if ((indexSchematicPoint + 1) == flowZone.points.length)
                    break
                const upSchematicPoint = flowZone.points[indexSchematicPoint]
                const downSchematicPoint = getOffsetGlobalPoint(upSchematicPoint, arrowMD)
                const shiftSchematicPoint = getArrowOffsetMD(upSchematicPoint, downSchematicPoint, arrowMD)

                // Check first arrows. Miss first row of arrows if Tree Head is drawn 
                if (!props.horizontalWell
                    && upSchematicPoint.MD == props.wellTrajectory.points[0].MD
                    && arrowMD == upSchematicPoint.MD
                    && shiftSchematicPoint.sinInclination != 1.0
                ) {
                    arrowMD = arrowMD + ARROW_LENGTH
                    continue
                }

                // Draw row of arrows
                var arrowRadius = flowZone.flowRate.inner
                while (true) {
                    const arrowPoint = getPointOffset(shiftSchematicPoint, arrowRadius, SchematicDirection.RIGHT_HAND_SIDE)
                    var newFlowPath: FlowPath = {
                        X: arrowPoint.X,
                        Y: arrowPoint.Y,

                        rotate: getRotateAngle(shiftSchematicPoint),
                        scale: scaleArrow,

                        flowRate: flowZone.flowRate.value,
                        influxRate: 0

                    }
                    // check first arrow in row
                    if (arrowRadius == flowZone.flowRate.inner) {
                        if (flowZone.influxInnerRate != undefined)
                            newFlowPath.influxRate = flowZone.influxInnerRate
                    }
                    // check last arrow in row
                    if (arrowRadius + 1.7 * ARROW_LENGTH >= flowZone.flowRate.outer) {
                        if (flowZone.influxOuterRate != undefined) {
                            if (newFlowPath.influxRate != 0 && Math.sign(newFlowPath.influxRate) != Math.sign(flowZone.influxOuterRate))
                                newFlowPath.influxRate = 0
                            else
                                newFlowPath.influxRate = flowZone.influxOuterRate
                        }
                        flowPathes.push(newFlowPath)
                        break
                    } else
                        flowPathes.push(newFlowPath)

                    arrowRadius = arrowRadius + ARROW_LENGTH
                }
                arrowMD = arrowMD + ARROW_LENGTH
            }
        })
    }

    const init = () => {
        const filtered = arrowsState.simulationResults.filter((_modelResult) => {
            return _modelResult.num == arrowsState.currentschedule.num
        })
        if (filtered != null && filtered.length > 0) {
            const modelResult = filtered[0]

            const sortedFlowRates = modelResult.flowRate
                //.filter((rate) => { return (rate.outer - rate.inner) * props.zoomProps.realZoom > 1.0 })
                .sort(sortSimulationResults)
            const sortedInfluxRates = modelResult.influxRate
                //.filter((rate) => { return (rate.outer - rate.inner) * props.zoomProps.realZoom > 1.0 })
                .sort(sortSimulationResults)

            searchFlowPathes(sortedFlowRates, sortedInfluxRates)
        }

    }

    //React.useImperativeHandle(ref, () => ({
    //    onSetNum(newNum: number) {
    //        setArrowsState({ ...arrowsState, currentschedule: { num: newNum, colorized: arrowsState.currentschedule.colorized } })
    //    }
    //}))

    const getRatesComponent = (): React.ReactNode => {
        if (arrowsState.simulationResults != undefined && arrowsState.simulationResults.length > 0
            && props.completions != undefined && props.completions.length > 0) {

            init()
            return flowPathes
                .filter(flowPath => { return !Number.isNaN(flowPath.X) && !Number.isNaN(flowPath.Y) })
                .map((flowPath, index) => {
                const influx = flowPath.influxRate
                const flow = flowPath.flowRate
                const transform = "translate(" + flowPath.X + "," + flowPath.Y + ") rotate(" + flowPath.rotate + ") scale(" + flowPath.scale + ", " + flowPath.scale + ")"
                if (influx != undefined && influx > 0 && flow > 0) {
                    return <g key={"arrowGroup" + index} transform={transform} fill="transparent">
                        <path key={"arrowPathFirst" + index} d="M0 0h29.104v29.104H0z" />
                        <path key={"arrowPathSecond" + index}
                            d="M5.292 5.292l18.52 18.52M7.937 10.583L5.292 5.292l5.291 2.646"
                            stroke="#000"
                        />
                    </g>
                } else if (influx != undefined && influx < 0 && flow > 0) {
                    return <g key={"arrowGroup" + index} transform={transform} fill="transparent">
                        <path key={"arrowPathFirst" + index} d="M0 0h29.104v29.104H0z" />
                        <path key={"arrowPathSecond" + index}
                            d="M5.292 23.813l18.52-18.521h0M18.52 7.938l5.293-2.646-2.646 5.291"
                            stroke="#000"
                        />
                    </g>
                } else if (influx != undefined && influx > 0 && flow < 0) {
                    return <g key={"arrowGroup" + index} transform={transform} fill="transparent">
                        <path key={"arrowPathFirst" + index} d="M0 0h29.104v29.104H0z" />
                        <path key={"arrowPathSecond" + index}
                            d="M5.292 23.813l18.52-18.521M7.938 18.52l-2.646 5.293 5.291-2.646"
                            stroke="#000"
                        />
                    </g>
                } else if (influx != undefined && influx < 0 && flow < 0) {
                    return <g key={"arrowGroup" + index} transform={transform} fill="transparent">
                        <path key={"arrowPathFirst" + index} d="M0 0h29.104v29.104H0z" />
                        <path key={"arrowPathSecond" + index}
                            d="M5.292 5.292l18.52 18.52M21.167 18.52l2.645 5.293-5.291-2.646"
                            stroke="#000"
                        />
                    </g>
                } else if (influx != undefined && influx > 0 && flow == 0) {
                    return <g key={"arrowGroup" + index} transform={transform} fill="transparent">
                        <path key={"arrowPathFirst" + index} d="M0 0h29.104v30.427H0z" />
                        <path key={"arrowPathSecond" + index}
                            d="M10.583 11.906L3.97 14.552l6.614 2.646"
                            stroke="#000"
                            strokeWidth={0.913}
                        />
                        <path key={"arrowPathThird" + index} d="M3.969 14.552h22.49" stroke="#000" />
                    </g>
                } else if (influx != undefined && influx < 0 && flow == 0) {
                    return <g key={"arrowGroup" + index} transform={transform} fill="transparent">
                        <path key={"arrowPathFirst" + index} d="M0 0h29.104v30.427H0z" />
                        <path key={"arrowPathSecond" + index}
                            d="M18.615 11.906l6.614 2.646-6.614 2.646"
                            stroke="#000"
                            strokeWidth={0.913}
                        />
                        <path key={"arrowPathThird" + index} d="M25.23 14.552H2.74" stroke="#000" />
                    </g>
                } else if (flow > 0) {
                    return <g key={"arrowGroup" + index} transform={transform} fill="transparent">
                        <path key={"arrowPathFirst" + index} d="M14.552 29.053V2.859" stroke="#000" />
                        <path key={"arrowPathSecond" + index} d="M0 0h29.104v30.376H0z" />
                        <path key={"arrowPathThird" + index}
                            d="M11.906 9.21l2.646-6.615 2.646 6.614"
                            stroke="#000"
                            strokeWidth={1.021}
                        />
                    </g>
                } else if (flow < 0) {
                    return <g key={"arrowGroup" + index} transform={transform} fill="transparent">
                        <path key={"arrowPathFirst" + index} d="M14.552 27.781V1.323" stroke="#000" strokeWidth={1.005} />
                        <path key={"arrowPathSecond" + index} d="M0 0h29.104v30.427H0z" />
                        <path key={"arrowPathThird" + index}
                            d="M11.906 21.167l2.646 6.614 2.646-6.614"
                            stroke="#000"
                            strokeWidth={0.913}
                        />
                    </g>
                }

            })
        } else
            return <></>
    }

    return (
        <>{getRatesComponent()}</>
    )
}