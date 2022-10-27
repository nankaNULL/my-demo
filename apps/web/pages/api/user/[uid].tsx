export default function getUserInfo(req: any, res: any) {
    const { url, method, cookies, query, body } = req;
    res.status(200).json({ uid: query.uid, name: 'John Doe' })
}

// web:dev:   status: [Function (anonymous)],
// web:dev:   send: [Function (anonymous)],
// web:dev:   json: [Function (anonymous)],
// web:dev:   redirect: [Function (anonymous)],