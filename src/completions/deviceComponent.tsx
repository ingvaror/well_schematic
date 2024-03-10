import * as React from "react"
import { ICVComponent } from "."
import { CompletionType, SchematicCompletion, SchematicCompletionDevice } from "../resolver/schematicProps"
import { ChokeComponent } from "./devices/choke"
import { ESPComponent } from "./devices/ESP"
import { ICDComponent } from "./devices/ICD"
import { PackerComponent } from "./devices/packer"
import { PCPComponent } from "./devices/PCP"
import { PlugComponent } from "./devices/plug"
import { SRPComponent } from "./devices/SRP"


interface Props {
    completion: SchematicCompletion
    key: string
}

export const DeviceComponent: React.FC<Props> = (props) => {
    const getDeviceTransform = (device: SchematicCompletionDevice): string => {
        return "translate(" + device.x1 + "," + device.y1 + ")"
            + " rotate(" + device.rotate + ")"
            + " scale(" + device.scaleWidth + "," + device.scaleHeight + ")"
    }

    if (props.completion.devices != undefined) {
        return <>
            {
                props.completion.devices
                    .filter((device: SchematicCompletionDevice) => { return device.completionName != CompletionType.JUNCTION_HTML })
                    .map((device: SchematicCompletionDevice, indexDevice: number) => {
                        var deviceComponent: React.ReactNode
                        switch (device.completionName) {
                            case CompletionType.PACKER_HTML:
                                deviceComponent = < PackerComponent key={props.completion.key + "_" + indexDevice} />
                                break
                            case CompletionType.ICD_HTML:
                                deviceComponent = < ICDComponent key={props.completion.key + "_" + indexDevice} />
                                break
                            case CompletionType.ICV_HTML:
                                deviceComponent = < ICVComponent key={props.completion.key + "_" + indexDevice} />
                                break
                            case CompletionType.JUNCTION_HTML:
                                deviceComponent = <></>
                                break
                            case CompletionType.CHOKE_HTML:
                                deviceComponent = < ChokeComponent key={props.completion.key + "_" + indexDevice} />
                                break
                            case CompletionType.PLUG_HTML:
                                deviceComponent = < PlugComponent key={props.completion.key + "_" + indexDevice} />
                                break
                            case CompletionType.PUMP_ESP_HTML:
                                deviceComponent = < ESPComponent key={props.completion.key + "_" + indexDevice} />
                                break
                            case CompletionType.PUMP_PCP_HTML:
                                deviceComponent = < PCPComponent key={props.completion.key + "_" + indexDevice} />
                                break
                            case CompletionType.PUMP_SRP_HTML:
                                deviceComponent = < SRPComponent key={props.completion.key + "_" + indexDevice} />
                                break
                            default:
                                alert("Undefined completion in completionFactory")
                        }
                        if (device.completionName != CompletionType.JUNCTION_HTML && device.scaleHeight != null && device.scaleWidth != null)
                            return <g key={"device_group_" + indexDevice + "_" + props.completion.key} transform={getDeviceTransform(device)} >
                                {deviceComponent}
                            </g>
                        else if (device.completionName != CompletionType.JUNCTION_HTML)
                            return <g key={"device_group_" + indexDevice + "_" + props.completion.key}>
                                {deviceComponent}
                            </g>
                        else
                            return null
                    })
            }</>
    } else
        return null
}