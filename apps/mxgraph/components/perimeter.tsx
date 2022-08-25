import React from "react";
import type { mxGraph, mxGraphExportObject, mxPoint, mxRectangle } from "mxgraph";

interface IProps {
    Mx: mxGraphExportObject;
}
export default class PermiterGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    initGraph = () => {
        const {
            mxGraphView,
            mxUtils,
            mxGraph,
            mxRubberband
        } = this.props.Mx;

        // Creates the graph inside the given container
        const graph = new mxGraph(this.graphContainer);
        this.graph = graph;


        // Redirects the perimeter to the label bounds if intersection
        // between edge and label is found
        const mxGraphViewGetPerimeterPoint = mxGraphView.prototype.getPerimeterPoint;
        /**
         * 
         * @param terminal  mxCellState for the source or target terminal. 当前 vertex 的 cellstate
         * @param next mxPoint that lies outside of the given terminal. 当前边的下一个计算节点（可能是边开头，也可能是尾）
         * @param orthogonal 
         * @param border 
         * @returns 
         */
        graph.view.getPerimeterPoint = function (terminal, next, orthogonal, border) {
            // var point = mxGraphViewGetPerimeterPoint.apply(this, arguments);
            // 当前边的顶点
            let point: mxPoint = mxGraphView.prototype.getPerimeterPoint.apply(graph.view, [terminal, next, orthogonal, border]);

            if (point != null) {
                const perimeter = graph.view.getPerimeterFunction(terminal);

                if (terminal.text != null && terminal.text.boundingBox != null) {
                    // Adds a small border to the label bounds
                    // 当前 vertex 的 label 的图像信息
                    const labelBox: mxRectangle = terminal.text.boundingBox.clone();
                    // 增量
                    labelBox.grow(3)

                    console.log(terminal.cell.getId(), mxUtils.rectangleIntersectsSegment(labelBox, point, next));
                    // mxUtils 方法计算是否有 rectangle 边相交的情况
                    // 有则重新计算顶点位置（空出 label 的位置）
                    if (mxUtils.rectangleIntersectsSegment(labelBox, point, next)) {
                        point = perimeter(labelBox, terminal, next, orthogonal);
                    }
                }
            }

            return point;
        };

        
        graph.setVertexLabelsMovable(true);
        graph.setConnectable(true);

        // Uncomment the following if you want the container
        // to fit the size of the graph
        //graph.setResizeContainer(true);

        // Enables rubberband selection
        new mxRubberband(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, 'vertex1', 'Label', 20, 20, 80, 30, 'verticalLabelPosition=bottom');
            var v2 = graph.insertVertex(parent, 'vertex2', 'Label', 200, 20, 80, 30, 'verticalLabelPosition=bottom');
            var v3 = graph.insertVertex(parent, 'vertex3', 'Label', 20, 150, 80, 30, 'verticalLabelPosition=bottom');
            var e1 = graph.insertEdge(parent, 'edge1', '', v1, v2);
            var e1 = graph.insertEdge(parent, 'edge2', '', v1, v3);
        }
        finally {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }

    render(): React.ReactNode {
        return (
            <div
                id="graphContainer"
                ref={(e: any) => { this.graphContainer = e; }}
                style={{
                    height: '100%'
                }}
            ></div>
        )
    }
}