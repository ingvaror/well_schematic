import * as React from "react"
import { ControlPanel } from "../controls/controlPanel"
import { ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { GlobalObserver } from "../resolver/globalObserver"
import { JavaResolver } from "../resolver/javaResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { NETOOL_WELLSCHEMATIC_VERTICAL } from "../resolver/schematicProps"
import { WebsocketResolver } from "../resolver/websocketResolver"
import { SchematicLateral, WellSchematicData } from "../resolver/wellSchematicData"
import { PanelSVG } from "../svg/panelSVG"
import { ZoomProps } from "../svg/zoomProps"

interface Props {
	wellSchematicData: WellSchematicData
	currentLateral: SchematicLateral
	widthLeftPanel: number
}

const onScrollTable: Listener<number> = { update: (_: number) => void {} }

export const DivSVG: React.FC<Props> = (props) => {

	React.useEffect(() => {
		GlobalObserver.getInstance().observableScrollingTable.attach(onScrollTable)
		onScrollTable.update = (procentage: number) => {
			if (procentage == 100) {
				divSVGRef.current.scrollTop = divSVGRef.current.scrollHeight - divSVGRef.current.offsetHeight
			} else {
				divSVGRef.current.scrollTop = procentage * divSVGRef.current.scrollHeight
			}
		}

		if (props.wellSchematicData != null && props.wellSchematicData.viewOptions != null &&
			props.wellSchematicData.viewOptions.modeView == NETOOL_WELLSCHEMATIC_VERTICAL &&
			(ResolverFactory.getResolver() instanceof JavaResolver || ResolverFactory.getResolver() instanceof WebsocketResolver)) {
			if (divSVGRef.current != null)
				divSVGRef.current.scrollTop = 0
		}
	})

	const divSVGRef = React.useRef<HTMLDivElement>(null)

	const getSVGHeight = (): number => {
		if (props.wellSchematicData != null && props.wellSchematicData.viewOptions.modeView != NETOOL_WELLSCHEMATIC_VERTICAL)
			return 84
		// View control panel for 2D modes
		else
			return 100
	}

	const onScrollSVG = (_: React.UIEvent<HTMLDivElement, UIEvent>) => {
		if (props.wellSchematicData.viewOptions.modeView == NETOOL_WELLSCHEMATIC_VERTICAL &&
			(ResolverFactory.getResolver() instanceof JavaResolver || ResolverFactory.getResolver() instanceof WebsocketResolver)) {
			const zoomProps: ZoomProps = {
				leftUpCornerX: -window.innerWidth,
				leftUpCornerY: divSVGRef.current.scrollTop,
				rightDownCornerX: window.innerWidth,
				rightDownCornerY: divSVGRef.current.scrollTop + divSVGRef.current.clientHeight,
				realZoom: 1.0
			}
			ResolverFactory.getResolver().onUpdatePanZoom(zoomProps)
		} else {
			if (!GlobalObserver.getInstance().isScrolling()) {
				if (props.wellSchematicData.viewOptions.modeView == NETOOL_WELLSCHEMATIC_VERTICAL) {
					GlobalObserver.getInstance().setScrolling(true)
					const procentage = divSVGRef.current.scrollTop / divSVGRef.current.scrollHeight
					GlobalObserver.getInstance().observableScrollingSVG.notify(procentage)
				}
			} else
				GlobalObserver.getInstance().setScrolling(false)
		}
	}

	return <div ref={divSVGRef} style={{ position: 'fixed', top: '2%', left: '2%', width: props.widthLeftPanel + '%', height: '96%', overflow: 'auto' }} onScroll={onScrollSVG}>
		<ControlPanel
			laterals={props.wellSchematicData.laterals}
			simulationResults={props.currentLateral.simulationResults}
			units={props.wellSchematicData.units}
			height={(100 - getSVGHeight()) + '%'}
			availableColorized={props.wellSchematicData.availableColorized}
			rangessimulationresults={props.wellSchematicData.rangessimulationresults}
			currentschedule={props.wellSchematicData.currentschedule}
			viewOptions={props.wellSchematicData.viewOptions}
			viewDiameterWell={props.currentLateral.wellTrajectory.viewDiameterWell}
			key="ControlPanel"
		/>
		<PanelSVG wellSchematicData={props.wellSchematicData} currentLateral={props.currentLateral} widthLeftPanel={props.widthLeftPanel} plotHeight={getSVGHeight()} />
	</div>
}