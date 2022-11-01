import React from 'react'
import Layout, { Content } from 'antd/lib/layout/layout';
import Header from '../header';

const LayoutPage = (props: any) => {
    return (
        <Layout>
            <Header />
            <Content style={{ padding: 20 }}>
                {props.children}
            </Content>
        </Layout>
    )
}

export default LayoutPage;