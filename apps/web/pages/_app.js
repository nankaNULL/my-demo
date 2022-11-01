import React from 'react'
import { Provider } from 'react-redux';
import withRedux from '../lib/with-redux-app';
import dynamic from 'next/dynamic';
import 'antd/dist/antd.less';

const Layout = dynamic(() => import("../components/layout"));

function MyApp(props) {
    const { Component, pageProps, reduxStore } = props;
    return (
        <Layout>
            <Provider store={reduxStore}>
                <Component {...pageProps} />
            </Provider>
        </Layout>
    )
}

export default withRedux(MyApp);