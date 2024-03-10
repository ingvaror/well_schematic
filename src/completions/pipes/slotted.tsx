import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { makeid } from "../../services/commonUtilities"
import { getPathGeometry, getPathTransform } from "../../services/geometryUtilities"
import { BlankPipeComponent } from "./blankPipe"

interface Props {
    p1: SchematicPoint
    p2: SchematicPoint
    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }
    uniquePatternName: string
    gravelInAnnulus?: boolean
    key: string
}

export class SlottedComponent extends React.Component<Props, {}> {	
    render() {
        const widthOrig = 100
        const heightOrig = 100

        const geometry = getPathGeometry(this.props.p1, this.props.p2, this.props.leftOffset, this.props.rightOffset)
        const patternTransform = getPathTransform(this.props.p1, this.props.p2, this.props.leftOffset, this.props.rightOffset, widthOrig, heightOrig)
        return <g key={"group_" + this.props.uniquePatternName}>
            <defs>
                <pattern id={this.props.uniquePatternName} x="0" y="0" width={widthOrig}
                    height={heightOrig}
                    patternUnits="userSpaceOnUse"
                    patternTransform={patternTransform}
                >
                    <g key={"pattern_group_" + this.props.uniquePatternName}>
                        <rect fill="#ffffff"
                            key={makeid("slottedRect1")}
                            x={30}
                            y={10}
                            width={5}
                            height={40} />
                        <rect fill="#ffffff"
                            key={makeid("slottedRect2")}
                            x={70}
                            y={50}
                            width={5}
                            height={40} />
                    </g>
                </pattern>
            </defs>
            <BlankPipeComponent {...this.props}/>
            <path key={"path_" + this.props.uniquePatternName} fill={"url(#" + this.props.uniquePatternName + ")"} d={geometry} />
        </g>
    }
}