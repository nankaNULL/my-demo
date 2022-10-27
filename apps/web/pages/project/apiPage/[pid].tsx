import React from "react"
import { Button } from "antd";
import { withRouter } from "next/router";

// 首先执行。 返回路径以使用数组进行预构建。
export async function getStaticPaths() {
    // zeit获取30个由API管理的存储库
    // const res = await fetch('https://api.github.com/orgs/zeit/repos')
    // let repos = await res.json();
    // 存储库名称的路径
    console.log('2', 'before load');
    const repos = [
        { name: 'admin1' },
        { name: 'admin' }
    ]
    const paths = repos.map((repo: any) => `/project/apiPage/${repo?.name || ''}`);
    return { paths, fallback: false }
}

// 接收带有路由信息的参数
export async function getStaticProps(props: any) {
    // 对应于文件名zeit/[name].js
    const { params } = props;
    console.log('3', 'load', props);
    const pid = params.pid;
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    const stars = json.stargazers_count;
    const build_time = new Date().toString();
    return {
        props: {
            pid,
            staticStars: stars || 0,
            build_time
        }
    }
}

class ApiTypePage extends React.PureComponent<any, any> {
    render() {
        console.log('1', 'render');
        const { requestTime, stars, build_time, staticStars, router } = this.props || {};
        return (
            <div>
                <h1>API Page, {router.query.pid}</h1>
                <p>ビルド時（{requestTime}）のNextのstar数は: {stars}</p>
                <div>ビルド時（{build_time}）のNextのstar数は: {staticStars}</div>
                <Button onClick={() => router.reload()}>Page Reload</Button>
            </div>
        )
    }
}
export default withRouter(ApiTypePage);