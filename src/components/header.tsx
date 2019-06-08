import * as React from "react"
import { Link } from "gatsby"
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

const Righter = styled.div`
    display: flex;
    position: absolute;
    right:32px;
    top:24px;
`

const StyledLink = styled(Link)`
    color: white;
    display: block;
    margin: 0 12px;
    transition: 0.5s color;
    &:hover {
        color: #ccc;
    }
`

export default () => {
    return <Header>
        <Title>TransTex.</Title>
        <Righter>
            <StyledLink to="/">trans</StyledLink>
            <StyledLink to="/minutes">minutes</StyledLink>
        </Righter>
    </Header>
}