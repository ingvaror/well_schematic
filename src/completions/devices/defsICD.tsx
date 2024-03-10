import * as React from "react"

interface Props {
    key: string
}

export class DefsICDComponent extends React.Component<Props, {}> {
    render() {
        return (
            <>
                <style type="text/css" id="style1297">
                    {
                        ".prefix__st1_ICD{fill:url(#prefix__grad0-4-ICD)}.prefix__st1_ICD,.prefix__st3_ICD,.prefix__st4_ICD{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:.24}.prefix__st4_ICD{fill:#fff}"
                    }
                </style>
                <defs id="prefix__Patterns_And_Gradients">
                    <linearGradient
                        id="prefix__grad0-4-ICD"
                        x1={0}
                        y1={0}
                        x2={1}
                        y2={0}
                        gradientTransform="rotate(180 .5 .5)"
                    >
                        <stop
                            offset={0.01}
                            stopColor="#145e53"
                            stopOpacity={1}
                            id="prefix__stop1299"
                        />
                        <stop
                            offset={0.5}
                            stopColor="#37bfab"
                            stopOpacity={1}
                            id="prefix__stop1301"
                        />
                        <stop
                            offset={1}
                            stopColor="#145e53"
                            stopOpacity={1}
                            id="prefix__stop1303"
                        />
                    </linearGradient>
                    <linearGradient
                        xlinkHref="#prefix__grad0-4-ICD"
                        id="prefix__linearGradient1412"
                        gradientTransform="scale(.50166 1.99338)"
                        x1={-0.239}
                        y1={18.12}
                        x2={54.06}
                        y2={18.12}
                        gradientUnits="userSpaceOnUse"
                    />
                    <linearGradient
                        xlinkHref="#prefix__grad0-4-ICD"
                        id="prefix__linearGradient1414"
                        gradientTransform="scale(.68827 1.45291)"
                        x1={-0.174}
                        y1={40.168}
                        x2={59.017}
                        y2={40.168}
                        gradientUnits="userSpaceOnUse"
                    />
                </defs>
            </>
        )
    }
}