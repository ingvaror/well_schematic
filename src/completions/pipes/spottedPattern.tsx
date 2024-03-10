import * as React from "react"

interface Props {
    uniquePatternName: string
    pathTrajectory: string
    pathKey: string
}

export class SpottedComponent extends React.Component<Props, {}> {
    render() {
        return <path key={"path_" + this.props.pathKey} fill={"url(#" + this.props.uniquePatternName + ")"} d={this.props.pathTrajectory} />
    }
}