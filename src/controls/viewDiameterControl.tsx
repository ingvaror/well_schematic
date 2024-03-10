import * as React from "react"
import { GlobalObserver } from "../resolver/globalObserver"
import { ResolverFactory } from "../resolver/resolverFactory"
import { NETOOL_WELLSCHEMATIC_DEVIATION } from "../resolver/schematicProps"
import { CONTROL_LEFT_MARGIN, CONTROL_WIDTH, DIV_LEFT_MARGIN } from "./controlPanel"
const throttle = require('lodash.throttle')

interface Props {
    key: string
    viewDiameterWell: number
    modeView: string
    top: number
}

export const ViewDiameterControl: React.FC<Props> = (props) => {

    const onUpdateViewDiameterWell = React.useCallback(throttle(viewDiameterWell => {
        ResolverFactory.getResolver().onUpdateViewDiameterWell(viewDiameterWell)
    }, 1000, {}, { 'leading': false, 'trailing': true }), [])

    const VIEWABLE_BASE = 1.2
    const WIDTH_BUTTON = 5
    const MARGIN_BUTTON = 1

    const getBaseLog = (x, y) => {
        return Math.log(y) / Math.log(x)
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

        const viewDiameterWell = Math.pow(VIEWABLE_BASE, Number.parseFloat(event.currentTarget.value))
        onUpdateViewDiameterWell(viewDiameterWell)
    }

    const initializeValue = (): number => {
        return getBaseLog(VIEWABLE_BASE, props.viewDiameterWell)
    }

    const getButtons = (): React.ReactNode => {
        if (props.modeView == NETOOL_WELLSCHEMATIC_DEVIATION)
            return <>
                <button style={{ position: 'fixed', top: props.top.toString() + '%', left: (8 * 2 + MARGIN_BUTTON).toString() + '%', width: WIDTH_BUTTON + '%' }} onClick={(_) => GlobalObserver.getInstance().observableZoomIn.notify()}>Zoom&nbsp;in</button>
                <button style={{ position: 'fixed', top: props.top.toString() + '%', left: (8 * 2 + WIDTH_BUTTON + 2 * MARGIN_BUTTON).toString() + '%', width: WIDTH_BUTTON + '%' }} onClick={(_) => GlobalObserver.getInstance().observableZoomOut.notify()}>Zoom&nbsp;out</button>
                <button style={{ position: 'fixed', top: props.top.toString() + '%', left: (8 * 2 + 2 * WIDTH_BUTTON + 3 * MARGIN_BUTTON).toString() + '%', width: WIDTH_BUTTON + '%' }} onClick={(_) => GlobalObserver.getInstance().observableZoomReset.notify()}>Reset</button>
            </>
        else
            return null
    }

    return <div style={{ position: 'fixed', top: props.top.toString() + '%', left: DIV_LEFT_MARGIN, height: '3%', display: 'flex', justifyContent: 'space-between' }}>
        <label style={{ position: 'fixed', top: (props.top + 0.2).toString() + '%', left: DIV_LEFT_MARGIN, width: '50%', fontFamily: 'sans-serif', fontSize: '12px' }}>Well diameter zoom</label>
        <input type="range" min={-5} max={30} style={{ position: 'fixed', top: props.top.toString() + '%', left: CONTROL_LEFT_MARGIN, width: CONTROL_WIDTH }} onInput={handleChange} defaultValue={initializeValue()} />
        {getButtons()}
    </div>
}
