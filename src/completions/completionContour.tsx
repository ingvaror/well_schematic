import * as React from "react"
import { ObservablePanZoomType, ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { GlobalObserver } from "../resolver/globalObserver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { CompletionType, SchematicCompletion, SchematicDirection } from "../resolver/schematicProps"
import { getPointOffset } from "../services/geometryUtilities"
import './completionContour.css'

interface Props {
    completions: Array<SchematicCompletion>
    viewDiameterWell: number
    key: string
}

interface State {
    completions: Array<SchematicCompletion>
    viewDiameterWell: number
}

const getContourTrajectory = (completion: SchematicCompletion, viewDiameterWell: number): string => {
    var trajectory = ""
    completion.points.forEach((point) => {
        const offsetPoint = getPointOffset(point, viewDiameterWell, SchematicDirection.RIGHT_HAND_SIDE)
        if (trajectory == "")
            trajectory += "M " + offsetPoint.X + " " + offsetPoint.Y
        else
            trajectory += " L " + offsetPoint.X + " " + offsetPoint.Y
    })
    completion.points.slice().reverse().forEach((point) => {
        const offsetPoint = getPointOffset(point, viewDiameterWell, SchematicDirection.LEFT_HAND_SIDE)
        trajectory += " L " + offsetPoint.X + " " + offsetPoint.Y
    })
    trajectory += " Z"
    return trajectory
}

const onChangeCompletionsHighlight: Listener<ObservablePanZoomType> = { update: () => void {} }
const onChangeViewDiameterWellHighlight: Listener<ObservableViewDiameterWellType> = { update: () => void {} }
const onChangeCompletionsFocus: Listener<ObservablePanZoomType> = { update: () => void {} }
const onChangeViewDiameterWellFocus: Listener<ObservableViewDiameterWellType> = { update: () => void {} }
const onSetCompletionFromTable: Listener<string> = { update: (_: string) => void {} }
const onUnsetCompletionFromTable: Listener<string> = { update: (_: string) => void {} }
const onSetCompletionFromSVG: Listener<string> = { update: (_: string) => void {} }
const onUnsetCompletionFromSVG: Listener<string> = { update: (_: string) => void {} }

export const CompletionContourHighlight: React.FC<Props> = (props) => {

    const [state, setState] = React.useState<State>({ ...props })

    React.useEffect(() => {
        ResolverFactory.getResolver().observablePanZoom.attach(onChangeCompletionsHighlight)
        ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWellHighlight)
        GlobalObserver.getInstance().observableSetCompletionFromTable.attach(onSetCompletionFromTable)
        GlobalObserver.getInstance().observableUnsetCompletionFromTable.attach(onUnsetCompletionFromTable)
        GlobalObserver.getInstance().observableSetCompletionFromSVG.attach(onSetCompletionFromSVG)
        GlobalObserver.getInstance().observableUnsetCompletionFromSVG.attach(onUnsetCompletionFromSVG)
        onChangeCompletionsHighlight.update = (updatedData: ObservablePanZoomType) => {
            setState({ completions: updatedData.completions, viewDiameterWell: state.viewDiameterWell })
        }
        onChangeViewDiameterWellHighlight.update = (updatedData: ObservableViewDiameterWellType) => {
            setState({ completions: updatedData.completions, viewDiameterWell: updatedData.wellTrajectory.viewDiameterWell })
        }
        onSetCompletionFromTable.update = (key: string) => {
            const newIndex = state.completions.filter(completion => {
                return completion.layers == undefined || completion.layers.length == 0
                    || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
            }).findIndex(completion => { return completion.key == key })
            contourRefs.current[newIndex].current.setAttribute('class', 'selectedContour')
        }
        onUnsetCompletionFromTable.update = (key: string) => {
            const newIndex = state.completions.filter(completion => {
                return completion.layers == undefined || completion.layers.length == 0
                    || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
            }).findIndex(completion => { return completion.key == key })
            contourRefs.current[newIndex].current.setAttribute('class', 'notSelectedContour')
        }
        onSetCompletionFromSVG.update = (key: string) => {
            const newIndex = state.completions.filter(completion => {
                return completion.layers == undefined || completion.layers.length == 0
                    || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
            }).findIndex(completion => { return completion.key == key })
            contourRefs.current[newIndex].current.setAttribute('class', 'selectedContour')
        }
        onUnsetCompletionFromSVG.update = (key: string) => {
            const newIndex = state.completions.filter(completion => {
                return completion.layers == undefined || completion.layers.length == 0
                    || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
            }).findIndex(completion => { return completion.key == key })
            contourRefs.current[newIndex].current.setAttribute('class', 'notSelectedContour')
        }
    })

    const contourRefs = React.useRef([])
    contourRefs.current = []
    contourRefs.current = state.completions
        .filter(completion => {
            return completion.layers == undefined || completion.layers.length == 0
                || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
        })
        .map(() => {
        return React.createRef()
    })

    return <>{
        state.completions
            .filter(completion => {
                return completion.layers == undefined || completion.layers.length == 0
                    || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
            })
            .map((completion, indexCompletion) => { return <path key={"highlight_" + completion.key} ref={contourRefs.current[indexCompletion]} d={getContourTrajectory(completion, state.viewDiameterWell)} className='notSelectedContour' /> })
    }</>
}

export const CompletionContourFocus: React.FC<Props> = (props) => {

    const [state, setState] = React.useState<State>({ ...props })

    React.useEffect(() => {
        ResolverFactory.getResolver().observablePanZoom.attach(onChangeCompletionsFocus)
        ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWellFocus)

        onChangeCompletionsFocus.update = (updatedData: ObservablePanZoomType) => {
            setState({ completions: updatedData.completions, viewDiameterWell: state.viewDiameterWell })
        }
        onChangeViewDiameterWellFocus.update = (updatedData: ObservableViewDiameterWellType) => {
            setState({ completions: updatedData.completions, viewDiameterWell: updatedData.wellTrajectory.viewDiameterWell })
        }
    })

    return <>{state.completions
        .filter(completion => {
            return completion.layers == undefined || completion.layers.length == 0
                || !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
        })
        .map((completion) => {
            return < path key={"focus_" + completion.key} d={getContourTrajectory(completion, state.viewDiameterWell)} className='notSelectedContour'
                onMouseEnter={() => GlobalObserver.getInstance().observableSetCompletionFromSVG.notify(completion.key)}
                onMouseLeave={() => GlobalObserver.getInstance().observableUnsetCompletionFromSVG.notify(completion.key)} />
    })}</>
}