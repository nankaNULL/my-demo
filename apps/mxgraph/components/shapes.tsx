import React from "react";
import { mxGraph, mxGraphExportObject } from "mxgraph";
import { chunk } from "lodash";

interface IProps {
    Mx: mxGraphExportObject;
}
export default class ShapesGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    initGraph = () => {
        const {
            mxGraph,
            mxRubberband,
            mxConstants
        } = this.props.Mx;
        // 在给定容器中创建图形
        const graph = new mxGraph(this.graphContainer);

        this.graph = graph;

        // 启用选框
        new mxRubberband(graph);

        const shapeList = [
            mxConstants.SHAPE_ACTOR, mxConstants.SHAPE_CLOUD, mxConstants.SHAPE_CYLINDER, mxConstants.SHAPE_DOUBLE_ELLIPSE,
            mxConstants.SHAPE_ELLIPSE, mxConstants.SHAPE_HEXAGON, mxConstants.SHAPE_IMAGE, mxConstants.SHAPE_LABEL,
            mxConstants.SHAPE_LINE, mxConstants.SHAPE_RECTANGLE, mxConstants.SHAPE_RHOMBUS, mxConstants.SHAPE_SWIMLANE, mxConstants.SHAPE_TRIANGLE
        ]
        
        const parent = graph.getDefaultParent();

        // 在一个步骤中将单元格添加到模型
        graph.getModel().beginUpdate();
        try {
            chunk(shapeList, 5).forEach((list: any[], row: number) => {
                list.forEach((shape: string, column: number) => {
                    const image = shape === mxConstants.SHAPE_IMAGE
                        ? `image=https://jgraph.github.io/mxgraph/docs/images/mxgraph_logo.gif;`
                        : '';
                    graph.insertVertex(parent, shape, shape, 120 * column, 120 * row, 80, 80, `shape=${shape};${image}`);
                })
            });

            graph.insertVertex(parent, 'default', 'default', 800, 300, 80, 80);
        }
        finally {
            // 更新显示
            graph.getModel().endUpdate();
        }
        console.log(graph.view.getStates());
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