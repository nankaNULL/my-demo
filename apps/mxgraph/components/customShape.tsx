import { MxFactory } from "./mxFactory";
// import { mxShape } from "mxgraph";

const Mx = MxFactory.create();
const { mxShape } = Mx;
export class CustomShape extends mxShape {
    constructor() {
        super();
        console.log(mxShape);
    }

    // 图形的渲染方法
    paintBackground(c: any, x: number, y: number, w: number, h: number) {
        c.translate(x, y);

        // Head
        c.ellipse(w / 4, 0, w / 2, h / 4);
        c.fillAndStroke();

        c.begin();
        c.moveTo(w / 2, h / 4);
        c.lineTo(w / 2, (2 * h) / 3);

        // Arms
        c.moveTo(w / 2, h / 3);
        c.lineTo(0, h / 3);
        c.moveTo(w / 2, h / 3);
        c.lineTo(w, h / 3);

        // Legs
        c.moveTo(w / 2, (2 * h) / 3);
        c.lineTo(0, h);
        c.moveTo(w / 2, (2 * h) / 3);
        c.lineTo(w, h);
        c.end();

        c.stroke();
    }
}