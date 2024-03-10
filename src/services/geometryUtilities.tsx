import { SchematicDirection, SchematicPoint } from "../resolver/schematicProps"

export function getPointOffset(point: SchematicPoint, offset: number, direction: SchematicDirection): { X: number, Y: number } {
    switch (direction) {
        case SchematicDirection.RIGHT_HAND_SIDE:
            return { X: point.MDH + offset * point.sinInclination, Y: point.TVD - offset * point.cosInclination }
        case SchematicDirection.LEFT_HAND_SIDE:
            return { X: point.MDH - offset * point.sinInclination, Y: point.TVD + offset * point.cosInclination }
    }
}

export function getRotateAngle(point: SchematicPoint): number {
    return -90 + Math.asin(point.sinInclination) * 180.0 / Math.PI
}

export function getSortedPoints(points: Array<SchematicPoint>): Array<SchematicPoint> {
    return points.sort((p1, p2) => { return p1.MD - p2.MD })
}

export function getTrajectory(
    points: Array<SchematicPoint>,
    leftOffset: { offset: number, direction: SchematicDirection },
    rightOffset: { offset: number, direction: SchematicDirection }): string
{
    var trajectory = ""
    const sortedPoints = points.sort((p1, p2) => { return p1.MD - p2.MD })
    sortedPoints.forEach((point) => {
        const rightPoint = getPointOffset(point, rightOffset.offset, rightOffset.direction)
        if (trajectory == "")
            trajectory += "M " + rightPoint.X + " " + rightPoint.Y
        else
            trajectory += " L " + rightPoint.X + " " + rightPoint.Y
    })
    sortedPoints.slice().reverse().forEach((point) => {
        const leftPoint = getPointOffset(point, leftOffset.offset, leftOffset.direction)
        trajectory += " L " + leftPoint.X + " " + leftPoint.Y
    })
    trajectory += " Z"
    return trajectory
}

export function getFourPathPoints(
    inputP1: SchematicPoint, inputP2: SchematicPoint,
    leftOffset: { offset: number, direction: SchematicDirection },
    rightOffset: { offset: number, direction: SchematicDirection }): { X: number, Y: number }[]
{
    /* (example: '|'  is center of well)
     * |    p1 <---- p4
     *       |        ^
     *       V        |
     * |    p2 ----> p3
     * */

    const p1 = getPointOffset(inputP1, leftOffset.offset, leftOffset.direction)
    const p2 = getPointOffset(inputP2, leftOffset.offset, leftOffset.direction)
    const p3 = getPointOffset(inputP2, rightOffset.offset, rightOffset.direction)
    const p4 = getPointOffset(inputP1, rightOffset.offset, rightOffset.direction)
    return [p1, p2, p3, p4]
}

export function getPathGeometry(inputP1: SchematicPoint, inputP2: SchematicPoint,
    leftOffset: { offset: number, direction: SchematicDirection },
    rightOffset: { offset: number, direction: SchematicDirection }) {
    const points = getFourPathPoints(inputP1, inputP2, leftOffset, rightOffset)
    return "M " + points[0].X.toString() + " " + points[0].Y.toString() +
        " L " + points[1].X.toString() + " " + points[1].Y.toString() +
        " L " + points[2].X.toString() + " " + points[2].Y.toString() +
        " L " + points[3].X.toString() + " " + points[3].Y.toString() +
        " Z"
}

export function getPathTransform(inputP1: SchematicPoint, inputP2: SchematicPoint,
    leftOffset: { offset: number, direction: SchematicDirection },
    rightOffset: { offset: number, direction: SchematicDirection },
    widthOrig: number, heightOrig: number
) {
    const widthInterval = Math.abs(rightOffset.offset - leftOffset.offset)
    const heightInterval = inputP2.MD - inputP1.MD

    const widthScale = widthInterval / widthOrig
    const heigthScale = heightInterval / heightOrig

    const angle1 = getRotateAngle(inputP1)
    const angle2 = getRotateAngle(inputP2)
    return "rotate(" + ((angle1 + angle2) / 2).toString() + ") scale(" + widthScale + ", " + heigthScale + ")"
}

export function getSchematicPointIndex(points: Array<SchematicPoint>, MD: number): number {
    var searchIndex = -1
    points.forEach((point, index) => { if (point.MD == MD) searchIndex = index })
    return searchIndex
}

export function getPointOffsetMD(point: SchematicPoint, offsetMD: number): SchematicPoint {
    return {
        MD: point.MD - offsetMD,
        TVD: point.TVD - point.sinInclination * offsetMD,
        MDH: point.MDH - point.cosInclination * offsetMD,
        X: point.X,
        Y: point.Y,
        sinInclination: point.sinInclination,
        cosInclination: point.cosInclination,
        Rwell: point.Rwell,
    }
}

export function getArrowOffsetMD(pointUp: SchematicPoint, pointDown: SchematicPoint, arrowMD: number): SchematicPoint {
    var cosInclination = Number.NaN
    var sinInclination = Number.NaN
    if (Math.abs(pointDown.cosInclination) < 0.8) {
        cosInclination = (pointDown.MDH - pointUp.MDH) / (pointDown.MD - pointUp.MD)
        sinInclination = Math.sqrt(1 - Math.pow(cosInclination, 2))
    } else {
        sinInclination = (pointDown.TVD - pointUp.TVD) / (pointDown.MD - pointUp.MD)
        cosInclination = Math.sqrt(1 - Math.pow(sinInclination, 2))
    }
    if (Number.isNaN(cosInclination)/* || pointUp.sinInclination == 1.0 && pointDown.sinInclination == 1.0*/) {
        sinInclination = 1.0
        cosInclination = 0.0
    }
    var offsetMD = pointDown.MD - arrowMD
    return {
        MD: arrowMD,
        TVD: pointDown.TVD - sinInclination * offsetMD,
        MDH: pointDown.MDH - cosInclination * offsetMD,
        X: null,
        Y: null,
        sinInclination: sinInclination,
        cosInclination: cosInclination,
        Rwell: pointDown.Rwell,
    }
}

export function getWidthGround(viewDiameterWell: number) {
    return viewDiameterWell / 8.
}

export function insidePoint(x1, y1, x2,
    y2, x, y): boolean {
    if (x > x1 && x < x2 && y > y1 && y < y2)
        return true
    return false
}