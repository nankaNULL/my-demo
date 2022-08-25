import React from "react";
import { mxGraph, mxGraphExportObject } from "mxgraph";

interface IProps {
    Mx: mxGraphExportObject;
}
export default class ConnectionGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    initGraph = () => {
        const {
            mxGraph,
            mxRubberband,
            mxCell,
            mxConstraintHandler,
            mxUtils,
            mxEdgeHandler,
            mxCellState,
            mxConnectionConstraint,
            mxConnectionHandler,
            mxPoint
        } = this.props.Mx;

        // 在给定容器中创建图形
        const graph = new mxGraph(this.graphContainer);

        this.graph = graph;
        graph.setConnectable(true);

        // Snaps to fixed points
        mxConstraintHandler.prototype.intersects = function (icon, point, source, existingEdge) {
            return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
        };

        // Special case: Snaps source of new connections to fixed points
        // Without a connect preview in connectionHandler.createEdgeState mouseMove
        // and getSourcePerimeterPoint should be overriden by setting sourceConstraint
        // sourceConstraint to null in mouseMove and updating it and returning the
        // nearest point (cp) in getSourcePerimeterPoint (see below)

        mxConnectionHandler.prototype.updateEdgeState = function (pt, constraint) {
            console.log(constraint);
            if (pt != null && graph.connectionHandler.previous != null) {
                var constraints = graph.getAllConnectionConstraints(graph.connectionHandler.previous);
                var nearestConstraint = null;
                var dist = null;

                for (var i = 0; i < constraints.length; i++) {
                    var cp = graph.getConnectionPoint(graph.connectionHandler.previous, constraints[i]);

                    if (cp != null) {
                        var tmp = (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

                        if (dist == null || tmp < dist) {
                            nearestConstraint = constraints[i];
                            dist = tmp;
                        }
                    }
                }

                if (nearestConstraint != null) {
                    graph.connectionHandler.sourceConstraint = nearestConstraint;
                }
            }


            graph.connectionHandler.updateEdgeState.apply(graph, [pt, constraint]);
        };


        //graph.connectionHandler.connectImage = new mxImage('images/connector.gif', 16, 16);

        // Disables floating connections (only use with no connect image)
        if (graph.connectionHandler.connectImage == null) {
            graph.connectionHandler.isConnectableCell = function (cell) {
                return false;
            };
            mxEdgeHandler.prototype.isConnectableCell = function (cell) {
                return graph.connectionHandler.isConnectableCell(cell);
            };
        }

        graph.getAllConnectionConstraints = function (terminal) {
            if (terminal != null && graph.model.isVertex(terminal.cell)) {
                return [new mxConnectionConstraint(new mxPoint(0, 0), true),
                new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                new mxConnectionConstraint(new mxPoint(1, 0), true),
                new mxConnectionConstraint(new mxPoint(0, 0.5), true),
                new mxConnectionConstraint(new mxPoint(1, 0.5), true),
                new mxConnectionConstraint(new mxPoint(0, 1), true),
                new mxConnectionConstraint(new mxPoint(0.5, 1), true),
                new mxConnectionConstraint(new mxPoint(1, 1), true)];
            }

            return null;
        };

        // Connect preview
        graph.connectionHandler.createEdgeState = function (me) {
            var edge = graph.createEdge(null, null, null, null, null, 'edgeStyle=orthogonalEdgeStyle');

            return new mxCellState(graph.view, edge, graph.getCellStyle(edge));
        };

        // Enables rubberband selection
        new mxRubberband(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 60,
                'shape=triangle;perimeter=trianglePerimeter');
            var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 60,
                'shape=ellipse;perimeter=ellipsePerimeter');
            var v3 = graph.insertVertex(parent, null, 'Hello,', 200, 20, 80, 30);
            var e1 = graph.insertEdge(parent, null, '', v1, v2,
                'edgeStyle=elbowEdgeStyle;elbow=horizontal;' +
                'exitX=0.5;exitY=1;exitPerimeter=1;entryX=0;entryY=0;entryPerimeter=1;');
            var e2 = graph.insertEdge(parent, null, '', v3, v2,
                'edgeStyle=elbowEdgeStyle;elbow=horizontal;orthogonal=0;' +
                'entryX=0;entryY=0;entryPerimeter=1;');
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