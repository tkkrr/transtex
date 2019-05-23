import * as React from 'react'
import styled from "styled-components"

import Footer from './footer'
import Header from './header'
import {footer_size, header_size} from "./variables"

const Main = styled.main`
    height: calc( 100vh - ${footer_size}px - ${header_size}px );
`

const Layout: React.StatelessComponent<{}> = props => {
  
    return <React.Fragment>
        <Header />
        <Main>
            {props.children}
        </Main>
        <Footer />
    </React.Fragment>
}

export default Layout
