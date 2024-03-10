import * as React from "react"
import { SchematicPoint } from "../../resolver/schematicProps"

interface Props {
    viewDiameterWell: number
    surfaceSchematicPoint: SchematicPoint
    plungerSchematicPoint: SchematicPoint
    key: string
}

export const RodSRP: React.FC<Props> = (props) => {
    // Taken from server/well_schematic/data/rod-orig.svg
    const ORIG_WIDTH = 4.273
    const ORIG_HEIGHT = 100.379

    const getTransform = () => {
        const scaleX = props.viewDiameterWell / 12 / ORIG_WIDTH
        const scaleY = (props.plungerSchematicPoint.MD - props.surfaceSchematicPoint.MD) / ORIG_HEIGHT
        const scaleWidth = scaleX * ORIG_WIDTH
        const translateX = props.surfaceSchematicPoint.MDH - scaleWidth / 2
        const translateY = props.surfaceSchematicPoint.TVD

        const tangens = (props.plungerSchematicPoint.TVD - props.surfaceSchematicPoint.TVD) / (props.plungerSchematicPoint.MDH - props.surfaceSchematicPoint.MDH)
        const rotateAngle = -90 + Math.atan(tangens) * 180.0 / Math.PI

        return "translate(" + translateX + "," + translateY + ") " +
            "rotate(" + rotateAngle + ") " +
            "scale(" + scaleX + "," + scaleY + ")"
    }

    return <g transform={getTransform()}>
        <defs>
            <linearGradient id="prefix__a_rod_srp">
                <stop offset={0} />
                <stop offset={1} stopColor="#fff" />
            </linearGradient>
            <linearGradient
                xlinkHref="#prefix__a_rod_srp"
                id="prefix__b_rod_srp"
                x1={37.798}
                y1={63.122}
                x2={46.113}
                y2={63.122}
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(.51386 0 0 2.04299 18.375 -40.21)"
            />
        </defs>
        <path
            fill="url(#prefix__b_rod_srp)"
            d="M37.798 38.554h4.273V138.94h-4.273z"
            transform="translate(-37.798 -38.554)"
        />
    </g>
}