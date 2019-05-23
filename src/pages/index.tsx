import * as React from "react"

import Layout from "../components/layout"
import MainArea from "../components/transtex"

import "../reset.scss"


interface indexProps {

}

const Index: React.FunctionComponent<indexProps> = props => {
    return <Layout>
        <MainArea />
    </Layout>
}

export default Index