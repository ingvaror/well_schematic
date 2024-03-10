import * as React from "react"
import { ObservablePanZoomType, ObservableScheduleType, ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { SchematicCompletion, SchematicSimulationResults, SchematicDirection, SchematicFluidComposition, ScheduleParameters, SCHEMATIC_RATES, SCHEMATIC_FLUID_COMPOSITION, SCHEMATIC_PRESSURE, SCHEMATIC_TEMPERATURE, SchematicSimulationData, SCHEMATIC_INFLUX_RATE, RangesSimulationResults, PressureSensor, CompletionType } from "../resolver/schematicProps"
import { ColorizedPath, FlowZone, RESERVOIR, searchFlowZones, searchZones, SimulationDataZone } from "../resolver/simulationProps"
import { getColorFromMap, getSimulationDataArray } from "../services/commonUtilities"
import { getTrajectory } from "../services/geometryUtilities"

interface Props {
    // all model data (rates, temperature, pressure...) with MD
    simulationResults: Array<SchematicSimulationResults>
    // completions
    completions: Array<SchematicCompletion>
    // view diameter well
    viewDiameterWell: number
    /** For partial drawing */
    // Start init
    currentschedule: ScheduleParameters
    // All ranges. One time calculating in C++
    rangessimulationresults: Map<string, RangesSimulationResults>
}

interface State {
    // all model data (rates, temperature, pressure...) with MD
    simulationResults: Array<SchematicSimulationResults>
    // completions
    completions: Array<SchematicCompletion>
    // Time schedule or Oil rate to get num to extract data from simulationResults
    currentschedule: ScheduleParameters
}

const onChangePanZoom: Listener<ObservablePanZoomType> = { update: () => void { } }
const onChangeSchedule: Listener<ObservableScheduleType> = { update: () => void { } }
const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: () => void {} }

