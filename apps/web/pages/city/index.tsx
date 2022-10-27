import React from 'react';
import Head from 'next/head';

export default class CityIndex extends React.PureComponent<any, any> {
    render(): React.ReactNode {
        console.log('city props', this.props);
        return (
            <div>
                <Head>
                    <title>city page</title>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="keywords" content="Next.js | React.js" />
                    <meta name="description" content="这是一个跟next.js服务端相关的页面" />
                </Head>
                <h1>City Index</h1>
            </div>
        )
    }
}