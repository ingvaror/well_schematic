import * as React from "react"
import { ObservablePanZoomType, ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { JavaResolver } from "../resolver/javaResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { SchematicCompletion, SCHEMATIC_UNIT_DIAMETER_LENGTH, SCHEMATIC_UNIT_LENGTH, UnitVariant } from "../resolver/schematicProps"
import { fromInternal, getUnitName, makeid } from "../services/commonUtilities"
import { CompletionRow } from "./completionRow"
import './completionTable.css'

interface Props {
	completions: Array<SchematicCompletion>
	units: Map<string, UnitVariant>
	radiusFactor: number
	modeView: string
	key: string
}

interface State {
	completions: Array<SchematicCompletion>
	radiusFactor: number
}

const onChangeCompletions: Listener<ObservablePanZoomType> = { update: () => void {} }
const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: () => void {} }

export const CompletionTable: React.FC<Props> = (props) => {
	const [state, setState] = React.useState<State>({ ...props })

	React.useEffect(() => {
		ResolverFactory.getResolver().observablePanZoom.attach(onChangeCompletions)
		ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)

		onChangeCompletions.update = (newData: ObservablePanZoomType) => {
			setState({ completions: newData.completions, radiusFactor: state.radiusFactor })
		}
		onChangeViewDiameterWell.update = (newData: ObservableViewDiameterWellType) => {
			setState({ completions: newData.completions, radiusFactor: newData.wellTrajectory.radiusFactor })
		}

		return function cleanup() {
			ResolverFactory.getResolver().observablePanZoom.detach(onChangeCompletions)
			ResolverFactory.getResolver().observableViewDiameterWell.detach(onChangeViewDiameterWell)
		}
	})

	var showUserNotes = false

	const getThUserNotes = (): React.ReactNode => {
		state.completions.forEach((completion) => {
			if (completion.userNotes != undefined && completion.userNotes != "")
				showUserNotes = true
		})
		if (showUserNotes)
			return <th className="thUserNotes">User notes</th>
		else
			return <></>
	}

	const onCopyHandle = (event: React.ClipboardEvent) => {
		if (ResolverFactory.getResolver() instanceof JavaResolver) {
			(ResolverFactory.getResolver() as JavaResolver)
				.getJavaConnector()
				//.setClipBoardData('<html><table>' + event.currentTarget.innerHTML.toString() + '</table></html>')
				.copyToClipboard('<html><table>' + event.currentTarget.innerHTML.toString() + '</table></html>', 'text/html')
 		}
	}

	const getProperlyPrecision = (inputValues: Array<number>): number => {
		var properlyPrecision = 1
		var prevValue: number = Number.NaN
		inputValues
			.filter((value) => { return !Number.isNaN(value) })
			.forEach((value, index) => {
				if (index % 2 == 0)
					prevValue = value
				while (properlyPrecision < 2 && (value.toFixed(properlyPrecision).search(/[123456789]+/g) == -1 ||
					index % 2 == 1 && prevValue.toFixed(properlyPrecision) == value.toFixed(properlyPrecision))) {
					properlyPrecision++
				}
		})
		return properlyPrecision
	}

	const arrayDiameters = new Array()
	state.completions
		.filter(completion => { return completion.layers != undefined && completion.layers.length > 0 })
		.forEach(completion => {
			completion.layers
				.forEach(layer => {
					arrayDiameters.push(fromInternal(state.radiusFactor * layer.inner * 2.0, props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH))
					arrayDiameters.push(fromInternal(state.radiusFactor * layer.outer * 2.0, props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH))
			})
		})
	const properlyPrecision = getProperlyPrecision(arrayDiameters)

	return (
		<table key={makeid("completionTable")} className="completionDescription" onCopy={onCopyHandle}>
			<thead key={makeid("completionTableThead")}>
				<tr key={makeid("completionTableTr")}>
					<th className="thItem">Item</th>
					<th className="thDepth">Top MD<br />[{getUnitName(props.units, SCHEMATIC_UNIT_LENGTH)}]</th>
					<th className="thDepth">TVD<br />[{getUnitName(props.units, SCHEMATIC_UNIT_LENGTH)}]</th>
					<th className="thDepth">Length<br />[{getUnitName(props.units, SCHEMATIC_UNIT_LENGTH)}]</th>
					<th className="thDescription">Layer</th>
					<th className="thDescription">Completion</th>
					<th className="thDiameter">OD<br />[{getUnitName(props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH)}]</th>
					<th className="thDiameter">ID<br />[{getUnitName(props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH)}]</th>
					{getThUserNotes()}
				</tr>
			</thead>
			<tbody key={makeid("completionTableTbody")}>
				{
					state.completions.map((completion, i) => {
						return <CompletionRow
							key={completion.key}
							completion={completion}
							units={props.units}
							radiusFactor={state.radiusFactor}
							showUserNotes={showUserNotes}
							modeView={props.modeView}
							properlyPrecision={properlyPrecision}
						/>
					})
				}
			</tbody>
		</table>
	)
}
