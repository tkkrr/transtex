import * as React from "react"
import styled from "styled-components"
import {header_size} from "./variables"

const Header = styled.header`
    width: 100vw;
    height: ${header_size}px;
    background-color: #3366aa;
    color: white;
    display: flex;
    align-items: center;
`

const Title = styled.p`
    padding-left: 24px;
    font-size: 24px;
`

export default () => {
    return <Header>
        <Title>TransTex.</Title>
    </Header>
}