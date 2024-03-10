import * as React from "react"
import { CompletionType, SchematicCompletion } from "../resolver/schematicProps"
import { makeid } from "../services/commonUtilities"
import { DeviceComponent } from "./deviceComponent"
import { LeftSegments } from "./leftSegments"
import { PipeComponent } from "./pipeComponent"
import { CorrectPlumbing } from "./correctPlumbing"
import { RightSegments } from "./rightSegments"

interface Props {
    completions: Array<SchematicCompletion>
    viewDiameterWell: number
    key: string
}

export const CompletionFactory: React.FC<Props> = (props) => {

    return <g key="completion_factory_group">
        {
            props.completions
                .filter(completion => {
                    //return completion.layers == undefined || completion.layers.length == 0 ||
                    return completion.layers != undefined && !completion.layers.some(layer => { return layer.completionName == CompletionType.MISSED_COMPLETION_HTML })
                })
                .map((completion, index, self) => {
                    var nextCompletion: SchematicCompletion = null
                    if (index + 1 < self.length) {
                        nextCompletion = self[index + 1]              
                    }
                    return <g key={"completion_group_" + completion.key}>
                        <DeviceComponent completion={completion} key={makeid("deviceComponent")} />
                        <PipeComponent completion={completion} viewDiameterWell={props.viewDiameterWell} key={makeid("pipeComponent")} />
                        <RightSegments completion={completion} viewDiameterWell={props.viewDiameterWell} key={makeid("rightSegments")} />
                        <LeftSegments completion={completion} viewDiameterWell={props.viewDiameterWell} key={makeid("leftSegments")} />
                        <CorrectPlumbing completion={completion} nextCompletion={nextCompletion} viewDiameterWell={props.viewDiameterWell} key={makeid("rightPlumbing")} />
                    </g>
            })
        }
        </g>
}