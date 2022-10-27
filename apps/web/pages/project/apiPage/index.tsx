import React from "react"
import { Button } from "antd";
import { withRouter } from "next/router";

// export async function getServerSideProps() {
//     console.log('3', 'load');
//     const res = await fetch('https://api.github.com/repos/zeit/next.js')
//     const json = await res.json()
//     const stars = json.stargazers_count
//     const build_time = new Date().toString();

//     return {
//         props: {
//             staticStars: stars,
//             build_time
//         },
//     }
// }

class ApiPage extends React.PureComponent<any, any> {
    static async getInitialProps() {
        console.log('3', 'load');
        const res = await fetch('https://api.github.com/repos/vercel/next.js')
        const json = await res.json();
        return {
            stars: json.stargazers_count,
            requestTime: new Date().toString()
        }
    }

    handleClick = () => {
        fetch('http://dev.insight.dtstackv51.cn/stream/public/config/config.js')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    render() {
        const { requestTime, stars, build_time, staticStars, router } = this.props;
        return (
            <div>
                <h1>API Page</h1>
                <p>ビルド時（{requestTime}）のNextのstar数は: {stars}</p>
                <div>ビルド時（{build_time}）のNextのstar数は: {staticStars}</div>
                <Button onClick={this.handleClick}>GET API</Button>
                <Button onClick={() => router.reload()}>Page Reload</Button>
            </div>

        )
    }
}
export default withRouter(ApiPage);