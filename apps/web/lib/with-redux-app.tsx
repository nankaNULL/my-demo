import React from 'react'
import initializeStore from '../store/index'

let store: any;

function initStore(initialState?: any) {
    // 服务端每次执行都重新创建一个store
    if (typeof window === 'undefined') {
        return initializeStore(initialState)
    }
    if (!store) {
        store = initializeStore(initialState);
    }

    return store;
}

const ReduxHoc = (Comp: any) => {
    class withReduxApp extends React.PureComponent<any, any> {
        reduxStore: any
        static getInitialProps: (ctx: any) => Promise<{ initialReduxState: any }>
        constructor(props: any) {
            super(props)
            // getInitialProps创建了store 这里为什么又重新创建一次？
            // 因为服务端执行了getInitialProps之后 返回给客户端的是序列化后的字符串
            // redux里有很多方法 不适合序列化存储
            // 所以选择在getInitialProps返回initialReduxState初始的状态
            // 再在这里通过initialReduxState去创建一个完整的store
            this.reduxStore = initStore(props.initialReduxState)
        }

        render() {
            const { Component, pageProps, ...rest } = this.props;
            return (
                <Comp
                    {...rest}
                    Component={Component}
                    pageProps={pageProps}
                    reduxStore={this.reduxStore}
                />
            )
        }
    }

    // 这个其实是_app.js的getInitialProps
    // 在服务端渲染和客户端路由跳转时会被执行
    // 所以非常适合做redux-store的初始化
    withReduxApp.getInitialProps = async ctx => {
        const reduxStore = initStore()
        ctx.reduxStore = reduxStore

        let compProps = {};
        let componentProps = {};
        if (typeof Comp.getInitialProps === 'function') {
            compProps = await Comp.getInitialProps(ctx)
        }
        if (typeof ctx.Component.getInitialProps === 'function') {
            componentProps = await ctx.Component.getInitialProps(ctx)
        }
        return {
            pageProps: {
                ...compProps,
                ...componentProps
            },
            initialReduxState: reduxStore.getState()
        }
    }

    return withReduxApp
}

export default ReduxHoc;