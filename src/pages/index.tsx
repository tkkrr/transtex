import * as React from "react"

import Layout from "../components/layout"
import MainArea from "../components/transtex"
import SEO from "../components/seo"

import "../reset.scss"


interface indexProps {

}

const Index: React.FunctionComponent<indexProps> = props => {
    return <Layout>
        <MainArea />
    </Layout>
}

export default Index

export const Head = () => {
    return <SEO title="transtex" path="/"/>
}