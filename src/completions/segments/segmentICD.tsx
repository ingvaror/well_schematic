import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getTrajectory } from "../../services/geometryUtilities"
import { SegmentWithHoles } from "./segmentWithHoles"

interface Props {
    points: Array<SchematicPoint>
    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }
    uniqueSegmentName: string
    key: string
}

export class SegmentICDComponent extends React.Component<Props, {}> {
    render() {
        return <g key={"icd_group_" + this.props.uniqueSegmentName}>
            <path fill="#37bfab" d={getTrajectory(this.props.points, this.props.leftOffset, this.props.rightOffset)} />
            <SegmentWithHoles {...this.props}/>
        </g>
    }
}