import React from 'react';
import { Button } from 'antd';
import { withRouter } from "next/router";

class CityMobile extends React.PureComponent<any, any> {
    render(): React.ReactNode {
        const { router } = this.props;
        return (
            <>
                <h1>Mobile Page</h1>
                <Button onClick={() => router.reload()}>Page Reload</Button>
            </>
        )
    }
}
export default withRouter(CityMobile);