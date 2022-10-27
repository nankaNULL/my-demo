const express = require('express')
const next = require('next')
const server = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000 // 设置监听端口
const dev = process.env.NODE_ENV !== 'production' // 判断当前开发环境
const app = next({ dev })
const handle = app.getRequestHandler();
const isMobile = (req) => {
    const deviceAgent = req.headers["user-agent"];
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(deviceAgent)
};

app.prepare()
    .then(() => {
        server.use('/stream/*', createProxyMiddleware({
            target: 'http://dev.insight.dtstackv51.cn',
            changeOrigin: true
        }));

        server.get('/api/express', (req, res) => {
            res.status(200).send({
                code: 1,
                data: 'hello api ' + req.query.id
            })
        });

        server.get('/city/:city/about', (req, res) => {
            const actualPage = isMobile(req) ? '/city/mobile' : '/city/about';
            const queryParams = { city: req.params.city };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        })


        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })