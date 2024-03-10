import * as React from "react"

import { WellSchematicData } from "./resolver/wellSchematicData"
import { NETOOL_WELLSCHEMATIC_VERTICAL, UnitVariant, } from "./resolver/schematicProps"

import { ResolverFactory } from "./resolver/resolverFactory"
import { JavaResolver } from "./resolver/javaResolver"
import { Listener } from "./resolver/observer"
import { ObservablePanZoomType, ObservableScheduleType, ObservableViewDiameterWellType } from "./resolver/abstractResolver"
import './app.css'
import { GlobalObserver } from "./resolver/globalObserver"
import { DivSVG } from "./div/divSVG"
import { DivTable } from "./div/divTable"
import { WebsocketResolver } from "./resolver/websocketResolver"
import { ZoomProps } from "./svg/zoomProps"

// Global functions for Java Desktop. WEB_Schematic_View.JavaConnectorSchematic executes it.

// Igor does not want units updates right after the document is loaded,
// he wants to delay until the end of React.useEffect();
// It's much easier to do it here than screw all the Java logic;
//
var can_update_units = false;

// Java now checks for presence of this function => long name to make sure
// it won't accidentally find it in foreign html.
//
(window as any).netool_updateUnits = (newUnits: Map<string, UnitVariant>) => 
{
	if (can_update_units)
	{
		if (ResolverFactory.getResolver() instanceof JavaResolver)
			(ResolverFactory.getResolver() as JavaResolver).observableUnits.notify(newUnits);
	}
}

(window as any).updateLateral = (data: WellSchematicData) => {
	if (ResolverFactory.getResolver() instanceof JavaResolver)
		(ResolverFactory.getResolver() as JavaResolver).observableLateral.notify(data)
}

(window as any).updateSchedule = (data: ObservableScheduleType) => {
	if (ResolverFactory.getResolver() instanceof JavaResolver)
		(ResolverFactory.getResolver() as JavaResolver).observableSchedule.notify(data)
}

(window as any).updatePanZoom = (data: ObservablePanZoomType) => {
	if (ResolverFactory.getResolver() instanceof JavaResolver)
		(ResolverFactory.getResolver() as JavaResolver).observablePanZoom.notify(data)
}

(window as any).updateViewDiameterWell = (data: ObservableViewDiameterWellType) => {
	if (ResolverFactory.getResolver() instanceof JavaResolver)
		(ResolverFactory.getResolver() as JavaResolver).observableViewDiameterWell.notify(data)
}

const onSetResolverInit: Listener<boolean> = { update: (_: boolean) => void {} }
const onChangeWellSchematicData: Listener<WellSchematicData> = { update: (_: WellSchematicData) => void {} }
const onChangeSchedule: Listener<ObservableScheduleType> = { update: () => void {} }
const onChangeUnits: Listener<Map<string, UnitVariant>> = { update: () => void {} }
const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: (_: ObservableViewDiameterWellType) => void {} }
const onSetShowTable: Listener<boolean> = { update: (_: boolean) => void {} }

var isUpdatedUnits = false

