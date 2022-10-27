import { NextApiRequest, NextApiResponse } from "next";

export default function getUserInfo(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    if (method === 'GET') {
        res.status(200).send({
            code: 1,
            data: {
                name: 'John Doe'
            }
        })
        // 重定向
        // res.redirect(307, '/api/user/1');
    } else {
        res.status(400).json({
            error: 'bad method',
            status: 400
        });
    }
}