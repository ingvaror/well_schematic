import * as React from "react"
import { SchematicCompletion, SchematicDirection } from "../resolver/schematicProps"
import { makeid } from "../services/commonUtilities"
import { getPointOffset, getPointOffsetMD } from "../services/geometryUtilities"

interface Props {
    completion: SchematicCompletion
    nextCompletion: SchematicCompletion
    viewDiameterWell: number
    key: string
}

// If ID and OD of the pipes/devices on different layers don't overlap - Netool simulates a gap.
// If ID and OD of the pipes/devices on the same layer don't overlap - Netool assumes it to be the same completion string and does not simulate a gap.

export const CorrectPlumbing: React.FC<Props> = (props) => {

    const getPathPlumbing = (pipeThikness: number, OD: number, ID: number, side: SchematicDirection): React.ReactNode => {
        const lastPoint = props.completion.points[props.completion.points.length - 1]
        const nextPoint = getPointOffsetMD(lastPoint, -pipeThikness)

        const p1 = getPointOffset(lastPoint, OD, side)
        const p2 = getPointOffset(lastPoint, ID, side)
        const p3 = getPointOffset(nextPoint, ID, side)
        const p4 = getPointOffset(nextPoint, OD, side)
        
        const trajectory = "M " + p1.X.toString() + " " + p1.Y.toString() +
        " L " + p2.X.toString() + " " + p2.Y.toString() +
        " L " + p3.X.toString() + " " + p3.Y.toString() +
        " L " + p4.X.toString() + " " + p4.Y.toString() +
        " Z"
        return <path key={makeid("correctPlumbingPath_")} d={trajectory} fill="#A09E9D"/>

    }

    if (props.nextCompletion != null && props.nextCompletion.layers != null && props.nextCompletion.layers.length > 0
        && props.completion.layers != null && props.completion.layers.length > 0) {
        return <>
            {
                props.completion.layers.map(layer => {
                    return props.nextCompletion.layers
                        .filter(theSameLayerFromNextCompletion => theSameLayerFromNextCompletion.layerName == layer.layerName && 
                            (layer.inner - 10e-10 > theSameLayerFromNextCompletion.outer || layer.outer + 10e-10  < theSameLayerFromNextCompletion.inner))
                        .map(theSameLayerFromNextCompletion => {
                            if (layer.inner > theSameLayerFromNextCompletion.outer) {
                                return <g key={makeid("correctPlumbing_")}> 
                                    { getPathPlumbing(props.viewDiameterWell / 20, layer.outer, theSameLayerFromNextCompletion.outer, SchematicDirection.RIGHT_HAND_SIDE) }
                                    { getPathPlumbing(props.viewDiameterWell / 20, layer.outer, theSameLayerFromNextCompletion.outer, SchematicDirection.LEFT_HAND_SIDE) }
                                </g>
                            } else {
                                return <g key={makeid("correctPlumbing_")}> 
                                { getPathPlumbing(- props.viewDiameterWell / 20, theSameLayerFromNextCompletion.outer, layer.outer, SchematicDirection.RIGHT_HAND_SIDE) }
                                { getPathPlumbing(- props.viewDiameterWell / 20, theSameLayerFromNextCompletion.outer, layer.outer, SchematicDirection.LEFT_HAND_SIDE) }
                                </g>
                            }
                        })
                })
            }
        </>
    } else {
        return null;
    }
}