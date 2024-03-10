import { ZoomProps } from "../svg/zoomProps"
import { AbstractResolver, ObservablePanZoomType, ObservableScheduleType, ObservableViewDiameterWellType } from "./abstractResolver"
import { Observable } from "./observer"
import { PressureSensor, ScheduleParameters, SchematicCompletion, SchematicSimulationResults, UnitVariant } from "./schematicProps"
import { SchematicLateral, WellSchematicData } from "./wellSchematicData"

interface WebSocketProtocolRequest {
    command: string
    requestData: any
}

interface WebSocketProtocolResponse {
    command: string
    responseData: any
} 

export class WebsocketResolver implements AbstractResolver {
    private webSocket: WebSocket
    private initiated: boolean = false

    public static readonly WS_PORT: number = 8765

    private readonly WELL_SCHEMATIC_DATA = "WELL_SCHEMATIC_DATA"
    private readonly UPDATE_TITLE_LATERAL = "UPDATE_TITLE_LATERAL"
    private readonly UPDATE_SCHEDULE = "UPDATE_SCHEDULE"
    private readonly UPDATE_PAN_ZOOM = "UPDATE_PAN_ZOOM"
    private readonly UPDATE_VIEW_DIAMETER_WELL = "UPDATE_VIEW_DIAMETER_WELL"
    private readonly GET_FIRST_LATERAL = "GET_FIRST_LATERAL"
    private readonly GET_UNITS = "GET_UNITS"

    constructor() {
        this.webSocket = new WebSocket('ws://127.0.0.1:' + WebsocketResolver.WS_PORT)
        this.webSocket.onopen = (_) => {
            this.initiated = true
        }
        this.webSocket.onmessage = (event) => {
            const socketData: WebSocketProtocolResponse = JSON.parse(event.data)
            switch (socketData.command) {
                case this.GET_FIRST_LATERAL:
                    this.observableLateral.notify(JSON.parse(socketData.responseData))
                    break
                case this.UPDATE_TITLE_LATERAL:
                    this.observableLateral.notify(JSON.parse(socketData.responseData))
                    break
                case this.UPDATE_SCHEDULE:
                    this.observableSchedule.notify(JSON.parse(socketData.responseData))
                    break
                case this.UPDATE_PAN_ZOOM:
                    this.observablePanZoom.notify(JSON.parse(socketData.responseData))
                    break
                case this.UPDATE_VIEW_DIAMETER_WELL:
                    this.observableViewDiameterWell.notify(JSON.parse(socketData.responseData))
                    break
				case this.GET_UNITS:
					this.observableUnits.notify(JSON.parse(socketData.responseData))
                    break
           }
        }
        this.webSocket.onerror = (_) => {
            this.initiated = false
        }
    }

    public isInitiated(): boolean {
        return this.initiated
    }

    public getFirstLateral(): void {
        if (this.webSocket != null && this.initiated) {
            var request: WebSocketProtocolRequest = {
                command: this.GET_FIRST_LATERAL,
                requestData: {}
            }
            this.webSocket.send(JSON.stringify(request))
        }
    }

    public getUnits(): void {
        if (this.webSocket != null && this.initiated) {
            var request: WebSocketProtocolRequest = {
                command: this.GET_UNITS,
                requestData: {}
            }
            this.webSocket.send(JSON.stringify(request))
        }
    }

    public onUpdateTitleLateral(titleLateral: string) {
        if (this.webSocket != null && this.initiated) {
            var request: WebSocketProtocolRequest = {
                command: this.UPDATE_TITLE_LATERAL,
                requestData: { titleLateral: titleLateral, width: window.innerWidth, height: window.innerHeight }
            }
            this.webSocket.send(JSON.stringify(request))
        }
    }
    public observableLateral: Observable<WellSchematicData> = new Observable<WellSchematicData>()

    public onUpdateSchedule(scheduleParameters: ScheduleParameters) {
        if (this.webSocket != null && this.initiated) {
            var request: WebSocketProtocolRequest = { command: this.UPDATE_SCHEDULE, requestData: scheduleParameters }
            this.webSocket.send(JSON.stringify(request))
        }
    }
    public observableSchedule: Observable<ObservableScheduleType> = new Observable <ObservableScheduleType>()

    public onUpdatePanZoom(zoomProps: ZoomProps) {
        if (this.webSocket != null && this.initiated) {
            var request: WebSocketProtocolRequest = { command: this.UPDATE_PAN_ZOOM, requestData: zoomProps }
            this.webSocket.send(JSON.stringify(request))
        }
    }
    public observablePanZoom: Observable<ObservablePanZoomType> = new Observable<ObservablePanZoomType>()

    public observableUnits: Observable<Map<string, UnitVariant>> = new Observable<Map<string, UnitVariant>>()

    public onUpdateViewDiameterWell(viewDiameterWell: number) {
        if (this.webSocket != null && this.initiated) {
            var request: WebSocketProtocolRequest = { command: this.UPDATE_VIEW_DIAMETER_WELL, requestData: viewDiameterWell }
            this.webSocket.send(JSON.stringify(request))
        }
    }

    public observableViewDiameterWell: Observable<ObservableViewDiameterWellType> = new Observable<ObservableViewDiameterWellType>()

}

