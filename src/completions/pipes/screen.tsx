import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getTrajectory } from "../../services/geometryUtilities"

interface Props {
    points: Array<SchematicPoint>
    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }
    patternTransform: string
    uniqueGradientName: string
    key: string
}

export class ScreenComponent extends React.Component<Props, {}> {
    render() {
        const fillName = "url(#" + this.props.uniqueGradientName + ")"
        return <g key={"group_" + this.props.uniqueGradientName}>
            <defs key={"defs_" + this.props.uniqueGradientName}>
                <pattern key={"pattern_" + this.props.uniqueGradientName} id={this.props.uniqueGradientName}
                    width="100" height="30" patternUnits="userSpaceOnUse" patternTransform={this.props.patternTransform}>
                    <rect key={"rect_" + this.props.uniqueGradientName} width="100" height="30" fill="#a6ad21" />
                    <line key={"line1_" + this.props.uniqueGradientName} x1="0" y1="0" x2="100" y2="0" stroke="black" strokeWidth="2px" />
                    <line key={"line2_" + this.props.uniqueGradientName} x1="0" y1="10" x2="100" y2="10" stroke="black" strokeWidth="2px" />
                    <line key={"line3_" + this.props.uniqueGradientName} x1="0" y1="20" x2="100" y2="20" stroke="black" strokeWidth="2px" />
                    <line key={"line4_" + this.props.uniqueGradientName} x1="0" y1="30" x2="100" y2="30" stroke="black" strokeWidth="2px" />
                </pattern>
            </defs>
            <path key={"path_" + this.props.uniqueGradientName} d={getTrajectory(this.props.points, this.props.leftOffset, this.props.rightOffset)} fill={fillName} />
        </g>
    }
}