export const ColorizedSVG: React.FC<Props> = (props) => {
    const [colorizedSVGState, setColorizedSVGState] = React.useState<State>({ ...props })

    const sortedCompletions = props.completions
        .filter(completion => {
            return completion.layers == undefined || completion.layers.length == 0
                || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
        })
        .sort((completion1, completion2) => { return completion1.MD - completion2.MD })

    // For server solution
    React.useEffect(() => {
        ResolverFactory.getResolver().observablePanZoom.attach(onChangePanZoom)
        ResolverFactory.getResolver().observableSchedule.attach(onChangeSchedule)
        ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)
        onChangePanZoom.update = (updatedData: ObservablePanZoomType) => {
            setColorizedSVGState({ ...updatedData, currentschedule: colorizedSVGState.currentschedule })
        }
        onChangeSchedule.update = (updateData: ObservableScheduleType) => {
            setColorizedSVGState({ ...updateData, completions: colorizedSVGState.completions })
        }
        onChangeViewDiameterWell.update = (updatedData: ObservableViewDiameterWellType) => {
            setColorizedSVGState({ ...updatedData, currentschedule: colorizedSVGState.currentschedule })
        }
    })

    const initColorComposition = (fluidComposition: SchematicFluidComposition): { R: number, G: number, B: number } => {
        if (fluidComposition.Q == 0)
            return { R: 0, G: 0, B: 0 }
        else
            return {
                R: Math.round(255 * Math.abs(fluidComposition.Qgas / fluidComposition.Q)),
                G: Math.round(255 * Math.abs(fluidComposition.Qoil / fluidComposition.Q)),
                B: Math.round(255 * Math.abs(fluidComposition.Qwater / fluidComposition.Q))
            }
    }

    function searchColorizedPathes<SimulationDataType>(sortedSimulationData: Array<SimulationDataType>, getDataValue: (dataObject: SimulationDataType) => number): Array<ColorizedPath> {
        const colorizedZones: Array<SimulationDataZone> = new Array
        sortedCompletions.forEach((schematicCompletion) => {
            searchZones(sortedSimulationData, schematicCompletion, true).forEach(zone => colorizedZones.push(zone))
        })

        if (colorizedSVGState.currentschedule.colorized == SCHEMATIC_RATES ||
            colorizedSVGState.currentschedule.colorized == SCHEMATIC_PRESSURE ||
            colorizedSVGState.currentschedule.colorized == SCHEMATIC_TEMPERATURE) {

            const range = props.rangessimulationresults[colorizedSVGState.currentschedule.colorized]

            return colorizedZones
                .filter((colorizedZone) => { return colorizedZone.dataObject.layer != RESERVOIR })
                .map((colorizedZone) => {
                    if (colorizedSVGState.currentschedule.colorized == SCHEMATIC_RATES && getDataValue(colorizedZone.dataObject) == 0 && range.minValue != 0)
                        return {
                            points: colorizedZone.points,
                            color: 'none',
                            inner: colorizedZone.inner,
                            outer: colorizedZone.outer
                        }
                    else {
                        const color = getColorFromMap(range.minValue, range.maxValue, getDataValue(colorizedZone.dataObject))
                        if (color != null) {
                            return {
                                points: colorizedZone.points,
                                color: color,
                                inner: colorizedZone.inner,
                                outer: colorizedZone.outer
                            }
                        }
                    }
                })
        } else if (colorizedSVGState.currentschedule.colorized == SCHEMATIC_FLUID_COMPOSITION) {
            // special case for fluid composition in reservoir influx rate
            return colorizedZones.map(colorizedZone => {
                const color = initColorComposition(colorizedZone.dataObject)
                if (color != null) {
                    if (color.R == 0 && color.G == 0 && color.B == 0) {
                        return {
                            points: colorizedZone.points,
                            color: "none",
                            inner: colorizedZone.inner,
                            outer: colorizedZone.outer
                        }
                    } else
                        return {
                            points: colorizedZone.points,
                            color: `rgb(${color.R}, ${color.G}, ${color.B})`,
                            inner: colorizedZone.inner,
                            outer: colorizedZone.outer
                        }
                }
            })
        }
        return null
    }

    const getColorizedComponent = (): React.ReactNode => {
        if (colorizedSVGState.simulationResults != undefined && colorizedSVGState.simulationResults.length > 0
            && props.completions != undefined && props.completions.length > 0) {

            const simulationDataArray = getSimulationDataArray(colorizedSVGState.simulationResults, colorizedSVGState.currentschedule.colorized, colorizedSVGState.currentschedule.num)
                //.filter(rate => { return (rate.outer - rate.inner) * props.zoomProps.realZoom > 1.0 })
            if (simulationDataArray != null) {
                var colorizedPathes: Array<ColorizedPath>
                if (colorizedSVGState.currentschedule.colorized == SCHEMATIC_FLUID_COMPOSITION)
                    colorizedPathes = searchColorizedPathes<SchematicFluidComposition>(simulationDataArray, (dataObject: SchematicFluidComposition): number => { return dataObject.Q })
                else if (colorizedSVGState.currentschedule.colorized == SCHEMATIC_RATES || colorizedSVGState.currentschedule.colorized == SCHEMATIC_PRESSURE || colorizedSVGState.currentschedule.colorized == SCHEMATIC_TEMPERATURE)
                    colorizedPathes = searchColorizedPathes<SchematicSimulationData>(simulationDataArray, (dataObject: SchematicSimulationData): number => { return dataObject.value })

                if (colorizedPathes != null) {
                    return colorizedPathes
                        .filter(colorizedPath => colorizedPath != undefined)
                        .map((colorizedPath, index) => {
                            const trajectory = getTrajectory(colorizedPath.points,
                                { offset: colorizedPath.inner, direction: SchematicDirection.RIGHT_HAND_SIDE },
                                { offset: colorizedPath.outer, direction: SchematicDirection.RIGHT_HAND_SIDE })
                            return <path key={"colorizedPath" + index} d={trajectory} fill={colorizedPath.color} />
                    })
                }
            }

            return <></>
        } else
            return <></>
    }

    return (
        <>{getColorizedComponent()}</>
    )
}
