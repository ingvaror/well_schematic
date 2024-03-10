import * as React from "react"
import { SchematicCompletion, SchematicDirection } from "../resolver/schematicProps"
import { GravelInAnnulusComponent } from "./pipes/gravelInAnnulus"
import { SegmentFactory } from "./segmentFactory"

interface Props {
    completion: SchematicCompletion
    viewDiameterWell: number
    key: string
}

export const RightSegments: React.FC<Props> = (props) => {
    const RIGHT_SEGMENT_NAME = "right_segment_"

    if (props.completion.layers != undefined) {
        return <g key={RIGHT_SEGMENT_NAME + "group_" + props.completion.item}>
            {
                props.completion.layers.map((layer): React.ReactNode => {
                    return <SegmentFactory
                        layer={layer}
                        points={props.completion.points}
                        viewDiameterWell={props.viewDiameterWell}
                        leftOffset={{ offset: layer.inner, direction: SchematicDirection.RIGHT_HAND_SIDE }}
                        rightOffset={{ offset: layer.outer, direction: SchematicDirection.RIGHT_HAND_SIDE }}
                        uniqueSegmentName={RIGHT_SEGMENT_NAME + layer.key}
                        key={RIGHT_SEGMENT_NAME + layer.key}
                    />
                })
            }
            {
                // Gravel in annulus
                props.completion.layers
                    .filter((layer) => { return layer.gravelInAnnulus != undefined && layer.gravelInAnnulus })
                    .map((layer): React.ReactNode => {
                        const indexGravelInAnnulusLayer = props.completion.layers.indexOf(layer)
                        var nextCompletionInnerOffset: number
                        if (indexGravelInAnnulusLayer < props.completion.layers.length - 1)
                            nextCompletionInnerOffset = props.completion.layers[indexGravelInAnnulusLayer + 1].inner
                        else
                            nextCompletionInnerOffset = props.completion.viewDiameterWell / 2.
                        return props.completion.points
                            .filter((_, index, self) => { return index != self.length - 1 })
                            .map((point, index): React.ReactNode => {
                                return <GravelInAnnulusComponent
                                    direction={SchematicDirection.RIGHT_HAND_SIDE}
                                    segmentOuterOffset={layer.outer}
                                    nextCompletionInnerOffset={nextCompletionInnerOffset}
                                    p1={point}
                                    p2={props.completion.points[index + 1]}
                                    uniquePatternName={RIGHT_SEGMENT_NAME + "_gravel_" + props.completion.item + "_" + index}
                                    key={RIGHT_SEGMENT_NAME + "_gravel_" + props.completion.item + "_" + index}
                                />
                            })
                    })
            }
        </g>
    }
    else
        return null
}