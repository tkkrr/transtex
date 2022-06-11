import * as React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
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
    // 最終ビルド日をフッターに埋め込む．
    // 最終ビルド日は gatsby-config.js にて設定
    const { site } = useStaticQuery( graphql`query {
        site {
            siteMetadata {
                lastModified
            }
        }
    }`)
    const lastModified = new Date(site.siteMetadata.lastModified)

    return <Footer>
        <p>Created by Tucker.</p>
        <p>Last Modified {lastModified.toLocaleString('en-US', { year: 'numeric', month: 'long' })}.</p>
    </Footer>
}