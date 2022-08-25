import React from "react";
import type { mxGraph, mxGraphExportObject } from "mxgraph";
import { Button } from "antd";

interface IProps {
    Mx: mxGraphExportObject;
}
export default class HelloWorldGraph extends React.PureComponent<IProps, any> {
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
            mxGeometry
        } = this.props.Mx;
        // 在给定容器中创建图形
        const graph = new mxGraph(this.graphContainer);

        this.graph = graph;

        // 启用选框
        new mxRubberband(graph);

        // 获取用于插入新单元格的默认父级。
        // 这通常是根的第一个子节点（即第 0 层）。
        const parent = graph.getDefaultParent();

        // 在一个步骤中将单元格添加到模型
        graph.getModel().beginUpdate();
        try {
            const v1 = graph.insertVertex(parent, 'vertex1', 'Hello,', 20, 20, 80, 30);
            const v2 = graph.insertVertex(parent, 'vertex2', 'World!', 200, 150, 80, 30);
            // const cell = new mxCell('cell', new mxGeometry(40, 40, 80, 30));
            // 将cell设定为几何图案类型
            // cell.vertex = true;
            // graph.addCell(cell, parent)

            graph.insertEdge(parent, 'edge1', '', v1, v2);
        }
        finally {
            // 更新显示
            graph.getModel().endUpdate();
        }
        this.getmxGeometry();
    }

    getmxGeometry = () => {
        const btn = document.createElement('button');
        btn.innerHTML = 'GET GRAPH INFO'
        btn.onclick = () => {
            const vertex = this.graph.model.getCell('vertex1');
            console.log('vertexGeometry: mxGeometry = ', vertex.geometry);
            console.log('vertexState: mxCellState = ', this.graph.view.getState(vertex))
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