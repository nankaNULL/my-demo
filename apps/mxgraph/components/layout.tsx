import React from "react";
import { mxCell, mxGraph, mxGraphExportObject } from "mxgraph";
import { Button, Select } from "antd";

interface IProps {
    Mx: mxGraphExportObject;
}
export default class LayoutGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    initGraph = () => {
        const {
            mxGraph,
            mxConstants,
            mxEvent, mxRubberband
        } = this.props.Mx;

        // Creates the graph inside the given container
        mxEvent.disableContextMenu(this.graphContainer);

        const graph = new mxGraph(this.graphContainer);
        this.graph = graph;
        
        // 启用绘制
        graph.setPanning(true);
        graph.keepEdgesInBackground = true;
        // 允许鼠标移动画布
        graph.panningHandler.useLeftButtonForPanning = true;
        
        graph.setEnabled(false); // 设置启用,就是允不允许你改变CELL的形状内容。
        graph.setConnectable(false); // 是否允许Cells通过其中部的连接点新建连接,false则通过连接线连接
        graph.setCellsResizable(false); // 禁止改变元素大小
        graph.setAutoSizeCells(false);
        graph.centerZoom = true;
        graph.setTooltips(false);
        graph.view.setScale(1);
        // Enables HTML labels
        graph.setHtmlLabels(true);
        graph.setAllowDanglingEdges(false);
        // 禁止Edge对象移动
        // graph.setCellsMovable(false);
        // graph.isCellsMovable = function () {
        //     return false;
        // };
        // 禁止cell编辑
        graph.isCellEditable = function () {
            return false;
        };

        graph.setConnectableEdges(false)
        // 设置Vertex样式
        // const vertexStyle = this.getDefaultVertexStyle();
        // graph.getStylesheet().putDefaultVertexStyle(vertexStyle);

        // 默认边界样式
        // let edgeStyle = this.getDefaultEdgeStyle();
        // graph.getStylesheet().putDefaultEdgeStyle(edgeStyle);
        // anchor styles
        mxConstants.HANDLE_FILLCOLOR = '#ffffff';
        mxConstants.HANDLE_STROKECOLOR = 'transparent';
        mxConstants.VERTEX_SELECTION_COLOR = 'transparent';
        mxConstants.CURSOR_MOVABLE_VERTEX = 'pointer';

        // Avoids overlap of edges and collapse icons
        // graph.keepEdgesInBackground = true;

        // let style = this.graph.getStylesheet().getDefaultVertexStyle();
        // style[mxConstants.STYLE_SHAPE] = 'treenode';
        // style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        // style[mxConstants.STYLE_SHADOW] = true;

        // style = this.graph.getStylesheet().getDefaultEdgeStyle();
        // // style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
        // style[mxConstants.STYLE_ROUNDED] = true;

        // Enables automatic sizing for vertices after editing and
        // panning by using the left mouse button.
        // graph.setAutoSizeCells(true);
        // graph.setPanning(true);
        // graph.panningHandler.useLeftButtonForPanning = true;

        // Disallow any selections
        // graph.setCellsSelectable(false);
        // 重置tooltip
        // enables rubberband
        // this.initContainerScroll();
        new mxRubberband(graph); // eslint-disable-line
        // onInit && onInit(graph, this.Mx);
        // if (showMenu) {
        //     this.initContextMenu();
        //     this.addEventListenerMenu();
        // }
        // this.viewXML();
    }

    insertCell = () => {
        const graph = this.graph;
        const parent = graph.getDefaultParent();

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

        var other = graph.insertVertex(parent, 'other', 'other', 0, 0, 60, 40);
        
    }

    executeLayout = (type: string, onchange: () => void) => {
        const graph = this.graph;
        const currentLayout = this.props.Mx[type];

        var layout = new currentLayout(graph, false);
        // layout.useBoundingBox = false;
        // layout.edgeRouting = false;
        // layout.levelDistance = 30;
        // layout.nodeDistance = 10;
        layout.orientation = 'west';
		layout.disableEdgeStyle = false;
		layout.interRankCellSpacing = 60;
		layout.intraCellSpacing = 80;
		layout.interHierarchySpacing = 200;
		layout.parallelEdgeSpacing = 200;

        const parent = graph.getDefaultParent();

        // Adds the root vertex of the tree
        graph.getModel().beginUpdate();
        try {
            onchange();
            layout.execute(parent);
        }
        finally {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }

    handleChange = (value: string) => {
        this.graph.model.clear();
        this.executeLayout(value, this.insertCell)
    }

    handleClear = () => {
        this.graph.model.clear();
    }


    render(): React.ReactNode {
        const layoutList = [
            'mxCompactTreeLayout',
            'mxGraphLayout',
            'mxStackLayout',
            'mxCircleLayout',
            'mxSwimlaneLayout',
            'mxCompositeLayout',
            'mxEdgeLabelLayout',
            'mxPartitionLayout',
            'mxRadialTreeLayout',
            'mxFastOrganicLayout',
            'mxHierarchicalLayout',
            'mxParallelEdgeLayout'
        ];
        return (
            <div>
                <div
                    id="graphContainer"
                    ref={(e: any) => { this.graphContainer = e; }}
                ></div>
                <Select
                    placeholder="选择layout"
                    style={{ width: 300 }}
                    onChange={this.handleChange}
                >
                    {layoutList.map((item: string) => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                </Select>
                <Button danger onClick={() => this.handleClear()}>CLEAR</Button>
            </div>
        )
    }
}