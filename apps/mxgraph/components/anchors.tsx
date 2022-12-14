import React from "react";
import { mxGraph, mxGraphExportObject } from "mxgraph";

interface IProps {
    Mx: mxGraphExportObject;
}
export default class AnchorsGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    initGraph = () => {
        const {
            mxGraph,
            mxRubberband,
            mxCellState,
            mxConnectionConstraint,
            mxPoint,
            mxShape,
            mxPolyline,
        } = this.props.Mx;

        // 在给定容器中创建图形
        const graph = new mxGraph(this.graphContainer);
        this.graph = graph;

        graph.setConnectable(true);

        // Enables rubberband selection
        new mxRubberband(graph);

        // Specifies the default edge style
        graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';


        // Defines the default constraints for all shapes
        mxShape.prototype.constraints = [
            new mxConnectionConstraint(new mxPoint(0.25, 0), true),
            new mxConnectionConstraint(new mxPoint(0.5, 0), true),
            new mxConnectionConstraint(new mxPoint(0.75, 0), true),
            new mxConnectionConstraint(new mxPoint(0, 0.25), true),
            new mxConnectionConstraint(new mxPoint(0, 0.5), true),
            new mxConnectionConstraint(new mxPoint(0, 0.75), true),
            new mxConnectionConstraint(new mxPoint(1, 0.25), true),
            new mxConnectionConstraint(new mxPoint(1, 0.5), true),
            new mxConnectionConstraint(new mxPoint(1, 0.75), true),
            new mxConnectionConstraint(new mxPoint(0.25, 1), true),
            new mxConnectionConstraint(new mxPoint(0.5, 1), true),
            new mxConnectionConstraint(new mxPoint(0.75, 1), true)
        ];


        // Overridden to define per-shape connection points
        mxGraph.prototype.getAllConnectionConstraints = function (terminal, source) {
            if (terminal != null && terminal.shape != null) {
                if (terminal.shape.stencil != null) {
                    if (terminal.shape.stencil.constraints != null) {
                        return terminal.shape.stencil.constraints;
                    }
                }
                else if (terminal.shape.constraints != null) {
                    return terminal.shape.constraints;
                }
            }

            return null;
        };


        // Edges have no connection points
        mxPolyline.prototype.constraints = null;

        // Enables connect preview for the default edge style
        graph.connectionHandler.createEdgeState = function (me) {
            var edge = graph.createEdge(null, null, null, null, null);
            return new mxCellState(graph.view, edge, graph.getCellStyle(edge));
        };


        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
            var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
            var e1 = graph.insertEdge(parent, null, '', v1, v2);
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
            ></div>
        )
    }
}