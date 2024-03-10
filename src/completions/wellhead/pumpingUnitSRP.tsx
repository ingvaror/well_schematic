import * as React from "react"
import { NETOOL_WELLSCHEMATIC_DEVIATION, NETOOL_WELLSCHEMATIC_DEVIATION_WITH_AXES, NETOOL_WELLSCHEMATIC_VERTICAL, WellTrajectory } from "../../resolver/schematicProps"


interface Props {
    viewDiameterWell: number
    wellTrajectory: WellTrajectory
    modeView: string
}

export const PumpingUnitSRP: React.FC<Props> = (props) => {
    // Taken from server/well_schematic/data/pumping-unit-SRP-orig.svg
    const ORIG_WIDTH = 1280
    const ORIG_HEIGHT = 1263

    const getScaleValue = (): number => {
        switch (props.modeView) {
            case NETOOL_WELLSCHEMATIC_VERTICAL:
                return props.wellTrajectory.viewDiameterWell / 1000.
            case NETOOL_WELLSCHEMATIC_DEVIATION:
            case NETOOL_WELLSCHEMATIC_DEVIATION_WITH_AXES:
                return props.wellTrajectory.viewDiameterWell / 500.0
        }
        alert("Undefined mode view: '" + props.modeView + "'")
    }

    const getTransform = () => {
        const sortedPoints = props.wellTrajectory.points.sort((p1, p2) => { return p1.MD - p2.MD })
        const scaleValue = getScaleValue()
        const scaledWidth = ORIG_WIDTH * scaleValue
        const scaledHeight = ORIG_HEIGHT * scaleValue
        return "translate("
            + (sortedPoints[0].MDH - scaledWidth / 12.5).toString() + ", "
            + (-scaledHeight + sortedPoints[0].TVD).toString() + ") "
            + "scale(" + scaleValue + ", " + scaleValue + ")"
    }

    return <g transform={getTransform()}>
        <defs>
            <linearGradient
                id="srp_pumping_unit_prefix__b"
                x1={0}
                y1={0}
                x2={1}
                y2={0}
                gradientTransform="rotate(180 .5 .5)"
            >
                <stop offset={0} stopColor="#c00" />
                <stop offset={0.5} stopColor="#faaf8c" />
                <stop offset={1} stopColor="#c00" />
            </linearGradient>
            <linearGradient
                id="srp_pumping_unit_prefix__a"
                x1={0}
                y1={0}
                x2={1}
                y2={0}
                gradientTransform="rotate(180 .5 .5)"
            >
                <stop offset={0.01} stopColor="#c00" />
                <stop offset={0.5} stopColor="#faaf8c" />
                <stop offset={1} stopColor="#c00" />
            </linearGradient>
            <linearGradient
                xlinkHref="#srp_pumping_unit_prefix__a"
                id="srp_pumping_unit_prefix__g"
                gradientTransform="matrix(.50447 0 0 1.9833 -28.045 -17.85)"
                x1={-0.238}
                y1={18.271}
                x2={36.095}
                y2={18.271}
                gradientUnits="userSpaceOnUse"
            />
            <linearGradient
                xlinkHref="#srp_pumping_unit_prefix__a"
                id="prefix__e"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(2.1075 0 0 6.55226 -788.86 -891.506)"
                x1={-0.238}
                y1={18.271}
                x2={36.095}
                y2={18.271}
            />
            <linearGradient
                xlinkHref="#srp_pumping_unit_prefix__a"
                id="prefix__f"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(2.08547 0 0 6.54035 -490.01 -1383.72)"
                x1={-0.238}
                y1={18.271}
                x2={36.095}
                y2={18.271}
            />
            <linearGradient
                xlinkHref="#srp_pumping_unit_prefix__b"
                id="prefix__c"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(1.17288 0 0 3.73903 623.658 -1214.242)"
                x1={-8.68}
                y1={18.373}
                x2={57.078}
                y2={18.276}
            />
            <linearGradient
                xlinkHref="#srp_pumping_unit_prefix__b"
                id="prefix__d"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(1.19904 0 0 3.84673 958.999 -499.688)"
                x1={-8.68}
                y1={18.373}
                x2={57.078}
                y2={18.276}
            />
        </defs>
        <path
            d="M182.7 38.8l-28.9 38.5-16.7 33.6c-9.3 18.5-20.4 41.2-24.9 50.6-8.4 17.8-9.4 20.8-32.8 105.5-3.2 11.6-3.8 16.2-7.9 61-3.7 39.9-4.5 52.4-4.5 70.5 0 35.1 3.8 70.2 11.6 107.3 1.9 8.9 3.4 16.5 3.4 16.7 0 .3 1.8.2 4-.1l4-.7V1034H45l-45.02-.044v107l.014 122.045 103.418.004h101.331L206 1141v-107h-90V516.1l3.8-1c2-.5 17-3.8 33.2-7.2 16.2-3.5 29.7-6.4 29.8-6.5.2-.1-1-6.5-2.7-14.1-5.8-26-10-61-10.1-83.7-.1-11.4 1.1-29 3.9-60.3 2.3-24.3 4.1-44.9 4.1-45.7 0-.9.6-1.6 1.4-1.6 1.2 0 114.8 32.4 409.4 116.6 2.8.9 5.2 2 5.2 2.6 0 .5-17.3 42.5-38.4 93.1-79.9 191.6-223 534.8-267.3 640.7-18.9 45.4-34.5 82.9-34.6 83.3-.1.4 15.8 7.5 35.3 15.7 29.4 12.3 35.6 14.6 36.3 13.4.8-1.4 49.2-117.3 107.5-257.3 13.6-32.6 25.2-59.5 25.8-59.7.6-.3 27.8 11 60.5 25 66 28.2 266.1 113.7 345.9 147.8 28.3 12.1 52 22.5 52.7 23.1.7.7 12.5 28.4 26.4 61.7 13.8 33.3 25.2 60.6 25.3 60.7.1.1 16.2-6.4 35.7-14.6 24-10.1 35.3-15.3 35.1-16.2-.3-1.3-41.6-100.8-245.7-590.7-43.8-105.3-79.5-191.5-79.3-191.8.5-.4 233.6 66 234.4 66.9.3.3-2.7 12.3-6.6 26.7-3.9 14.5-6.8 26.6-6.3 27 .4.5 42 17 92.3 36.8 127.2 50.1 181.9 71.7 186.2 73.5 2.1.9 4 1.3 4.2.9.2-.4 1.6-5.2 3.1-10.7 1.4-5.5 3.5-13.4 4.6-17.5 1.2-4.1 6-22.4 10.9-40.5 4.9-18.2 9.8-36.6 11-41 1.2-4.4 6.1-22.9 11-41 9.9-37.1 11.7-43.8 15.6-58 4-14.9 4-14.3 1.3-14.9-1.3-.3-13-2.4-25.9-4.6-12.9-2.3-30.7-5.4-39.5-7-8.8-1.6-24.1-4.3-34-6-18.5-3.3-32.5-5.7-73.5-13-41.2-7.3-55.1-9.8-73.5-13-9.9-1.7-25.2-4.5-33.9-6.1-8.8-1.5-16.1-2.7-16.2-2.6-.1.1-1.8 6.5-3.9 14.2-5.4 20.3-5.7 21.5-6.6 21.5-.4 0-90.4-25.7-200.1-57.1C660.2 352.6 487 303 385 273.9c-102-29.2-185.6-53.2-185.8-53.3-1-1.1 6.6-18.2 22.2-49.4l18.4-36.7 27.1-36.3C281.8 78.3 294 61.8 294 61.5c0-.3-79.3-59.4-81.5-60.7-.5-.3-14 16.8-29.8 38zm513.7 568.7c26.6 63.8 48.1 116.3 47.7 116.6-.9 1-233.1 93.8-233.1 93.2 0-.3 27.1-65.4 60.1-144.7 33.1-79.2 63.8-152.8 68.2-163.5 4.5-10.7 8.2-19 8.4-18.5.2.5 22.1 53.1 48.7 116.9zm129 309.5c27.6 66.3 49.9 120.6 49.6 120.7-.3.2-50-20.9-110.5-46.7-60.5-25.9-137.1-58.6-170.2-72.8-33.2-14.1-60.2-25.9-60.2-26.2 0-.8 238.3-96 239.7-95.7.8.1 22.9 51.9 51.6 120.7z"
            fill="#333"
        />
        <rect
            x={612.912}
            y={-1298.287}
            width={78.245}
            height={525.916}
            className="srp_pumping_unit_prefix__st2"
            transform="matrix(-.40685 .9135 -.9205 -.39075 0 0)"
            ry={0}
            fill="url(#prefix__c)"
        />
        <rect
            x={948.389}
            y={-483.188}
            width={78.619}
            height={380.616}
            className="srp_pumping_unit_prefix__st2"
            transform="matrix(.36097 .93258 -.92831 .3718 0 0)"
            ry={0}
            fill="url(#prefix__d)"
        />
        <rect
            x={-787.982}
            y={-1046.074}
            width={78.449}
            height={903.289}
            className="srp_pumping_unit_prefix__st2"
            transform="matrix(-.92553 -.37868 .38671 -.9222 0 0)"
            ry={0}
            fill="url(#prefix__e)"
        />
        <rect
            x={-489.14}
            y={-1538.007}
            width={78.237}
            height={919.591}
            className="srp_pumping_unit_prefix__st2"
            transform="rotate(157.5)"
            ry={0}
            fill="url(#prefix__f)"
        />
        <g transform="matrix(1.4159 -3.89014 3.09608 1.12688 320.124 211.52)">
            <path
                className="srp_pumping_unit_prefix__st2"
                transform="matrix(.99616 -.08752 .05557 .99845 0 0)"
                fill="url(#srp_pumping_unit_prefix__g)"
                d="M-29.138-34.686h19.147v243.381h-19.147z"
            />
        </g>
    </g>
}