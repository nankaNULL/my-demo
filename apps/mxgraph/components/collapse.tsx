import React from "react";
import { mxCell, mxGraph, mxGraphExportObject } from "mxgraph";

const collapsedIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IArs4c6QAAADNQTFRFAAAAscTOtr/Isb7HsLzGsL7Frr3Fr73Gr7zFr73Frr3FrrzFrrzGrrzF5+vt5+vu////mHsMmQAAAA10Uk5TABocTmtum7bZ8vP8/XH+TQkAAACASURBVCjPdVLZAoAgCMMjb8r//9oOjazcnpApzAFRg7Y+pBS81TRCucwd2aknbyIPiObOL4VfKEu//8kfzPVGRf4hnn2cHLdNQnfoFD1cq4RZk+UZwZb8nPAU5kSg1PpWQVOQ/sTaCVgKNody4QdHS9bREmwitB0PCo8WL8NsfXarIha/m4rePQAAAABJRU5ErkJggg==`;
const expandIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IArs4c6QAAAFFQTFRFAAAAscTOtr/Isb7HsLzGsL7Frr3Fr73Gr7zFr73Frr3FrrzFrrzGrrzFr73GsL7HxtDWxtDXyNLYydPZ2uHl4+jr8/b39Pb4+/z9/Pz9////LZ5QBAAAAA10Uk5TABocTmtum7bZ8vP8/XH+TQkAAACgSURBVCjPdZJBFoMgDESDIgg4xaJAyf0P2kVta6X5yxkeSSYhejFoO3s/Wz3QGWUCDoJRX310iFsurZW8RbjxrU8LUuWDmrBMx/vltvOJ/baMRETK4Udn3uEUERkkvpBgiIYQ69WoMQyksXHHBk0WuTcyLM0ovVEwk0dj5hUfVmZu8L1xZ+YHvPyVWFxsVxxQjEQOUYxdXpS8WvkY/p3PE1eBJPk78EiAAAAAAElFTkSuQmCC`;

interface IProps {
    Mx: mxGraphExportObject;
}
export default class CollapseGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    initGraph = () => {
        const {
            mxGraph,
            mxRectangle,
            mxImage,
            mxConstants,
            mxEdgeStyle,
            mxCompactTreeLayout,
            mxLayoutManager
        } = this.props.Mx;
        // 在给定容器中创建图形
        // Sets the collapse and expand icons. The values below are the default
        // values, but this is how to replace them if you need to.
        mxGraph.prototype.collapsedImage = new mxImage(collapsedIcon, 14, 14);
        mxGraph.prototype.expandedImage = new mxImage(expandIcon, 14, 14);

        // Creates the graph inside the given container
        var graph = new mxGraph(this.graphContainer);
        this.graph = graph;

        // Avoids overlap of edges and collapse icons
        graph.keepEdgesInBackground = true;

        // Set some stylesheet options for the visual appearance
        var style = graph.getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_SHAPE] = 'treenode';
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        style[mxConstants.STYLE_SHADOW] = true;

        style = graph.getStylesheet().getDefaultEdgeStyle();
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
        style[mxConstants.STYLE_ROUNDED] = true;

        // Enables automatic sizing for vertices after editing and
        // panning by using the left mouse button.
        graph.setAutoSizeCells(true);
        graph.setPanning(true);
        graph.panningHandler.useLeftButtonForPanning = true;

        // Enables automatic layout on the graph and installs
        // a tree layout for all groups who's children are
        // being changed, added or removed.
        var layout = new mxCompactTreeLayout(graph, false);
        layout.useBoundingBox = false;
        layout.edgeRouting = false;
        layout.levelDistance = 30;
        layout.nodeDistance = 10;

        // Disallow any selections
        graph.setCellsSelectable(false);

        // Defines the condition for showing the folding icon
        graph.isCellFoldable = function (cell) {
            return graph.model.getOutgoingEdges(cell).length > 0;
        };

        // Defines the position of the folding icon
        graph.cellRenderer.getControlBounds = function (state) {
            if (state.control != null) {
                var oldScale = state.control.scale;
                var w = state.control.bounds.width / oldScale;
                var h = state.control.bounds.height / oldScale;
                var s = state.view.scale;

                return new mxRectangle(state.x + state.width / 2 - w / 2 * s,
                    state.y + state.height - h / 2 * s,
                    w * s, h * s);
            }

            return null;
        };

        // Implements the click on a folding icon
        graph.foldCells = function (collapse, recurse, cells) {
            graph.model.beginUpdate();
            try {
                toggleSubtree(cells[0], !collapse);
                graph.model.setCollapsed(cells[0], collapse);

                // Executes the layout for the new graph since
                // changes to visiblity and collapsed state do
                // not trigger a layout in the current manager.
                layout.execute(graph.getDefaultParent());
            }
            finally {
                graph.model.endUpdate();
            }
        };

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds the root vertex of the tree
        graph.getModel().beginUpdate();
        try {
            var w = graph.container.offsetWidth;
            var root = graph.insertVertex(parent, 'treeRoot', 'Root', w / 2 - 30, 20, 60, 40);

            var v1 = graph.insertVertex(parent, 'v1', 'Child 1', 0, 0, 60, 40);
            graph.insertEdge(parent, 'edge1', 'edge1', root, v1);

            var v2 = graph.insertVertex(parent, 'v2', 'Child 2', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', root, v2);

            var v3 = graph.insertVertex(parent, 'v3', 'Child 3', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', root, v3);

            var v11 = graph.insertVertex(parent, 'v11', 'Child 1.1', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', v1, v11);

            var v12 = graph.insertVertex(parent, 'v12', 'Child 1.2', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', v1, v12);

            var v21 = graph.insertVertex(parent, 'v21', 'Child 2.1', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', v2, v21);

            var v22 = graph.insertVertex(parent, 'v22', 'Child 2.2', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', v2, v22);

            var v221 = graph.insertVertex(parent, 'v221', 'Child 2.2.1', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', v22, v221);

            var v222 = graph.insertVertex(parent, 'v222', 'Child 2.2.2', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', v22, v222);

            var v31 = graph.insertVertex(parent, 'v31', 'Child 3.1', 0, 0, 60, 40);
            graph.insertEdge(parent, null, '', v3, v31);

            layout.execute(graph.getDefaultParent());
        }
        finally {
            // Updates the display
            graph.getModel().endUpdate();
        }

        function toggleSubtree(cell: mxCell, show: boolean) {
            show = (show != null) ? show : true;
            var cells: mxCell[] = [];

            graph.traverse(cell, true, function (vertex: mxCell) {
                if (vertex != cell) {
                    cells.push(vertex);
                }

                // Stops recursion if a collapsed cell is seen
                return vertex == cell || !graph.isCellCollapsed(vertex);
            });

            graph.toggleCells(show, cells, true);
        };
        this.getmxGeometry();
    }

    getmxGeometry = () => {
        const btn = document.createElement('button');
        btn.innerHTML = 'GET GRAPH INFO'
        btn.onclick = () => {
            const vertex = this.graph.model.getCell('v11');
            const edge = this.graph.model.getCell('edge1');
            console.log('vertexGeometry: mxGeometry = ', vertex.geometry);
            console.log('edgeGeometry: mxGeometry = ', edge.geometry);
            console.log('vertexState: mxCellState = ', this.graph.view.getState(vertex))
            console.log('edgexState: mxCellState = ', this.graph.view.getState(edge))
        }
        document.body.appendChild(btn);
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