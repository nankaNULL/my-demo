import React from "react";
import ReactDOM from 'react-dom';
import type { mxCell, mxGraph, mxGraphExportObject } from "mxgraph";
import LineCharts from "./lineChart";
import { option } from "./option";

const USER_OBJECT = 'UserObject';

interface IProps {
    Mx: mxGraphExportObject;
}
export default class HelloWorldGraph extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph;

    componentDidMount() {
        this.initGraph();
    }

    isUserObject = (cell: mxCell) => {
        const { mxUtils } = this.props.Mx;
        return mxUtils.isNode(cell.value, USER_OBJECT) && cell.value.nodeName === USER_OBJECT;
    }

    initGraph = () => {
        const {
            mxGraph,
            mxRubberband,
            mxUtils,
        } = this.props.Mx;

        const _this = this;
        // 在给定容器中创建图形
        const graph = new mxGraph(this.graphContainer);

        this.graph = graph;

        // Enables HTML labels
        graph.setHtmlLabels(true);

        // 启用选框
        new mxRubberband(graph);

        // 获取用于插入新单元格的默认父级。
        // 这通常是根的第一个子节点（即第 0 层）。
        const parent = graph.getDefaultParent();

        graph.convertValueToString = function (cell) {
            if (cell.div != null) {
                // Uses cached label
                return cell.div;
            }
            if (_this.isUserObject(cell)) {
                // Returns a DOM for the label
                const div = document.createElement('div');
                div.setAttribute('style', 'height: 300px; width: 400px');
                const element = React.createElement(LineCharts, { options: option });
                ReactDOM.render(element, div);

                // Caches label
                cell.div = div;
                return div;
            } else {
                return cell.value;
            }
        };

        // 在一个步骤中将单元格添加到模型
        graph.getModel().beginUpdate();
        try {
            const v1 = graph.insertVertex(parent, 'vertex1', 'Hello,', 20, 20, 80, 30);
            const v2 = graph.insertVertex(parent, 'vertex2', 'World!', 200, 150, 80, 30);
            graph.insertEdge(parent, 'edge1', '', v1, v2);

            const doc = mxUtils.createXmlDocument();
            const obj = doc.createElement('UserObject');
            obj.setAttribute('label', 'Hello, World!');
            graph.insertVertex(parent, 'label', obj, 300, 300, 500, 400);
        }
        finally {
            // 更新显示
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