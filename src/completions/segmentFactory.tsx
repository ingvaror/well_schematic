import * as React from "react"
import { CompletionType, SchematicDirection, SchematicPoint, SchematicLayer } from "../resolver/schematicProps"
import { SlottedComponent } from "./pipes/slotted"
import { CementedBlankPipeComponent } from "./pipes/cementedBlankPipe"
import { BlankPipeComponent } from "./pipes/blankPipe"
import { SegmentICDComponent } from "./segments/segmentICD"
import { SegmentICVComponent } from "./segments/segmentICV"
import { SegmentPackerComponent } from "./segments/segmentPacker"
import { PerfCementedComponent } from "./pipes/perfCemented"
import { ScreenComponent } from "./pipes/screen"
import { JunctionComponent } from "./pipes/junction"

import { getRotateAngle } from "../services/geometryUtilities"

interface Props {
    points: Array<SchematicPoint>
    layer: SchematicLayer
    viewDiameterWell: number
    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }
    uniqueSegmentName: string
    key: string
}

export class SegmentFactory extends React.Component<Props> {

    render() {
        var completionComponent: React.ReactNode = <></>
        switch (this.props.layer.completionName) {
            case CompletionType.SLOTTED_HTML:
                completionComponent = this.props.points
                    .filter((_, index, self) => { return index != self.length - 1 })
                    .map((point, index) => {
                        if (index >= this.props.points.length)
                            alert("Slotted pipe. Index is outside the range")
                        return <SlottedComponent
                            p1={point}
                            p2={this.props.points[index + 1]}
                            leftOffset={this.props.leftOffset}
                            rightOffset={this.props.rightOffset}
                            uniquePatternName={"segment_slotted_pipe_" + this.props.uniqueSegmentName + "_" + index.toString()}
                            gravelInAnnulus={this.props.layer.gravelInAnnulus}
                            key={this.props.uniqueSegmentName + "_slotted" + index.toString()}
                        />
                    })
                break
            case CompletionType.PERF_CEMENTED_HTML:
                completionComponent = <PerfCementedComponent
                    points={this.props.points}
                    leftOffset={this.props.leftOffset}
                    rightOffset={this.props.rightOffset}
                    uniquePatternName={"segment_perf_cemeneted_" + this.props.uniqueSegmentName}
                    wellboreTouchSide={this.props.rightOffset.direction}
                    viewDiameterWell={this.props.viewDiameterWell}
                    drawBlankPipe={false}
                    key={this.props.uniqueSegmentName}
                />
                break
            case CompletionType.BLANK_PIPE_HTML:
                completionComponent = this.props.points
                    .filter((_, index, self) => { return index != self.length - 1 })
                    .map((point, index) => {
                        return <BlankPipeComponent
                            p1={point}
                            p2={this.props.points[index + 1]}
                            uniquePatternName={"segment_blank_pipe_" + this.props.uniqueSegmentName + "_" + index.toString()}
                            leftOffset={this.props.leftOffset}
                            rightOffset={this.props.rightOffset}
                            key={this.props.uniqueSegmentName + index}
                        />
                    })
                break
            case CompletionType.CEMENTED_BLANK_PIPE_HTML:
                completionComponent = <CementedBlankPipeComponent
                    points={this.props.points}
                    leftOffset={this.props.leftOffset}
                    rightOffset={this.props.rightOffset}
                    uniquePatternName={this.props.uniqueSegmentName}
                    drawBlankPipe={false}
                    key={this.props.uniqueSegmentName}
                />
                break
            case CompletionType.SECTION_PACKER_HTML:
                completionComponent = <SegmentPackerComponent
                    points={this.props.points}
                    leftOffset={this.props.leftOffset}
                    rightOffset={this.props.rightOffset}
                    gravelInAnnulus={this.props.layer.gravelInAnnulus}
                    packerLeaking={this.props.layer.packerLeaking}
                    key={this.props.uniqueSegmentName}
                />
                break
            case CompletionType.SCREEN_HTML:
                completionComponent = <ScreenComponent
                    points={this.props.points}
                    leftOffset={this.props.leftOffset}
                    rightOffset={this.props.rightOffset}
                    uniqueGradientName={"segment_perf_cemeneted_" + this.props.uniqueSegmentName}
                    patternTransform={"rotate(" + getRotateAngle(this.props.points[0]).toString() + ") scale(0.1 0.1)"}
                    key={this.props.uniqueSegmentName}
                />
                break
            case CompletionType.SECTION_ICD_HTML:
                completionComponent = <SegmentICDComponent
                    points={this.props.points}
                    leftOffset={this.props.leftOffset}
                    rightOffset={this.props.rightOffset}
                    uniqueSegmentName={"segment_ICD_" + this.props.uniqueSegmentName}
                    key={this.props.uniqueSegmentName}
                />
                break
            case CompletionType.SECTION_ICV_HTML:
                completionComponent = <SegmentICVComponent
                    points={this.props.points}
                    leftOffset={this.props.leftOffset}
                    rightOffset={this.props.rightOffset}
                    uniqueSegmentName={"segment_ICV_" + this.props.uniqueSegmentName}
                    key={this.props.uniqueSegmentName}
                />
                break
            case CompletionType.JUNCTION_HTML:
                completionComponent = <JunctionComponent
                    points={this.props.points}
					viewDiameterWell={this.props.viewDiameterWell}
                    inner={this.props.layer.inner}
                    outer={this.props.layer.outer}
                    handSide={SchematicDirection.RIGHT_HAND_SIDE}
                    key={this.props.uniqueSegmentName}
                />
        }
        return completionComponent
    }
}