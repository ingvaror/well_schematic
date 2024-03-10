import * as React from "react"
import { ResolverFactory } from "../resolver/resolverFactory"
import { SchematicLateral } from "../resolver/wellSchematicData"
import { CONTROL_LEFT_MARGIN, CONTROL_WIDTH, DIV_LEFT_MARGIN } from "./controlPanel"

interface Props {
    laterals: Array<SchematicLateral>
    top: number
	key: string
}

export const LateralControl: React.FC<Props> = (props) => {

    const [titleLateral, setTitleLateral] = React.useState(props.laterals[0].title)

    const handleChange = (event) => {
        setTitleLateral(event.target.value)
        ResolverFactory.getResolver().onUpdateTitleLateral(event.target.value)
    }

    return <div style={{ position: 'fixed', top: props.top.toString() + '%', left: DIV_LEFT_MARGIN }}>
        <label style={{ position: 'fixed', top: (props.top + 0.2).toString() + '%', left: DIV_LEFT_MARGIN, width: '50%', fontFamily: 'sans-serif', fontSize: '12px' }}>Wellbore</label>
        <select style={{ position: 'fixed', top: props.top.toString() + '%', left: CONTROL_LEFT_MARGIN, width: CONTROL_WIDTH, fontFamily: 'sans-serif', fontSize: '12px' }} onChange={handleChange} value={titleLateral}>
            {props.laterals.map((lateral) => {
                return <option key={lateral.title} value={lateral.title}>{lateral.title}</option>
            })}
        </select>
    </div>
}