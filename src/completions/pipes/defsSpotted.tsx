import * as React from "react"

interface Props {
    viewDiameterWell: number
    uniquePatternName: string
    backgroundColor: string
    key: string
}

export const CEMENTED_SPOTTED_PATTERN = "cemented_spotted_pattern"
export const SAND_SPOTTED_PATTERN = "sand_spotted_pattern"

export const DefsSpotted: React.FC<Props> = (props) => {

    const scaleTransform = props.viewDiameterWell / 200
    return <defs>
        <pattern id={props.uniquePatternName} x="0" y="0" width={100}
            height={100}
            patternUnits="userSpaceOnUse"
            patternTransform={"scale(" + scaleTransform.toString() + ", " + scaleTransform.toString() + ")"} >
            <g key={"pattern_group_" + props.uniquePatternName}>
                <rect x={0} y={0} width={100} height={100} fill={props.backgroundColor} />
                {
                    [...Array(50)].map((_, indexEllipse) => {
                        const radius = Math.random() * 4
                        return <ellipse fill="#000000"
                            key={"ellipse1801" + indexEllipse.toString()}
                            rx={radius}
                            ry={radius}
                            cx={10 + Math.random() * 100}
                            cy={10 + Math.random() * 100}
                        />
                    })
                }
            </g>
        </pattern>
    </defs>
}