import * as React from "react"
import { CompletionContourFocus, CompletionContourHighlight } from "../completions/completionContour"
import { CompletionFactory } from "../completions/completionFactory"
import { PressureSensors } from "../completions/pressureSensors"
import { PressureSensor, RangesSimulationResults, ScheduleParameters, SchematicCompletion, SchematicSimulationResults, SchematicViewOptions } from "../resolver/schematicProps"
import { SchematicLateral } from "../resolver/wellSchematicData"
import { ArrowsComponent } from "./arrows"
import { ColorizedSVG } from "./colorized"
import { ObservablePanZoomType, ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"


interface Props {
	currentLateral: SchematicLateral
	viewOptions: SchematicViewOptions
	stateschedule: ScheduleParameters
	rangessimulationresults: Map<string, RangesSimulationResults>
}

interface State {
	// completions
	completions: Array<SchematicCompletion>
	// pressure sensors
	pressureSensors: Array<PressureSensor>
	// all model data (rates, temperature, pressure...) with MD
	simulationResults: Array<SchematicSimulationResults>
}

const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: (_: ObservableViewDiameterWellType) => void {} }
const onChangePanZoom: Listener<ObservablePanZoomType> = { update: () => void {} }

export const CompletionsSVG: React.FC<Props> = (props) => {

	const [stateCompletions, setStateCompletions] = React.useState<State>(props.currentLateral)

	React.useEffect(() => {
		ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)
		ResolverFactory.getResolver().observablePanZoom.attach(onChangePanZoom)

		onChangeViewDiameterWell.update = (lateral: ObservableViewDiameterWellType) => {
			setStateCompletions({ ...lateral})
		}

		onChangePanZoom.update = (panZoomData: ObservablePanZoomType) => {
			setStateCompletions({ ...panZoomData })
        }
	})

	return <>
		<ColorizedSVG
			simulationResults={stateCompletions.simulationResults}
			completions={stateCompletions.completions}
			currentschedule={props.stateschedule}
			rangessimulationresults={props.rangessimulationresults}
			viewDiameterWell={props.currentLateral.wellTrajectory != null ? props.currentLateral.wellTrajectory.viewDiameterWell : 0}
		/>
		<ArrowsComponent
			completions={stateCompletions.completions}
			simulationResults={stateCompletions.simulationResults}
			wellTrajectory={props.currentLateral.wellTrajectory}
			horizontalWell={props.currentLateral.horizontalWell}
			currentschedule={props.stateschedule}
		/>
		<CompletionFactory completions={stateCompletions.completions} viewDiameterWell={props.currentLateral.wellTrajectory.viewDiameterWell} key="completionFactory" />
	</>
}