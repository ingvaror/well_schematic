import * as React from "react"
import { CompletionType, SchematicCompletion, SchematicCompletionPipe, SchematicDirection, SchematicLayer } from "../resolver/schematicProps"
import { getRotateAngle } from "../services/geometryUtilities"
import { BlankPipeComponent } from "./pipes/blankPipe"
import { CementedBlankPipeComponent } from "./pipes/cementedBlankPipe"
import { GravelInAnnulusComponent } from "./pipes/gravelInAnnulus"
import { OpenHoleComponent } from "./pipes/openHole"
import { PerfCementedComponent } from "./pipes/perfCemented"
import { ScreenComponent } from "./pipes/screen"
import { SlottedComponent } from "./pipes/slotted"

interface Props {
    completion: SchematicCompletion
    viewDiameterWell: number
    key: string
}

export const BLANK_PIPE_NAME = "blank_pipe_"
export const PERF_CEMENTED_NAME = "perf_cemeneted_"
export const SLOTTED_PIPE_NAME = "slotted_pipe_"

export const PipeComponent: React.FC<Props> = (props) => {
    const getPipeLeftOffset = (pipeCompletion: SchematicCompletionPipe): { offset: number, direction: SchematicDirection } => {
        // Find segment with the same completion name
        var finded
        props.completion.layers.forEach(layer => {
            if (layer.layerName == pipeCompletion.layerName)
                finded = { offset: layer.outer, direction: SchematicDirection.LEFT_HAND_SIDE }
        })
        return finded
    }

    const getPipeRightOffset = (pipeCompletion: SchematicCompletionPipe): { offset: number, direction: SchematicDirection } => {
        var finded
        props.completion.layers.forEach(layer => {
            if (layer.layerName == pipeCompletion.layerName)
                finded = { offset: layer.inner, direction: SchematicDirection.LEFT_HAND_SIDE }
        })
        return finded
    }

    const getLayer = (pipeCompletion: SchematicCompletionPipe): SchematicLayer => {
        if (props.completion.layers != undefined)
            return props.completion.layers.find((layer) => { return layer.layerName == pipeCompletion.layerName })
        else
            return null
    }

    return <>
        {
            props.completion.pipes
                .filter(pipe => { return pipe.completionName != CompletionType.JUNCTION_HTML })
                .map(pipe => {
                const pipeSegment = props.completion.layers != undefined ? props.completion.layers.find(segment => segment.layerName == pipe.layerName) : null
                switch (pipe.completionName) {
                    case CompletionType.OPEN_HOLE_HTML:
                        return <OpenHoleComponent key={props.completion.key} />
                    case CompletionType.SLOTTED_HTML:
                        return props.completion.points
                            .filter((_, index, self) => { return index != self.length - 1 })
                            .map((point, index) => {
                                if (index >= props.completion.points.length)
                                    alert("Slotted pipe. Index is outside the range")
                                return <SlottedComponent
                                    p1={point}
                                    p2={props.completion.points[index + 1]}
                                    leftOffset={getPipeLeftOffset(pipe)}
                                    rightOffset={{ offset: 0, direction: SchematicDirection.LEFT_HAND_SIDE }}
                                    uniquePatternName={SLOTTED_PIPE_NAME + props.completion.key + "_" + index.toString()}
                                    gravelInAnnulus={pipeSegment.gravelInAnnulus}
                                    key={SLOTTED_PIPE_NAME + props.completion.key + "_" + index.toString()}
                                />
                            })
                    case CompletionType.PERF_CEMENTED_HTML:
                        return <PerfCementedComponent
                            points={props.completion.points}
                            leftOffset={getPipeLeftOffset(pipe)}
                            rightOffset={getPipeRightOffset(pipe)}
                            uniquePatternName={PERF_CEMENTED_NAME + props.completion.key}
                            wellboreTouchSide={SchematicDirection.LEFT_HAND_SIDE}
                            viewDiameterWell={props.viewDiameterWell}
                            drawBlankPipe={true}
                            key={props.completion.key}
                        />
                    case CompletionType.BLANK_PIPE_HTML:
                        return props.completion.points
                            .filter((_, index, self) => { return index != self.length - 1 })
                            .map((point, index) => {
                                if (index >= props.completion.points.length)
                                    alert("Blank pipe. Index is outside the range")
                                return <BlankPipeComponent p1={point}
                                    p2={props.completion.points[index + 1]}
                                    uniquePatternName={BLANK_PIPE_NAME + props.completion.key + "_" + index.toString()}
                                    leftOffset={getPipeLeftOffset(pipe)}
                                    rightOffset={{ offset: 0, direction: SchematicDirection.LEFT_HAND_SIDE }}
                                    key={BLANK_PIPE_NAME + props.completion.key + "_" + index.toString()}
                                />
                            })
                    case CompletionType.CEMENTED_BLANK_PIPE_HTML:
                        return <CementedBlankPipeComponent
                            points={props.completion.points}
                            leftOffset={getPipeLeftOffset(pipe)}
                            rightOffset={getPipeRightOffset(pipe)}
                            uniquePatternName={props.completion.key}
                            drawBlankPipe={true}
                            key={props.completion.key}
                        />
                    case CompletionType.SCREEN_HTML:
                        return <ScreenComponent
                            points={props.completion.points}
                            leftOffset={getPipeLeftOffset(pipe)}
                            rightOffset={{ offset: 0, direction: SchematicDirection.LEFT_HAND_SIDE }}
                            uniqueGradientName={"screen_" + props.completion.key}
                            patternTransform={"rotate(" + getRotateAngle(props.completion.points[0]).toString() + ") scale(0.1 0.1)"}
                            key={props.completion.key}
                        />
                    default:
                        return alert("Undefined pipe in pipes factory: " + pipe.completionName)
                }
            })
        }
        {
            // Gravel in annulus
            props.completion.pipes
                .filter(pipe => { return pipe.completionName != CompletionType.JUNCTION_HTML })
                .filter(pipe => {
                    const pipeLayer = getLayer(pipe)
                    return pipeLayer != undefined && pipeLayer.gravelInAnnulus != undefined && pipeLayer.gravelInAnnulus
                })
                .map(pipe => {
                    const indexGravelInAnnulusLayer = props.completion.layers.indexOf(getLayer(pipe))
                    var nextCompletionInnerOffset: number
                    if (indexGravelInAnnulusLayer < props.completion.layers.length - 1)
                        nextCompletionInnerOffset = props.completion.layers[indexGravelInAnnulusLayer + 1].inner
                    else
                        nextCompletionInnerOffset = props.viewDiameterWell / 2.
                    return props.completion.points
                        .filter((_, index, self) => { return index != self.length - 1 })
                        .map((point, index): React.ReactNode => {
                            return <GravelInAnnulusComponent
                                direction={SchematicDirection.LEFT_HAND_SIDE}
                                segmentOuterOffset={getPipeLeftOffset(pipe).offset}
                                nextCompletionInnerOffset={nextCompletionInnerOffset}
                                p1={point}
                                p2={props.completion.points[index + 1]}
                                uniquePatternName={"pipe_gravel_" + props.completion.item + "_" + index}
                                key={ "pipe_gravel_" + props.completion.item + "_" + index }
                            />
                        })
                })
        }
        </>
}