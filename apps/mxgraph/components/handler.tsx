import React from "react";
import type { mxGraph, mxGraphExportObject, mxCellState } from "mxgraph";
import { collapsedIcon } from "./constant";

interface IProps {
    Mx: mxGraphExportObject;
}
export default class HandlerGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    initGraph = () => {
        const {
            mxGraph,
            mxRubberband,
            mxConstraintHandler,
            mxImage,
            mxShape,
            mxTriangle,
            mxEdgeHandler,
            mxConnectionConstraint,
            mxPoint,
            mxConstants
        } = this.props.Mx;
        // Enables rubberband selection
        const graph = new mxGraph(this.graphContainer);
        new mxRubberband(graph);

        // Replaces the port image
        mxConstraintHandler.prototype.pointImage = new mxImage(collapsedIcon, 10, 10);

        graph.setConnectable(true);
        graph.setPortsEnabled(true);

        // Disables floating connections (only connections via ports allowed)
        graph.connectionHandler.isConnectableCell = function (cell) {
            return false;
        };
        mxEdgeHandler.prototype.isConnectableCell = function (cell) {
            return graph.connectionHandler.isConnectableCell(cell);
        };

        // set ports
        this.setShapePorts();
        this.setTriangle();

        // Disables existing port functionality
        graph.view.getTerminalPort = function (state, terminal, source) {
            return terminal;
        };

        // Returns an array of all mxConnectionConstraints for the given terminal.
        // mxConnectionConstraints 定义一个对象，该对象包含关于如何将一条边的一边连接到其终端的约束。
        // 设置顶点
        graph.getAllConnectionConstraints = function (terminal: mxCellState, source: boolean) {
            if (terminal != null && terminal.shape != null && terminal.shape.stencil != null) {
                // for stencils with existing constraints...
                if (terminal.shape.stencil != null) {
                    return terminal.shape.stencil.constraints;
                }
            }
            else if (terminal != null && graph.model.isVertex(terminal.cell)) {
                if (terminal.shape != null) {
                    var ports = terminal.shape.getPorts();
                    var cstrs = new Array();

                    for (var id in ports) {
                        var port = ports[id];
                        var cstr = new mxConnectionConstraint(new mxPoint(port.x, port.y), port.perimeter);
                        cstr.id = id;
                        cstrs.push(cstr);
                    }

                    return cstrs;
                }
            }

            return null;
        };

        // Sets the port for the given connection
        graph.setConnectionConstraint = function (edge, terminal, source, constraint) {
            if (constraint != null) {
                var key = (source) ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT;
                console.log('key', key);
                if (constraint == null || constraint.id == null) {
                    graph.setCellStyles(key, null, [edge]);
                }
                else if (constraint.id != null) {
                    graph.setCellStyles(key, constraint.id, [edge]);
                }
                console.log(edge);
            }
        };

        // Returns the port for the given connection
        graph.getConnectionConstraint = function (edge, terminal, source) {
            var key = (source) ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT;
            var id = edge.style[key];

            if (id != null) {
                var c = new mxConnectionConstraint(null, null);
                c.id = id;

                return c;
            }

            return null;
        };

        // Returns the actual point for a port by redirecting the constraint to the port
        graph.getConnectionPoint = function (vertex, constraint) {
            if (constraint.id != null && vertex != null && vertex.shape != null) {
                var port = vertex.shape.getPorts()[constraint.id];

                if (port != null) {
                    constraint = new mxConnectionConstraint(new mxPoint(port.x, port.y), port.perimeter);
                }
            }

            return mxGraph.prototype.getConnectionPoint.apply(graph, [vertex, constraint]);
        };

        // Adds cells to the model in a single step
        const parent = graph.getDefaultParent();
        graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, null, 'A', 20, 20, 100, 40);
            var v2 = graph.insertVertex(parent, null, 'B', 80, 100, 100, 100,
                'shape=ellipse;perimeter=ellipsePerimeter');
            var v3 = graph.insertVertex(parent, null, 'C', 190, 30, 100, 60,
                'shape=triangle;perimeter=trianglePerimeter;direction=south');
            var e1 = graph.insertEdge(parent, null, '', v1, v2, 'sourcePort=s;targetPort=nw');
            var e2 = graph.insertEdge(parent, null, '', v1, v3, 'sourcePort=e;targetPort=out3');
        }
        finally {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }

    setShapePorts = () => {
        const { mxShape } = this.props.Mx;
        // Ports are equal for all shapes...
        // 适配所有图形的点位，包括矩形，圆
        var ports = new Array();

        // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
        ports['w'] = { x: 0, y: 0.5, perimeter: true, constraint: 'west' };
        ports['e'] = { x: 1, y: 0.5, perimeter: true, constraint: 'east' };
        ports['n'] = { x: 0.5, y: 0, perimeter: true, constraint: 'north' };
        ports['s'] = { x: 0.5, y: 1, perimeter: true, constraint: 'south' };
        ports['nw'] = { x: 0, y: 0, perimeter: true, constraint: 'north west' };
        ports['ne'] = { x: 1, y: 0, perimeter: true, constraint: 'north east' };
        ports['sw'] = { x: 0, y: 1, perimeter: true, constraint: 'south west' };
        ports['se'] = { x: 1, y: 1, perimeter: true, constraint: 'south east' };

        // Extends shapes classes to return their ports
        mxShape.prototype.getPorts = function () {
            return ports;
        };
    }

    setTriangle = () => {
        const { mxTriangle } = this.props.Mx;
        // ... except for triangles
        var ports2 = new Array();

        // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
        ports2['in1'] = { x: 0, y: 0, perimeter: true, constraint: 'east' };
        ports2['in2'] = { x: 0, y: 0.25, perimeter: true, constraint: 'west' };
        ports2['in3'] = { x: 0, y: 0.5, perimeter: true, constraint: 'west' };
        ports2['in4'] = { x: 0, y: 0.75, perimeter: true, constraint: 'west' };
        ports2['in5'] = { x: 0, y: 1, perimeter: true, constraint: 'west' };

        ports2['out1'] = { x: 0.5, y: 0, perimeter: true, constraint: 'north east' };
        ports2['out2'] = { x: 1, y: 0.5, perimeter: true, constraint: 'east' };
        ports2['out3'] = { x: 0.5, y: 1, perimeter: true, constraint: 'south east' };



        // 指定三角形使用的点位
        mxTriangle.prototype.getPorts = function () {
            return ports2;
        };
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