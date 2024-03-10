import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getFourPathPoints, getWidthGround } from "../../services/geometryUtilities"
import { CementedBlankPipeComponent } from "./cementedBlankPipe"
import './cementedBlankPipe.css'

interface Props {
    points: Array<SchematicPoint>
    leftOffset: { offset: number, direction: SchematicDirection }
    rightOffset: { offset: number, direction: SchematicDirection }
    uniquePatternName: string
    drawBlankPipe: boolean
    wellboreTouchSide: SchematicDirection
    viewDiameterWell: number
    key: string
}

export class PerfCementedComponent extends React.Component<Props, {}> {

    private getTriangles(
        rotateAngle: number,
        distancePerforation: number, segmentWidth: number, segmentHeight: number,
        firstTrianglePoint1: { X: number, Y: number },
        getTrianglePoint3: (trianglePoint1: { X: number, Y: number }, segmentWidth: number, distancePerforation: number) => { X: number, Y: number })
    {
        const patternTransform = "rotate(" + (rotateAngle).toString() + " " + firstTrianglePoint1.X + " " + firstTrianglePoint1.Y + ")"

        if (distancePerforation > segmentHeight) {
            // very little thickness of segment
            distancePerforation = segmentHeight / 3
        }

        return [...Array(parseInt((segmentHeight / distancePerforation).toString().replace(',', '.')))]
            .map((_, triangleIndex) => {
                const offsetY = (triangleIndex + 0.25) * distancePerforation
                const trianglePoint1 = { X: firstTrianglePoint1.X, Y: firstTrianglePoint1.Y + offsetY }
                const trianglePoint2 = { X: trianglePoint1.X, Y: trianglePoint1.Y + distancePerforation / 2 }
                const trianglePoint3 = getTrianglePoint3(trianglePoint1, segmentWidth, distancePerforation)
                return <path key={"path_" + this.props.uniquePatternName + triangleIndex.toString()}
                    fill="#A1E9E7" d={"M " + trianglePoint1.X + " " + trianglePoint1.Y +
                        " L " + trianglePoint2.X + " " + trianglePoint2.Y +
                        " L " + trianglePoint3.X + " " + trianglePoint3.Y + " Z"}
                    transform={patternTransform} />
        })
    }

    private getPerforations(): React.ReactNode {
        return this.props.points
            .filter((_, index, self) => { return index != self.length - 1 })
            .map((point1, pointIndex) => {
                const point2 = this.props.points[pointIndex + 1]
                const segmentWidth = Math.abs(this.props.leftOffset.offset - this.props.rightOffset.offset)
                const tangens = (point2.TVD - point1.TVD) / (point2.MDH - point1.MDH)
                const rotateAngle = -90 + Math.atan(tangens) * 180.0 / Math.PI

                const fourPathPoints = getFourPathPoints(point1, point2, this.props.leftOffset, this.props.rightOffset)
                const widthGround = getWidthGround(this.props.viewDiameterWell)

                const distancePerforation = segmentWidth

                if (this.props.wellboreTouchSide == SchematicDirection.LEFT_HAND_SIDE) {
                    const segmentHeight = Math.sqrt(Math.pow(fourPathPoints[0].X - fourPathPoints[1].X, 2) + Math.pow(fourPathPoints[0].Y - fourPathPoints[1].Y, 2))
                    return this.getTriangles(rotateAngle, distancePerforation, segmentWidth, segmentHeight, fourPathPoints[3],
                        (trianglePoint1: { X: number, Y, number }, segmentWidth: number, distancePerforation: number) => {
                            return { X: trianglePoint1.X - segmentWidth - widthGround, Y: (trianglePoint1.Y + distancePerforation / 4) }
                        })
                } else {
                    const segmentHeight = Math.sqrt(Math.pow(fourPathPoints[2].X - fourPathPoints[3].X, 2) + Math.pow(fourPathPoints[2].Y - fourPathPoints[3].Y, 2))
                    return this.getTriangles(rotateAngle, distancePerforation, segmentWidth, segmentHeight, fourPathPoints[0],
                        (trianglePoint1: { X: number, Y, number }, segmentWidth: number, distancePerforation: number) => {
                            return { X: trianglePoint1.X + segmentWidth + widthGround, Y: (trianglePoint1.Y + distancePerforation / 4) }
                        })
                }
            })
    }

    render() {
        return <g key={"group_perf_cemented_" + this.props.uniquePatternName}>
            <CementedBlankPipeComponent {...this.props} />
            {this.getPerforations()}
        </g>
    }
}
