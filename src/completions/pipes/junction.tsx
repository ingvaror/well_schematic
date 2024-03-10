import * as React from "react"
import { SchematicDirection, SchematicPoint } from "../../resolver/schematicProps"
import { getPointOffset, getPointOffsetMD, getRotateAngle } from "../../services/geometryUtilities"

interface Props {
    points: Array<SchematicPoint>,
	viewDiameterWell: number
    inner: number
    outer: number
    handSide: SchematicDirection,
    key: string
}

export class JunctionComponent extends React.Component<Props, {}> {
    private ORIG_WIDTH: number = 19.488
    private ORIG_HEIGHT: number = 13.707
    render() {
        const singlePoint = this.props.points[this.props.points.length - 1]
        const upPoint = getPointOffsetMD(singlePoint, this.props.viewDiameterWell / 15)
        const upPointInner = getPointOffset(upPoint, this.props.inner, this.props.handSide)

        const scaleX = (this.props.outer - this.props.inner) / this.ORIG_WIDTH
        const scaleY = this.props.viewDiameterWell / 7.5 / this.ORIG_HEIGHT
		const rotateAngle = getRotateAngle(singlePoint)

        const transform = "translate(" + upPointInner.X + ", " + upPointInner.Y + ")" +
            " rotate(" + rotateAngle + ")" +
            " scale(" + scaleX + ", " + scaleY + ")"

        return <g transform={transform}>
            <path d="M0 6.853V0h19.488v13.707H0z" fill="#0f0" />
            <path
                d="M12.278 13.27L.95 6.838 12.618.428"
                fill="none"
                stroke="#000"
                strokeWidth={0.926}
            />
            <path
                d="M18.56 13.27L7.232 6.838 18.9.427"
                fill="none"
                stroke="#000"
                strokeWidth={0.926}
            />
        </g>
    }
}