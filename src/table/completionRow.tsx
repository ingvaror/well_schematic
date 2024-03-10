import * as React from "react"
import { GlobalObserver } from "../resolver/globalObserver"
import { Listener } from "../resolver/observer"
import { CompletionType, NETOOL_WELLSCHEMATIC_DEVIATION, NETOOL_WELLSCHEMATIC_VERTICAL, SchematicCompletion, SCHEMATIC_UNIT_DIAMETER_LENGTH, SCHEMATIC_UNIT_LENGTH, UnitVariant } from "../resolver/schematicProps"
import { fromInternal } from "../services/commonUtilities"

interface Props {
	key: string
	completion: SchematicCompletion
	units: Map<string, UnitVariant>
	radiusFactor: number
	showUserNotes: boolean
	modeView: string
	properlyPrecision: number
}

export const CompletionRow: React.FC<Props> = (props) => {
	const TD_ITEM = "tdItem"
	const TD_DEPTH = "tdDepth"
	const TD_DESCRIPTION = "tdDescription"
	const TD_DIAMETER = "tdDiameter"
	const TD_USER_NOTES = "tdUserNotes"
	const TD_SELECTED = "Selected"

	const onSetCompletionFromSVG: Listener<string> = { update: (_: string) => void {} }
	const onUnsetCompletionFromSVG: Listener<string> = { update: (_: string) => void {} }

	React.useEffect(() => {
		GlobalObserver.getInstance().observableSetCompletionFromSVG.attach(onSetCompletionFromSVG)
		GlobalObserver.getInstance().observableUnsetCompletionFromSVG.attach(onUnsetCompletionFromSVG)

		onSetCompletionFromSVG.update = (highlightKey: string) => {
			if (highlightKey == props.completion.key) {
				highlightCompletion()
				if (props.modeView != NETOOL_WELLSCHEMATIC_VERTICAL)
					rowRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
			}
		}

		onUnsetCompletionFromSVG.update = (key: string) => {
			if (key == props.completion.key)
				unhighlightCompletion()
		}

		return function cleanup() {
			GlobalObserver.getInstance().observableSetCompletionFromSVG.detach(onSetCompletionFromSVG)
			GlobalObserver.getInstance().observableUnsetCompletionFromSVG.detach(onUnsetCompletionFromSVG)
        }
	})

	const rowRef: React.RefObject<HTMLTableRowElement> = React.createRef<HTMLTableRowElement>()

	const cellRefs = React.useRef([])

	const getCountCells = () => {
		if (props.completion.layers != undefined)
			return props.showUserNotes ? 5 + 4 * props.completion.layers.length : 4 + 4 * props.completion.layers.length
		else
			return props.showUserNotes ? 9 : 8
	}    

	cellRefs.current = []
	for (var i = 0; i < getCountCells(); i++)
		cellRefs.current.push(React.createRef())

	const highlightCompletion = () => {
		cellRefs.current.forEach((cellRef) => {
			if(cellRef.current.getAttribute('class').includes(TD_ITEM))
				cellRef.current.setAttribute('class', TD_ITEM + TD_SELECTED)
			else if(cellRef.current.getAttribute('class').includes(TD_DEPTH))
				cellRef.current.setAttribute('class', TD_DEPTH + TD_SELECTED)
			else if(cellRef.current.getAttribute('class').includes(TD_DESCRIPTION))
				cellRef.current.setAttribute('class', TD_DESCRIPTION + TD_SELECTED)
			else if(cellRef.current.getAttribute('class').includes(TD_DIAMETER))
				cellRef.current.setAttribute('class', TD_DIAMETER + TD_SELECTED)
			else if (cellRef.current.getAttribute('class').includes(TD_USER_NOTES))
				cellRef.current.setAttribute('class', TD_USER_NOTES + TD_SELECTED)
		})
	}

	const unhighlightCompletion = () => {
		cellRefs.current.forEach((cellRef) => {
			if(cellRef.current.getAttribute('class').includes(TD_ITEM))
				cellRef.current.setAttribute('class', TD_ITEM)
			else if(cellRef.current.getAttribute('class').includes(TD_DEPTH))
				cellRef.current.setAttribute('class', TD_DEPTH)
			else if(cellRef.current.getAttribute('class').includes(TD_DESCRIPTION))
				cellRef.current.setAttribute('class', TD_DESCRIPTION)
			else if(cellRef.current.getAttribute('class').includes(TD_DIAMETER))
				cellRef.current.setAttribute('class', TD_DIAMETER)
			else if (cellRef.current.getAttribute('class').includes(TD_USER_NOTES))
				cellRef.current.setAttribute('class', TD_USER_NOTES)
		})
	}

	const onSetCompletion = () => {
		highlightCompletion()
		if (props.completion.layers == undefined || !props.completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })) {
			GlobalObserver.getInstance().observableSetCompletionFromTable.notify(props.completion.key)
		}
	}

	const onUnsetCompletion = () => {
		unhighlightCompletion()		
		if (props.completion.layers == undefined || !props.completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })) {
			GlobalObserver.getInstance().observableUnsetCompletionFromTable.notify(props.completion.key)
		}
	}

	const getTdUserNotes = (withRowSpan: boolean): React.ReactNode => {
		if (props.showUserNotes) {
			if (withRowSpan)
				return <td ref={cellRefs.current[8]} className={TD_USER_NOTES} rowSpan={props.completion.layers.length}>{props.completion.userNotes}</td>
			else
				return <td ref={cellRefs.current[8]} className={TD_USER_NOTES}>{props.completion.userNotes}</td>
		} else {
			return <></>
		}
	}

	const getMissedCompletion = (): string => {
		if (props.modeView == NETOOL_WELLSCHEMATIC_VERTICAL)
			return "Scroll diagram to see completions"
		else if (props.modeView == NETOOL_WELLSCHEMATIC_DEVIATION)
			return "Pan & zoom to see completions"
		else {
			alert("MISSED_COMPLETION in wrong mode view")
			return "MISSED_COMPLETION in wrong mode view"
		}
    }

	const getRowComponent = (): React.ReactNode => {
		if (props.completion.layers != undefined && props.completion.layers.length > 1) {
			return <>
				<tr key={"tableRow" + props.completion.key} ref={rowRef} className="completionDescription" onMouseEnter={() => onSetCompletion()} onMouseLeave={() => onUnsetCompletion()}>
					<td ref={cellRefs.current[0]} className={TD_ITEM} rowSpan={props.completion.layers.length}>{props.completion.item}</td>
					<td ref={cellRefs.current[1]} className={TD_DEPTH} rowSpan={props.completion.layers.length}>{fromInternal(props.completion.MD, props.units, SCHEMATIC_UNIT_LENGTH).toFixed(2)}</td>
					<td ref={cellRefs.current[2]} className={TD_DEPTH} rowSpan={props.completion.layers.length}>{fromInternal(props.completion.TVD, props.units, SCHEMATIC_UNIT_LENGTH).toFixed(2)}</td>
					<td ref={cellRefs.current[3]} className={TD_DEPTH} rowSpan={props.completion.layers.length}>{fromInternal(props.completion.length, props.units, SCHEMATIC_UNIT_LENGTH).toFixed(2)}</td>
					<td ref={cellRefs.current[4]} className={TD_DESCRIPTION}>{props.completion.layers[0].layerName}</td>
					<td ref={cellRefs.current[5]} className={TD_DESCRIPTION}>{props.completion.layers[0].description}</td>
					<td ref={cellRefs.current[6]} className={TD_DIAMETER}>{props.completion.layers[0].completionName != CompletionType.JUNCTION_HTML
						? fromInternal(props.completion.layers[0].outer * props.radiusFactor * 2.0, props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH).toFixed(props.properlyPrecision)
						: ""}</td>
					<td ref={cellRefs.current[7]} className={TD_DIAMETER}>{props.completion.layers[0].completionName != CompletionType.JUNCTION_HTML
						? fromInternal(props.completion.layers[0].inner * props.radiusFactor * 2.0, props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH).toFixed(props.properlyPrecision)
						: ""}</td>
					{getTdUserNotes(true)}
				</tr>
				{
					props.completion.layers
						.filter((_, index) => { return index > 0 })
						.map((segment, index) => {
							const startTdIndex = props.showUserNotes ? 5 : 4
							index = index + 1
							return <tr key={"addedTableRow" + index + props.completion.key} className="completionDescription" onMouseEnter={() => onSetCompletion()} onMouseLeave={() => onUnsetCompletion()}>
								<td ref={cellRefs.current[startTdIndex + 4 * index]} className={TD_DESCRIPTION}>{segment.layerName}</td>
								<td ref={cellRefs.current[startTdIndex + 1 + 4 * index]} className={TD_DESCRIPTION}>{segment.description}</td>
								<td ref={cellRefs.current[startTdIndex + 2 + 4 * index]} className={TD_DIAMETER}>{segment.completionName != CompletionType.JUNCTION_HTML
									? fromInternal(segment.outer * props.radiusFactor * 2.0, props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH).toFixed(props.properlyPrecision)
									: ""}</td>
								<td ref={cellRefs.current[startTdIndex + 3 + 4 * index]} className={TD_DIAMETER}>{segment.completionName != CompletionType.JUNCTION_HTML
									? fromInternal(segment.inner * props.radiusFactor * 2.0, props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH).toFixed(props.properlyPrecision)
									: ""}</td>
							</tr>
						})
				}
			</>
		} else if (props.completion.layers != undefined
			&& props.completion.layers.length == 1
			&& props.completion.layers[0].completionName != CompletionType.MISSED_COMPLETION_HTML
			|| props.completion.layers == undefined || props.completion.layers.length == 0) {
			var layerTd, descriptionTd, ODTd, IDTd
			if (props.completion.layers != undefined) {
				layerTd = <td ref={cellRefs.current[4]} className={TD_DESCRIPTION}>{props.completion.layers[0].layerName}</td>
				descriptionTd = <td ref={cellRefs.current[5]} className={TD_DESCRIPTION}>{props.completion.layers[0].description}</td>
				ODTd = <td ref={cellRefs.current[6]} className={TD_DIAMETER}>{props.completion.layers[0].completionName != CompletionType.JUNCTION_HTML
					? fromInternal(props.completion.layers[0].outer * props.radiusFactor * 2.0, props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH).toFixed(props.properlyPrecision)
					: ""}</td>
				IDTd = <td ref={cellRefs.current[7]} className={TD_DIAMETER}>{props.completion.layers[0].completionName != CompletionType.JUNCTION_HTML
					? fromInternal(props.completion.layers[0].inner * props.radiusFactor * 2.0, props.units, SCHEMATIC_UNIT_DIAMETER_LENGTH).toFixed(props.properlyPrecision)
					: ""}</td>
			} else {
				layerTd = <td ref={cellRefs.current[4]} className={TD_DESCRIPTION}></td>
				descriptionTd = <td ref={cellRefs.current[5]} className={TD_DESCRIPTION}></td>
				ODTd = <td ref={cellRefs.current[6]} className={TD_DIAMETER}></td>
				IDTd = <td ref={cellRefs.current[7]} className={TD_DIAMETER}></td>
			}

			return <tr key={"tableRow" + props.completion.key} ref={rowRef} className="completionDescription" onMouseEnter={() => onSetCompletion()} onMouseLeave={() => onUnsetCompletion()}>
				<td ref={cellRefs.current[0]} className={TD_ITEM}>{props.completion.item}</td>
				<td ref={cellRefs.current[1]} className={TD_DEPTH}>{fromInternal(props.completion.MD, props.units, SCHEMATIC_UNIT_LENGTH).toFixed(2)}</td>
				<td ref={cellRefs.current[2]} className={TD_DEPTH}>{fromInternal(props.completion.TVD, props.units, SCHEMATIC_UNIT_LENGTH).toFixed(2)}</td>
				<td ref={cellRefs.current[3]} className={TD_DEPTH}>{fromInternal(props.completion.length, props.units, SCHEMATIC_UNIT_LENGTH).toFixed(2)}</td>
				{layerTd}
				{descriptionTd}
				{ODTd}
				{IDTd}
				{getTdUserNotes(false)}
			</tr>
		} else
			return <tr key={"tableRow" + props.completion.key}>
				<td className={TD_ITEM}>{props.completion.item}</td>
				<td className={TD_DESCRIPTION} colSpan={props.showUserNotes ? 8 : 7}>{getMissedCompletion()}</td>
				</tr>
	}

	
	return <>
		{ getRowComponent()}
	</>
}