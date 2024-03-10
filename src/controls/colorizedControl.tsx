import * as React from "react"
import { RangesSimulationResults, ScheduleParameters, UnitVariant } from "../resolver/schematicProps"
import { makeid } from "../services/commonUtilities"
import { ColorizedScale } from "./colorizedScale"
import { CONTROL_LEFT_MARGIN, CONTROL_WIDTH, DIV_LEFT_MARGIN } from "./controlPanel"

interface Props {
 //   getColorized: () => string
	onSetColorized: (newColorized: string) => void
	top: number
	availableColorized: Array<string>
	currentschedule: ScheduleParameters
	rangessimulationresults: Map<string, RangesSimulationResults>
	units: Map<string, UnitVariant>

	key: string
}

export const ColorizedControl: React.FC<Props> = (props) => {
	const [colorized, setColorized] = React.useState<string>(props.currentschedule.colorized)

	const handleChange = (event) => {
		setColorized(event.target.value)
		props.onSetColorized(event.target.value)
	}

	return (
		<>
		<div key={makeid("divColorizedControl")} style={{ position: 'fixed', top: props.top.toString() + '%', left: DIV_LEFT_MARGIN, width: '50%' }}>
			<label key={makeid("labelColorizedControl")} style={{ position: 'fixed', top: (props.top + 0.2).toString() + '%', left: DIV_LEFT_MARGIN, width: '50%', fontFamily: 'sans-serif', fontSize: '12px' }}>Colorized</label>
			<select key={makeid("selectColorizedControl")} style={{ position: 'fixed', top: (props.top).toString() + '%', left: CONTROL_LEFT_MARGIN, width: CONTROL_WIDTH, fontFamily: 'sans-serif', fontSize: '12px' }} onChange={handleChange} value={colorized}>
				{
					props.availableColorized.map((optionName): React.ReactNode => {
						return <option key={optionName} value={optionName}>{optionName}</option>
					})
				}
			</select>
			</div>
			<ColorizedScale
				key="colorizedScale"
				currentschedule={props.currentschedule}
				rangessimulationresults={props.rangessimulationresults}
				units={props.units}
				top={props.top - 2}
			/>
			</>
	)
}