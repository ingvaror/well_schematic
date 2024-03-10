import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getTrajectory } from "../../services/geometryUtilities"
import { BLANK_PIPE_NAME } from "../pipeComponent"
import { BlankPipeComponent } from "./blankPipe"
import { CEMENTED_SPOTTED_PATTERN } from "./defsSpotted"
import { SpottedComponent } from "./spottedPattern"

interface Props {
    points: Array<SchematicPoint>
    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }
    uniquePatternName: string
    drawBlankPipe: boolean
    key: string
}

export class CementedBlankPipeComponent extends React.Component<Props, {}> {
    render() {
        const pathCemenetedTrajectory = getTrajectory(this.props.points, this.props.leftOffset, this.props.rightOffset)
        if (!this.props.drawBlankPipe)
            return <SpottedComponent pathTrajectory={pathCemenetedTrajectory} pathKey={"cemeneted_" + this.props.uniquePatternName} uniquePatternName={CEMENTED_SPOTTED_PATTERN} />
        else {
            return <>
                {
                    this.props.points
                        .filter((_, index, self) => { return index != self.length - 1 })
                        .map((point, index) => {
                            if (index >= this.props.points.length)
                                alert("Blank pipe. Index is outside the range")
                            return <BlankPipeComponent p1={point}
                                p2={this.props.points[index + 1]}
                                uniquePatternName={BLANK_PIPE_NAME + this.props.uniquePatternName + "_" + index.toString()}
                                leftOffset={this.props.rightOffset}
                                rightOffset={{ offset: 0, direction: SchematicDirection.LEFT_HAND_SIDE }}
                                key={BLANK_PIPE_NAME + this.props.uniquePatternName + "_" + index.toString()}
                            />
                        })
                }
                <SpottedComponent pathTrajectory={pathCemenetedTrajectory} pathKey={"cemeneted_" + this.props.uniquePatternName} uniquePatternName={CEMENTED_SPOTTED_PATTERN} />
            </>
        }
    }
}