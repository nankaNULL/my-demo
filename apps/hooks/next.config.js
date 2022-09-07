const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
    reactStrictMode: true,
    images: {
        domains: ['images.pexels.com', 'dev.insight.dtstackv51.cn'],
    },
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/api/:path*',
                    destination: `http://dev.insight.dtstackv51.cn/api/:path*`,
                },
            ],
        }
    },
});