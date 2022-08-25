import React from "react";
import type { mxAbstractCanvas2D, mxCell, mxGraph, mxGraphExportObject, StyleMap } from "mxgraph";
import { Button } from "antd";
// import { CustomShape } from "./customShape";

interface IProps {
    Mx: mxGraphExportObject;
}
export default class StyleSheetGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    initGraph = () => {
        const {
            mxGraph,
            mxConstants,
            mxPerimeter,
            mxEdgeStyle
        } = this.props.Mx;
        // 在给定容器中创建图形
        const graph = new mxGraph(this.graphContainer);

        this.graph = graph;

        // Disables basic selection and cell handling
        graph.setEnabled(false);

        // Returns a special label for edges. Note: This does
        // a supercall to use the default implementation.
        graph.getLabel = function (cell) {
            var label = mxGraph.prototype.getLabel.apply(graph, [cell]);

            if (graph.getModel().isEdge(cell)) {
                return 'Transfer ' + label;
            }
            else {
                return label;
            }
        };

        // Installs a custom global tooltip
        graph.setTooltips(true);
        graph.getTooltip = function (state) {
            var cell = state.cell;
            var model = graph.getModel();

            if (model.isEdge(cell)) {
                var source = graph.getLabel(model.getTerminal(cell, true));
                var target = graph.getLabel(model.getTerminal(cell, false));

                return source + ' -> ' + target;
            }
            else {
                return graph.getLabel(cell);
            }
        };

        // Creates the default style for vertices
        var style: StyleMap = [];
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_STROKECOLOR] = 'gray';
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_FILLCOLOR] = '#EEEEEE';
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        style[mxConstants.STYLE_FONTCOLOR] = '#774400';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_FONTSTYLE] = 1;
        graph.getStylesheet().putDefaultVertexStyle(style);

        // Creates the default style for edges
        style = [];
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
        style[mxConstants.STYLE_STROKECOLOR] = '#6482B9';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
        style[mxConstants.STYLE_FONTSIZE] = '10';
        graph.getStylesheet().putDefaultEdgeStyle(style);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, 'vertex1', 'Interval 1', 20, 20, 180, 30);
            var v2 = graph.insertVertex(parent, null, 'Interval 2', 140, 80, 280, 30);
            var v3 = graph.insertVertex(parent, null, 'Interval 3', 200, 140, 360, 30);
            var v4 = graph.insertVertex(parent, null, 'Interval 4', 480, 200, 120, 30);
            var v5 = graph.insertVertex(parent, null, 'Interval 5', 60, 260, 400, 30);
            var e1 = graph.insertEdge(parent, null, '1', v1, v2);
            e1.getGeometry().points = [{ x: 160, y: 60 }];
            var e2 = graph.insertEdge(parent, null, '2', v1, v5);
            e2.getGeometry().points = [{ x: 80, y: 60 }];
            var e3 = graph.insertEdge(parent, null, '3', v2, v3);
            e3.getGeometry().points = [{ x: 280, y: 120 }];
            var e4 = graph.insertEdge(parent, null, '4', v3, v4);
            e4.getGeometry().points = [{ x: 500, y: 180 }];
            var e5 = graph.insertEdge(parent, null, '5', v3, v5);
            e5.getGeometry().points = [{ x: 380, y: 180 }];
        }
        finally {
            // Updates the display
            graph.getModel().endUpdate();
        }
        this.setRoundStyle();
        this.setCustomShape();
    }

    setRoundStyle = () => {
        const {
            mxConstants
        } = this.props.Mx;
        const model = this.graph.model;
        let style: StyleMap = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
        style[mxConstants.STYLE_FILLCOLOR] = '#f8cecc';
        style[mxConstants.STYLE_STROKECOLOR] = '#b85450';
        this.graph.getStylesheet().putCellStyle('cloud', style);
        model.setStyle(model.getCell('vertex1'), 'cloud');
    }

    registerCustomShape = () => {
        const { mxShape, mxCellRenderer } = this.props.Mx;

        function CustomShape() { }

        CustomShape.prototype = new mxShape();
        CustomShape.prototype.constructor = CustomShape;
        CustomShape.prototype.paintVertexShape = (c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number) => {
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
        mxCellRenderer.registerShape('customShape', CustomShape);
    }

    // 实现基于XML节点作为描述的通用形状。
    registerXmlCustomShape = () => {
        const { mxStencilRegistry, mxStencil } = this.props.Mx;
        const shapes = `<shapes>
            <shape name="or" aspect="variable">
                <background>
                    <path>
                        <move x="0" y="0" />
                        <quad x1="100" y1="0" x2="100" y2="50" />
                        <quad x1="100" y1="100" x2="0" y2="100" />
                        <close/>
                    </path>
                </background>
                <foreground>
                    <fillstroke/>
                </foreground>
            </shape>
        </shapes>`;
        // 将字符串的xml值解析为dom对象
        const parser = new DOMParser();
        const node = parser.parseFromString(shapes, 'text/xml');
        // 注册画笔
        mxStencilRegistry.addStencil('xmlShape', new mxStencil(node.firstChild));
    }

    setCustomShape = () => {
        this.registerCustomShape();
        this.registerXmlCustomShape();

        this.graph.getModel().beginUpdate();
        try {
            const parent = this.graph.getDefaultParent();
            this.graph.insertVertex(parent, null, 'customShape', 700, 200, 50, 100, 'shape=customShape')
            this.graph.insertVertex(parent, null, 'xmlShape', 900, 200, 50, 100, 'shape=xmlShape')
        }
        finally {
            this.graph.getModel().endUpdate();
        }
    }

    render(): React.ReactNode {
        return (
            <div
                id="graphContainer"
                ref={(e: any) => { this.graphContainer = e; }}
            ></div>
        )
    }
}