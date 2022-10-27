import React from 'react'
import { Layout } from "antd";
import { Provider } from 'react-redux'
import Header from "../components/header";
import withRedux from '../lib/with-redux-app';
import 'antd/dist/antd.less';

const { Content } = Layout;

function MyApp(props) {
    const { Component, pageProps, reduxStore } = props;
    return (
        <Layout>
            <Header />
            <Content style={{ padding: 20 }}>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Content>
        </Layout>
    )
}

export default withRedux(MyApp)