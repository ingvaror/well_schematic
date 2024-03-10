import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getPathGeometry, getPathTransform, getTrajectory } from "../../services/geometryUtilities"

interface Props {
    points: Array<SchematicPoint>
    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }
    uniqueSegmentName: string
}

export class SegmentWithHoles extends React.Component<Props, {}> {
    render() {
        return this.props.points
            .filter((_, index, self) => { return index != self.length - 1 })
            .map((point1, index) => {
                const point2 = this.props.points[index + 1]
                const widthOrig = 100
                const heightOrig = 100

                const geometry = getPathGeometry(point1, point2, this.props.leftOffset, this.props.rightOffset)
                const patternTransform = getPathTransform(point1, point2,
                    this.props.leftOffset, this.props.rightOffset,
                    widthOrig, heightOrig)
                return <g key={"group_" + this.props.uniqueSegmentName + index.toString()}>
                    <defs>
                        <pattern id={this.props.uniqueSegmentName} x="0" y="0" width={widthOrig}
                            height={heightOrig}
                            patternUnits="userSpaceOnUse"
                            patternTransform={patternTransform}
                        >
                            <g key={"pattern_group_" + this.props.uniqueSegmentName + index.toString()}>
                                <ellipse fill="#ffffff"
                                    key={"ellipse187-5-6" + index.toString()}
                                    rx={10}
                                    ry={10}
                                    cx={25}
                                    cy={50}
                                    strokeWidth={1}
                                    stroke="#000000"
                                />
                                <ellipse fill="#ffffff"
                                    key={"ellipse187-5-6-1" + index.toString()}
                                    rx={10}
                                    ry={10}
                                    cx={75}
                                    cy={50}
                                    strokeWidth={1}
                                    stroke="#000000"
                                />
                            </g>
                        </pattern>
                    </defs>
                    <path key={"path_" + this.props.uniqueSegmentName + index.toString()} fill={"url(#" + this.props.uniqueSegmentName + ")"} d={geometry} />
                </g>
            })
    }
}