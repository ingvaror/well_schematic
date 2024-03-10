import * as React from "react"

interface Props {
    key: string
}

export class DefsICVComponent extends React.Component<Props, {}> {
    render() {
        return (
            <>
                <style type="text/css" id="style71">
                    {
                        ".prefix__st1-ICV{fill:url(#prefix__grad0-5-ICV)}.prefix__st1-ICV,.prefix__st2-ICV{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:.24}"
                    }
                </style>
                <defs id="prefix__Patterns_And_Gradients">
                    <linearGradient
                        id="prefix__grad0-5-ICV"
                        x1={0}
                        y1={0}
                        x2={1}
                        y2={0}
                        gradientTransform="rotate(180 .5 .5)"
                    >
                        <stop
                            offset={0.01}
                            stopColor="#663d9c"
                            stopOpacity={1}
                            id="prefix__stop73-ICV"
                        />
                        <stop
                            offset={0.5}
                            stopColor="#a280cf"
                            stopOpacity={1}
                            id="prefix__stop75-ICV"
                        />
                        <stop
                            offset={1}
                            stopColor="#663d9c"
                            stopOpacity={1}
                            id="prefix__stop77-ICV"
                        />
                    </linearGradient>
                    <linearGradient
                        xlinkHref="#prefix__grad0-5-ICV"
                        id="prefix__linearGradient136-ICV"
                        gradientTransform="scale(.5799 1.72444)"
                        x1={-0.207}
                        y1={427.896}
                        x2={31.247}
                        y2={427.896}
                        gradientUnits="userSpaceOnUse"
                    />
                    <linearGradient
                        xlinkHref="#prefix__grad0-5-ICV"
                        id="prefix__linearGradient138-ICV"
                        gradientTransform="scale(.77597 1.28872)"
                        x1={-0.155}
                        y1={579.553}
                        x2={34.95}
                        y2={579.553}
                        gradientUnits="userSpaceOnUse"
                    />
                </defs>
            </>
        )
    }
}