export const App = () => {

	ResolverFactory.initResolver(ResolverFactory.WEBSOCKET_RESOLVER)

	const [wellSchematicData, setWellSchematicData] = React.useState<WellSchematicData>(null)

	const [resolverInit, setResolverInit] = React.useState<boolean>(false)

	const [showTable, setShowTable] = React.useState<boolean>(GlobalObserver.getInstance().observableShowTable.data)

	const currentLateral = wellSchematicData != null ? wellSchematicData.laterals.find((lateral) => { return lateral.title == wellSchematicData.currentTitleLateral }) : null

	const getWidthLeftPanel = (): number => {
		if (wellSchematicData != null && wellSchematicData.viewOptions.modeView == NETOOL_WELLSCHEMATIC_VERTICAL)
			return 15
		else if (!showTable)
			return 100
		else
			return 50
	}

	/** After init App */

	React.useEffect(() => {
		ResolverFactory.getResolver().observableLateral.attach(onChangeWellSchematicData)
		ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)
		ResolverFactory.getResolver().observableSchedule.attach(onChangeSchedule)
		ResolverFactory.getResolver().observableUnits.attach(onChangeUnits)
		GlobalObserver.getInstance().observableResolverInit.attach(onSetResolverInit)
		GlobalObserver.getInstance().observableShowTable.attach(onSetShowTable)

		onChangeWellSchematicData.update = (newData: WellSchematicData) => {
			if (wellSchematicData != null) {
				newData.units = wellSchematicData.units
			}
			setWellSchematicData(newData)
		}
		onChangeViewDiameterWell.update = (newData: ObservableViewDiameterWellType) => {
			wellSchematicData.laterals
				.filter((lateral) => { return lateral.title == currentLateral.title })
				.forEach((lateral) => {
					lateral.completions = newData.completions
					lateral.pressureSensors = newData.pressureSensors
					lateral.simulationResults = newData.simulationResults
					lateral.wellTrajectory = newData.wellTrajectory
				})
			setWellSchematicData(wellSchematicData)
		}
		onChangeSchedule.update = (newData: ObservableScheduleType) => {
			wellSchematicData.currentschedule = newData.currentschedule
			wellSchematicData.laterals
				.filter((lateral) => { return lateral.title == currentLateral.title })
				.forEach((lateral) => {
					lateral.simulationResults = newData.simulationResults
				})
			setWellSchematicData(wellSchematicData)
		}
		onChangeUnits.update = (newData: Map<string, UnitVariant>) => {
			wellSchematicData.units = newData
			setWellSchematicData({ ...wellSchematicData })
		}

		onSetResolverInit.update = (resolverInit: boolean) => { setResolverInit(resolverInit) }
		onSetShowTable.update = (showTable: boolean) => { setShowTable(showTable) }

		if (wellSchematicData != null && wellSchematicData.viewOptions != null &&
			wellSchematicData.viewOptions.modeView == NETOOL_WELLSCHEMATIC_VERTICAL &&
			(ResolverFactory.getResolver() instanceof JavaResolver || ResolverFactory.getResolver() instanceof WebsocketResolver)) {
			const zoomProps: ZoomProps = {
				leftUpCornerX: -window.innerWidth,
				leftUpCornerY: 0,
				rightDownCornerX: window.innerWidth,
				rightDownCornerY: window.innerHeight,
				realZoom: 1.0
			}
			ResolverFactory.getResolver().onUpdatePanZoom(zoomProps)
		}
		if (resolverInit && wellSchematicData == null) {
			ResolverFactory.getResolver().getFirstLateral()
		}
		
		can_update_units = true;
		
		if (resolverInit && wellSchematicData != null && !isUpdatedUnits &&
			(ResolverFactory.getResolver() instanceof JavaResolver || ResolverFactory.getResolver() instanceof WebsocketResolver)) {
			// Only for Java UI. If someone changes units while downloading schematic React App
			isUpdatedUnits = true;
			ResolverFactory.getResolver().getUnits()
		}
	})

	if (resolverInit && wellSchematicData != null) {
		if (wellSchematicData.laterals == null || wellSchematicData.laterals.length == 0) {
			return <p className="warningText"><br /><br /><br /><big>Well schematic will be shown after well trajectory and well segments are created.</big></p>
		}
		else {
			if (showTable || wellSchematicData != null && wellSchematicData.viewOptions != null &&
				wellSchematicData.viewOptions.modeView == NETOOL_WELLSCHEMATIC_VERTICAL) {
				return <>
					<DivSVG currentLateral={currentLateral} wellSchematicData={wellSchematicData} widthLeftPanel={getWidthLeftPanel()} />
					<DivTable currentLateral={currentLateral} wellSchematicData={wellSchematicData} widthLeftPanel={getWidthLeftPanel()} />
				</>
			} else {
				return <DivSVG currentLateral={currentLateral} wellSchematicData={wellSchematicData} widthLeftPanel={getWidthLeftPanel()} />
			}
		}
	} else {
		return <p className="warningText"><br /><br /><br /><big>Loading well schematic...</big></p>
	}
}
