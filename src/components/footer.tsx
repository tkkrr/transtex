import * as React from "react"
import styled from "styled-components"
import {footer_size} from "./variables"

const Footer = styled.footer`
    width: 100vw;
    height: ${footer_size}px;
    background-color: #333;
    color: white;
    font-size: 12px;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default () => {
    return <Footer>
        <p>Created by Tucker.</p>
        <p>Last Modified 2021 August.</p>
    </Footer>
}