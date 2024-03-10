import * as React from "react"
import { GlobalObserver } from "../resolver/globalObserver"
import { CONTROL_LEFT_MARGIN, CONTROL_WIDTH, DIV_LEFT_MARGIN } from "./controlPanel"

interface Props {
    top: number
    key: string
}

export const ShowTableControl: React.FC<Props> = (props) => {
    const [showTable, setShowTable] = React.useState<boolean>(GlobalObserver.getInstance().observableShowTable.data)

    const handleChange = (event) => {
        setShowTable(event.target.checked)
        GlobalObserver.getInstance().observableShowTable.notify(event.target.checked)
    }

    return <div style={{ position: 'fixed', top: props.top.toString() + '%', left: DIV_LEFT_MARGIN }}>
        <label style={{ position: 'fixed', top: (props.top + 0.2).toString() + '%', left: DIV_LEFT_MARGIN, width: '50%', fontFamily: 'sans-serif', fontSize: '12px' }}>View table</label>
        <input type={"checkbox"} style={{ position: 'fixed', top: (props.top - 0.5).toString() + '%', left: CONTROL_LEFT_MARGIN, width: CONTROL_WIDTH, fontFamily: 'sans-serif', fontSize: '12px' }} onChange={handleChange} defaultChecked={showTable} />
    </div>
}