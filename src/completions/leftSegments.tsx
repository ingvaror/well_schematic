import * as React from "react"
import { SchematicCompletion, SchematicDirection } from "../resolver/schematicProps"
import { GravelInAnnulusComponent } from "./pipes/gravelInAnnulus"
import { SegmentFactory } from "./segmentFactory"

interface Props {
    completion: SchematicCompletion
    viewDiameterWell: number
    key: string
}

export const LeftSegments: React.FC<Props> = (props) => {
    const LEFT_SEGMENT_NAME = "left_segment_"

    const outerDevice = (props.completion.devices != undefined || props.completion.devices.length == 0) ? props.completion.devices.sort((d1, d2) => { return d2.outer - d1.outer })[0] : null

    if (props.completion.layers != undefined) {
        return <>
            {
                props.completion.layers
                    .filter(layer => {
                        return (props.completion.devices == undefined || !props.completion.devices.some(device => device.outer > layer.inner)) &&
                            (props.completion.devices == undefined || !props.completion.devices.some(device => device.layerName == layer.layerName)) &&
                            (props.completion.pipes == undefined || props.completion.pipes.length == 0)
                    })
                    .map((layer): React.ReactNode => {
                        return <SegmentFactory
                            layer={layer}
                            points={props.completion.points}
                            viewDiameterWell={props.completion.viewDiameterWell}
                            leftOffset={{ offset: layer.outer, direction: SchematicDirection.LEFT_HAND_SIDE }}
                            rightOffset={{ offset: layer.inner, direction: SchematicDirection.LEFT_HAND_SIDE }}
                            uniqueSegmentName={LEFT_SEGMENT_NAME + layer.key}
                            key={LEFT_SEGMENT_NAME + layer.key}
                        />
                    })
            }
            {
                // Gravel in annulus
                props.completion.layers
                    .filter((layer) => { return layer.gravelInAnnulus != undefined && layer.gravelInAnnulus })
                    .filter(layer => {
                        return (props.completion.devices == undefined || !props.completion.devices.some(device => device.outer > layer.inner)
                            || outerDevice == null || outerDevice.layerName == layer.layerName) &&
                            //(props.completion.devices == undefined || !props.completion.devices.some(device => device.layerName == layer.layerName)) &&
                            (props.completion.pipes == undefined || props.completion.pipes.length == 0)
                    })
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
                                    direction={SchematicDirection.LEFT_HAND_SIDE}
                                    segmentOuterOffset={layer.outer}
                                    nextCompletionInnerOffset={nextCompletionInnerOffset}
                                    p1={point}
                                    p2={props.completion.points[index + 1]}
                                    uniquePatternName={LEFT_SEGMENT_NAME + "_gravel_" + props.completion.item + "_" + index}
                                    key={LEFT_SEGMENT_NAME + "_gravel_" + props.completion.item + "_" + index}
                                />
                            })
                    })
            }
        </>
    }
    else
        return null
}