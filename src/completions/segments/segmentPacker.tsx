import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getTrajectory } from "../../services/geometryUtilities"
import { GravelPattern } from "../gravelPattern"

interface Props {
    points: Array<SchematicPoint>
    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }
    gravelInAnnulus: boolean
    packerLeaking: boolean
    key: string
}

export class SegmentPackerComponent extends React.Component<Props, {}> {
    render() {
        var packerTrajectory = ""
        var gravelTrajectory = ""
        var colorPacker = this.props.packerLeaking ? "#FF0033" : "#CC0000"
        if (this.props.gravelInAnnulus) {
            // split segment in two parts
            const middleOffset = this.props.leftOffset.offset + (this.props.rightOffset.offset - this.props.leftOffset.offset) / 2
            packerTrajectory = getTrajectory(this.props.points, this.props.leftOffset, { offset: middleOffset, direction: this.props.leftOffset.direction })
            gravelTrajectory = getTrajectory(this.props.points, { offset: middleOffset, direction: this.props.leftOffset.direction }, this.props.rightOffset)

            return <>
                <GravelPattern />
                <path className="st_well" d={gravelTrajectory} />
                <path fill={colorPacker} d={packerTrajectory} />
            </>
        } else {
            packerTrajectory = getTrajectory(this.props.points, this.props.leftOffset, this.props.rightOffset)
            return <path fill={colorPacker} d={packerTrajectory} />
        }
    }
}