import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getFourPathPoints } from "../../services/geometryUtilities"

interface Props {
    p1: SchematicPoint
    p2: SchematicPoint

    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }

    uniquePatternName: string

    key: string
}

export class BlankPipeComponent extends React.Component<Props, {}> {
    render() {
        if (this.props.p2 === undefined)
            alert("BlankPipeComponent p2 is undefined")
        const points = getFourPathPoints(this.props.p1, this.props.p2, this.props.leftOffset, this.props.rightOffset)
        const trajectory = "M " + points[0].X.toString() + " " + points[0].Y.toString() +
            " L " + points[1].X.toString() + " " + points[1].Y.toString() +
            " L " + points[2].X.toString() + " " + points[2].Y.toString() +
            " L " + points[3].X.toString() + " " + points[3].Y.toString() +
            " Z"
        return <g key={"group_" + this.props.uniquePatternName}>
            <path key={"path_" + this.props.uniquePatternName} d={trajectory} fill="#A09E9D" />
        </g>
    }
}