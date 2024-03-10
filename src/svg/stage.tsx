import * as React from 'react'
import { useEffect, useRef, useState } from "react"

const Context = React.createContext(null)

interface Props {
    top: string
    height: string
    width: string
    key: string
}

export const Stage: React.FC<Props> = (props) => {
    const svgRef = useRef(null)
    const [svg, setSvg] = useState(null)
    useEffect(() => {
        setSvg(svgRef.current)
    }, [])

    return (
        <svg key="svgStage" ref={svgRef} xmlns="http://www.w3.org/2000/svg" style={{ position: 'fixed', top: props.top, left: '0%', width: props.width, height: props.height }}>
            <Context.Provider value={svg}>{props.children}</Context.Provider>
        </svg>
    )
}

export function useSvg() {
    return React.useContext(Context)
}