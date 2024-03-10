import * as React from "react"

interface Props {
    key: string
}

export class ICVComponent extends React.Component<Props, {}> {
    render() {
        return (
            <g>
                <g id="prefix__group1-1" transform="translate(.12 -737.84)">
                    <title id="prefix__title83">{"1.00&quot; Flow Meter"}</title>
                    <g id="prefix__shape2-2" transform="translate(9 -.035)">
                        <title id="prefix__title85">{"Sheet.2"}</title>
                        <path
                            className="prefix__st1-ICV"
                            id="prefix__rect87"
                            fill="url(#prefix__linearGradient136-ICV)"
                            d="M0 738h18v54H0z"
                        />
                    </g>
                    <g id="prefix__shape3-6" transform="translate(0 -4.535)">
                        <title id="prefix__title90">{"Sheet.3"}</title>
                        <path
                            d="M9 792l18-.01v-44.98L9 747l-9 8.66v29.41z"
                            className="prefix__st1-ICV"
                            id="prefix__path92"
                            fill="url(#prefix__linearGradient138-ICV)"
                        />
                    </g>
                    <g id="prefix__shape4-9" transform="translate(0 -40.535)">
                        <title id="prefix__title95">{"Sheet.4"}</title>
                        <path d="M0 792h27" className="prefix__st2-ICV" id="prefix__path97" />
                    </g>
                    <g id="prefix__shape5-12" transform="translate(0 -11.285)">
                        <title id="prefix__title100">{"Sheet.5"}</title>
                        <path
                            d="M0 792h27"
                            className="prefix__st2-ICV"
                            id="prefix__path102"
                        />
                    </g>
                </g>
            </g>
        );
    }
}