import { NextApiRequest } from "next";

const isMobile = (req: NextApiRequest) => {
    const deviceAgent = req.headers["user-agent"];
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(deviceAgent as string)
};

export {
    isMobile
}