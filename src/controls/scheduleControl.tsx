import * as React from "react"
import { SchematicSimulationResults, UnitVariant } from "../resolver/schematicProps"
import { fromInternal, getMarks, getUnitName } from "../services/commonUtilities"
import { CONTROL_LEFT_MARGIN, CONTROL_WIDTH, DIV_LEFT_MARGIN } from "./controlPanel"

interface Props {
    simulationResults: Array<SchematicSimulationResults>
    num: number
    unitType: string
    onSetNum: (newNum: number) => void
    top: number
    units: Map<string, UnitVariant>
	key: string
}

export const ScheduleControl: React.FC<Props> = (props) => {

    const [num, setNum] = React.useState<number>(props.num)

    const handleChange = (event) => {
        setNum(Number.parseFloat(event.target.value))
        props.onSetNum(Number.parseFloat(event.target.value))
    }

    const marks = getMarks(props.simulationResults, (result) => { return fromInternal(result.num, props.units, props.unitType) }).marks

    return (
        <div style={{ position: 'fixed', top: props.top.toString() + '%', left: DIV_LEFT_MARGIN }}>
            <label style={{ position: 'fixed', top: (props.top + 0.2).toString() + '%', left: DIV_LEFT_MARGIN, width: '50%', fontFamily: 'sans-serif', fontSize: '12px' }}>{props.simulationResults[0].title}</label>
            <select style={{ position: 'fixed', top: (props.top).toString() + '%', left: CONTROL_LEFT_MARGIN, width: CONTROL_WIDTH, fontFamily: 'sans-serif', fontSize: '12px' }} onChange={handleChange} value={num}>
                {props.simulationResults.map((result, index) => {
                    return <option key={"schedule_" + result.num} value={result.num}>{marks[index].label}</option>
                })}
            </select>
            <label style={{ position: 'fixed', top: (props.top + 0.2).toString() + '%', left: '16.5%', width: '10%', fontFamily: 'sans-serif', fontSize: '12px' }}>{getUnitName(props.units, props.unitType)}</label>
        </div>
    )
}