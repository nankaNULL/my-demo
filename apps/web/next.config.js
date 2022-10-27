const path = require('path');
const withPlugins = require('next-compose-plugins');
const nextWithLess = require('next-with-less');

// const withTM = require("next-transpile-modules")(["antd"]);

const plugins = [
    [
        nextWithLess,
        {
            // 配置 less变量, 可以看到页面中的按钮都变成了红色
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': 'red',
                    },
                },
            },
            javascriptEnabled: true,
        },
    ],
    // [withTM],
];
module.exports = withPlugins([...plugins]);