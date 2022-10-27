import React from "react"
import { Button } from "antd";
import { withRouter } from "next/router";
import http from "../../../utils/http";

class BackApiPage extends React.PureComponent<any, any> {
    handleClick = () => {
        http.get('http://dev.insight.dtstackv51.cn/stream/public/config/config.js').then((res) => {
            console.log('res', res);
        });
    }
    getApiRoutes = () => {
        http.get('/api/res').then((res) => {
            console.log('api routes res', res);
        });
    }
    getApiRoutesCors = () => {
        http.get('/api/cors').then((res) => {
            console.log('api routes cors res', res);
        });
    }

    getExpressApi = () => {
        http.get('/api/express?id=1').then((res) => {
            alert(JSON.stringify(res));
        })
    }

    getExpressApiCors = () => {
        http.get('/stream/public/config/config.js').then((res) => {
            alert(JSON.stringify(res));
        })
    }
    render() {
        return (
            <div>
                <h1>Back Api Page</h1>
                <section>
                    <h2>API</h2>
                    <Button style={{ marginRight: 20 }} onClick={this.getApiRoutes}>API Routes</Button>
                    <Button style={{ marginRight: 20 }} onClick={this.getApiRoutesCors}>API Routes Cors</Button>
                    <Button style={{ marginRight: 20 }} onClick={this.getExpressApi}>API Express</Button>
                    <Button style={{ marginRight: 20 }} onClick={this.getExpressApiCors}>API Express Cors</Button>
                    <Button style={{ marginRight: 20 }} onClick={this.handleClick}>跨域下接口定义</Button>
                </section>
            </div>

        )
    }
}
export default withRouter(BackApiPage);