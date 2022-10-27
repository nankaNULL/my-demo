import React from 'react';
import { Button } from 'antd';
import { withRouter } from "next/router";

class CityAbout extends React.PureComponent<any, any> {
    static async getInitialProps(initialProps: any) {
        const { asPath } = initialProps;
        const match = asPath.match(new RegExp('/city/([^\s]+)/about')) || [];
        return {
            city: match[1]
        }
    }

    render(): React.ReactNode {
        const { router, city } = this.props;
        return (
            <>
                <h1>About {city}</h1>
                <Button onClick={() => router.reload()}>Page Reload</Button>
            </>
        )
    }
}
export default withRouter(CityAbout);