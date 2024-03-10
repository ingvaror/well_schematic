import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getFourPathPoints } from "../../services/geometryUtilities"
import { SAND_SPOTTED_PATTERN } from "./defsSpotted"
import { SpottedComponent } from "./spottedPattern"

interface Props {
    direction: SchematicDirection
    segmentOuterOffset: number              // Outer radius (offset) of completion which is surrounded by gravel
    nextCompletionInnerOffset: number       // Inner radius (offset) of next completion (nextCompletionInnerOffset > segmentOuterOffset).
                                            //    or radius of wellbore if next completion doesn't exist

    p1: SchematicPoint                      // First point 
    p2: SchematicPoint                      // Last point
    uniquePatternName: string               // Unique pattern name
    key: string
}


export const GravelInAnnulusComponent: React.FC<Props> = (props) => {
    var gravelLeftOffset, gravelRightOffset: { offset: number, direction: SchematicDirection }
    if (props.direction == SchematicDirection.LEFT_HAND_SIDE) {
        gravelLeftOffset = {
            direction: SchematicDirection.LEFT_HAND_SIDE,
            offset: props.nextCompletionInnerOffset
        }
        gravelRightOffset = {
            direction: SchematicDirection.LEFT_HAND_SIDE,
            offset: props.segmentOuterOffset
        }
    } else {
        gravelLeftOffset = {
            direction: SchematicDirection.RIGHT_HAND_SIDE,
            offset: props.segmentOuterOffset
        }
        gravelRightOffset = {
            direction: SchematicDirection.RIGHT_HAND_SIDE,
            offset: props.nextCompletionInnerOffset
        }
    }
    const points = getFourPathPoints(props.p1, props.p2, gravelLeftOffset, gravelRightOffset)
    const trajectory = "M " + points[0].X.toString() + " " + points[0].Y.toString() +
        " L " + points[1].X.toString() + " " + points[1].Y.toString() +
        " L " + points[2].X.toString() + " " + points[2].Y.toString() +
        " L " + points[3].X.toString() + " " + points[3].Y.toString() +
        " Z"

    return <SpottedComponent uniquePatternName={SAND_SPOTTED_PATTERN} pathTrajectory={trajectory} pathKey={"spotted_" + props.uniquePatternName} />
}
