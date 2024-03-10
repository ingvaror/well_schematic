import * as React from "react"
import { ObservableScheduleType } from "../resolver/abstractResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { RangesSimulationResults, ScheduleParameters, SCHEMATIC_FLUID_COMPOSITION, SCHEMATIC_PRESSURE, SCHEMATIC_RATES, SCHEMATIC_TEMPERATURE, SCHEMATIC_UNIT_FLOWRATE, SCHEMATIC_UNIT_PRESSURE, SCHEMATIC_UNIT_TEMPERATURE, UnitVariant } from "../resolver/schematicProps"
import { fromInternal, getMarks, getUnitName, makeid, MATLAB_DEFAULT_COLOR_CODES } from "../services/commonUtilities"
import './colorizedScale.css'


interface Props {
    currentschedule: ScheduleParameters
    rangessimulationresults: Map<string, RangesSimulationResults>
    units: Map<string, UnitVariant>
    top: number
	key: string
}

interface State {
    currentschedule: ScheduleParameters
    units: Map<string, UnitVariant>
}

const onChangeSchedule: Listener<ObservableScheduleType> = { update: () => void {} }
const onChangeUnits: Listener<Map<string, UnitVariant>> = { update: () => void {} }


export const ColorizedScale: React.FC<Props> = (props) => {

    const [state, setState] = React.useState<State>({ ...props })

    React.useEffect(() => {
        ResolverFactory.getResolver().observableSchedule.attach(onChangeSchedule)
        ResolverFactory.getResolver().observableUnits.attach(onChangeUnits)
        onChangeSchedule.update = (newData: ObservableScheduleType) => {
            setState({ currentschedule: newData.currentschedule, units: state.units })
        }
        onChangeUnits.update = (newData: Map<string, UnitVariant>) => {
            setState({ currentschedule: state.currentschedule, units: newData })
        }
    })

    const FLUID_TRIANGLE = "fluidTriangle"

    interface Color {
        r: number
        g: number
        b: number
        a: number
    }

    const k1 = - 80 / 46
    const b1 = 80
    const k2 = 80 / 46
    const b2 = -80
    const edgeLength = 92

    const getTriangleColor = (xPixel: number, yPixel: number, inColor: Color): Color => {
        const color: Color = inColor
        if (yPixel >= xPixel * k1 + b1 && yPixel >= xPixel * k2 + b2) {
            const distanceB = Math.sqrt(Math.pow(xPixel, 2) + Math.pow(yPixel - 80, 2))
            color.b = (edgeLength - distanceB) / edgeLength * 255

            const distanceG = Math.sqrt(Math.pow(xPixel - 46, 2) + Math.pow(yPixel, 2))
            color.g = (edgeLength - distanceG) / edgeLength * 255

            const distanceR = Math.sqrt(Math.pow(xPixel - 92, 2) + Math.pow(yPixel - 80, 2))
            color.r = (edgeLength - distanceR) / edgeLength * 255

            color.a = 255
        }
        return color
    }

    React.useEffect(() => {
        if (state.currentschedule.colorized == SCHEMATIC_FLUID_COMPOSITION) {
            const canvas = document.getElementById(FLUID_TRIANGLE)
            if (canvas != undefined && canvas instanceof HTMLCanvasElement) {
                const ctx = canvas.getContext("2d")

                ctx.moveTo(30, 95)
                ctx.lineTo(76, 15)
                ctx.lineTo(122, 95)
                ctx.lineTo(30, 95)
                ctx.stroke()

                ctx.font = '10px Sans-serif'
                ctx.fillText("Water", 3, 95)
                ctx.fillText("Oil", 69, 10)
                ctx.fillText("Gas", 122, 95)

                const imageData = ctx.getImageData(30, 15, 92, 80)
                const pixels = imageData.data
                for (var yPixel = 0; yPixel < 80; yPixel++) {
                    for (var xPixel = 0; xPixel < 92; xPixel++) {
                        const idxPixel = yPixel * 92 + xPixel

                        const r = pixels[idxPixel * 4]
                        const g = pixels[idxPixel * 4 + 1]
                        const b = pixels[idxPixel * 4 + 2]
                        const a = pixels[idxPixel * 4 + 3]

                        const color = getTriangleColor(xPixel, yPixel, { r: r, g: g, b: b, a: a })
                        pixels[idxPixel * 4] = color.r
                        pixels[idxPixel * 4 + 1] = color.g
                        pixels[idxPixel * 4 + 2] = color.b
                        pixels[idxPixel * 4 + 3] = color.a
                    }
                }
                ctx.putImageData(imageData, 30, 15)
            }
        }
    })

    const getUnitType = (): string => {
        switch (state.currentschedule.colorized) {
            case SCHEMATIC_RATES:
                return SCHEMATIC_UNIT_FLOWRATE
            case SCHEMATIC_PRESSURE:
                return SCHEMATIC_UNIT_PRESSURE
            case SCHEMATIC_TEMPERATURE:
                return SCHEMATIC_UNIT_TEMPERATURE
            default:
                return ""
        }
    }

    const getColorizedScale = (): React.ReactNode => {
        if (state.currentschedule.colorized == SCHEMATIC_PRESSURE
            || state.currentschedule.colorized == SCHEMATIC_RATES
            || state.currentschedule.colorized == SCHEMATIC_TEMPERATURE) {
            const range = props.rangessimulationresults[state.currentschedule.colorized]
            const v1 = fromInternal(range.minValue, state.units, getUnitType())
            const v2 = fromInternal(range.minValue + (range.maxValue - range.minValue) / 2, state.units, getUnitType())
            const v3 = fromInternal(range.maxValue, state.units, getUnitType())
            const labels: Array<number> = [v1, v2, v3]
            const schematicMarks = getMarks<number>(labels, (value: number) => { return value })
            const widthRect = 350.0 / MATLAB_DEFAULT_COLOR_CODES.length
            if (schematicMarks != null) {
                return <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={500}
                    height={80}
                    key={makeid("svgColorizedScale")}
                    {...props}
                >
                    {
                        MATLAB_DEFAULT_COLOR_CODES.map((code, index) => {
                            return <rect key={"colorRect" + index + "ColorizedScale"} x={25.0 + index * widthRect} y={20} width={widthRect} height={25} fill={code} />
                        })
                    }
                    <rect key={makeid("rectColorizedScale")} x={25} y={20} width={350} height={25} fill="none" stroke="black" strokeWidth="0.3" shapeRendering="crispEdges" />
                    <line key={makeid("lineColorizedScale")} x1={200} y1={20} x2={200} y2={45} stroke="black" strokeWidth="0.3" shapeRendering="crispEdges" />
                    {
                        schematicMarks.marks.map((schematicMark, index) => {
                            return <text key={"textColorizedScale" + index} className="scaleMark" x={25 + index * 175 - schematicMark.label.length * 5 / 2} y={65}>{schematicMark.label}</text>
                        })
                    }
                    <text key={makeid("textColorizedScale")} className="scaleMark" x={440} y={65}>{getUnitName(state.units, getUnitType())}</text>
                </svg>
            } else {
                alert("Well schematic: can't init colorized scale")
                return <></>
            }
        } else if (state.currentschedule.colorized == SCHEMATIC_FLUID_COMPOSITION) {
            return <canvas
                key={makeid("canvasColorizedScale")}
                id={FLUID_TRIANGLE}
                width={150}
                height={100}
                {...props}
            >
            </canvas>
        } else
            return <></>
    }

    return <div key={makeid("divColorizedScale")} style={{ position: 'fixed', left: '20%', top: props.top.toString() + '%', height: '8%' }}>
        {getColorizedScale()}
    </div>
}