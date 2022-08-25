import React from "react";
import { mxCell, mxGraph, mxGraphExportObject, mxGraphModel, mxUtils } from "mxgraph";
import { Button } from "antd";
import GraphEditor from './assetBlood/graphEditor';

interface IProps {
    Mx: mxGraphExportObject;
}

interface GraphEditorType extends mxGraphExportObject {
    Mx: mxGraphExportObject;
    graph: mxGraph;
    executeLayout: Function;
}
export default class Layers extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: mxGraph = null;
    GraphEditor: GraphEditorType = null;

    componentDidMount() {
        // this.initGraph();
        this.renderTree();
    }

    initGraph = () => {
        const {
            mxGraph,
            mxCell,
            mxGraphModel,
            mxPoint,
            mxClient,
            mxUtils,
            mxHierarchicalLayout,
            mxGraphHierarchyModel
        } = this.props.Mx;

        // var root = new mxCell();
        // var layer0 = root.insert(new mxCell(), 0);
        // var layer1 = root.insert(new mxCell(), 1);
        // var model = new mxGraphModel(root);
        // var graph = new mxGraph(this.graphContainer, model);

        const graph = new mxGraph(this.graphContainer);
        this.graph = graph;

        // Disables basic selection and cell handling
        graph.setEnabled(false);

        const model = graph.getModel();
        const root = graph.getDefaultParent();
        model.beginUpdate();
        let layer0 = root;
        let layer1 = root;
        let layout;
        try {
            layout = new mxHierarchicalLayout(graph); // eslint-disable-line
            layout.orientation = 'west';
            layout.disableEdgeStyle = false;
            layout.interRankCellSpacing = 60;
            layout.intraCellSpacing = 80;

            // const layoutModel = new mxGraphHierarchyModel(layout, [root], [root], root);
            // console.log(layoutModel);


            // var layer0 = root.insert(new mxCell(), 0);
            // var layer1 = root.insert(new mxCell(), 1);
            // layer0 = graph.insertVertex(root, 'layer', undefined, 0,0,0,0, 'fillColor=#e8e8e8');
            // layer1 = graph.insertVertex(root, 'layer1', undefined, 0,0,0,0, 'fillColor=#e8e8e8');
            // const layer0 = root;
            // const layer1 = root;
        } finally {
            layout.execute(graph.getDefaultParent());
            model.endUpdate();
        }

        model.beginUpdate();
        try {
            layout = new mxHierarchicalLayout(graph); // eslint-disable-line
            layout.orientation = 'west';
            layout.disableEdgeStyle = false;
            layout.interRankCellSpacing = 60;
            layout.intraCellSpacing = 80;

            var stream_task = graph.insertVertex(layer0, 'stream_task', 'stream_task,', 20, 20, 80, 30);
            var stream_source = graph.insertVertex(layer0, 'stream_source', 'stream_source,', 20, 20, 80, 30);
            var stream_source1 = graph.insertVertex(layer0, 'stream_source1', 'stream_source1,', 20, 20, 80, 30);
            var stream_target = graph.insertVertex(layer0, 'stream_target', 'stream_target!', 20, 20, 80, 30);

            var flinksql_task = graph.insertVertex(layer1, 'flinksql_task', 'flinksql_task,', 20, 20, 80, 30);
            var flinksql_source = graph.insertVertex(layer1, 'flinksql_source', 'flinksql_source,', 20, 20, 80, 30);
            var flinksql_source_up = graph.insertVertex(layer1, 'flinksql_source_up', 'flinksql_source_up,', 20, 20, 80, 30);
            var flinksql_target = graph.insertVertex(layer1, 'flinksql_target', 'flinksql_target!', 20, 20, 80, 30);

            var flinksql_task1 = graph.insertVertex(layer1, 'flinksql_task1', 'flinksql_task1,', 20, 20, 80, 30);
            var flinksql_source1 = graph.insertVertex(layer1, 'flinksql_source', 'flinksql_source,', 20, 20, 80, 30);
            var flinksql_target1 = graph.insertVertex(layer1, 'flinksql_target1', 'flinksql_target!', 20, 20, 80, 30);

            graph.insertEdge(layer0, null, '', stream_source1, stream_task);
            var e1 = graph.insertEdge(layer0, null, '', stream_source, stream_task);
            var e2 = graph.insertEdge(layer0, null, '', stream_task, stream_target);
            
            var e3 = graph.insertEdge(layer1, null, '', stream_target, flinksql_task);
            var e4 = graph.insertEdge(layer1, null, '', flinksql_task, flinksql_target);
            var e5 = graph.insertEdge(layer1, null, '', flinksql_source_up, flinksql_source);
            var e6 = graph.insertEdge(layer1, null, '', flinksql_source, flinksql_task);

            graph.insertEdge(layer1, null, '', stream_target, flinksql_task1);
            graph.insertEdge(layer1, null, '', flinksql_source1, flinksql_task1);
            graph.insertEdge(layer1, null, '', flinksql_task1, flinksql_target1);
       
            
         

        }
        finally {
            layout.execute(graph.getDefaultParent(), graph.getDefaultParent().children);
            console.log(layout.model)
            console.log(graph.getDefaultParent())
            model.endUpdate();
        }

    };

    renderTree = () => {
        const { executeLayout, graph, Mx } = this.GraphEditor;
        const { mxEvent } = Mx;
        // graph.getModel().clear();
        const root = graph.getDefaultParent();
        let layer0 = root;
        let layer1 = root;
        executeLayout(
            () => {
                var stream_task = graph.insertVertex(layer0, 'stream_task', 'stream_task,', 20, 20, 80, 30);
                var stream_source = graph.insertVertex(layer0, 'stream_source', 'stream_source,', 20, 20, 80, 30);
                var stream_source1 = graph.insertVertex(layer0, 'stream_source1', 'stream_source1,', 20, 20, 80, 30);
                var stream_target = graph.insertVertex(layer0, 'stream_target', 'stream_target!', 20, 20, 80, 30);
    
                var flinksql_task = graph.insertVertex(layer1, 'flinksql_task', 'flinksql_task,', 20, 20, 80, 30);
                var flinksql_source = graph.insertVertex(layer1, 'flinksql_source', 'flinksql_source,', 20, 20, 80, 30);
                var flinksql_source_up = graph.insertVertex(layer1, 'flinksql_source_up', 'flinksql_source_up,', 20, 20, 80, 30);
                var flinksql_target = graph.insertVertex(layer1, 'flinksql_target', 'flinksql_target!', 20, 20, 80, 30);
    
                var flinksql_task1 = graph.insertVertex(layer1, 'flinksql_task1', 'flinksql_task1,', 20, 20, 80, 30);
                var flinksql_source1 = graph.insertVertex(layer1, 'flinksql_source', 'flinksql_source,', 20, 20, 80, 30);
                var flinksql_target1 = graph.insertVertex(layer1, 'flinksql_target1', 'flinksql_target!', 20, 20, 80, 30);
    
                graph.insertEdge(layer0, null, '', stream_source1, stream_task);
                var e1 = graph.insertEdge(layer0, null, '', stream_source, stream_task);
                var e2 = graph.insertEdge(layer0, null, '', stream_task, stream_target);
                
                var e3 = graph.insertEdge(layer1, null, '', stream_target, flinksql_task);
                var e4 = graph.insertEdge(layer1, null, '', flinksql_task, flinksql_target);
                var e5 = graph.insertEdge(layer1, null, '', flinksql_source_up, flinksql_source);
                var e6 = graph.insertEdge(layer1, null, '', flinksql_source, flinksql_task);
    
                graph.insertEdge(layer1, null, '', stream_target, flinksql_task1);
                graph.insertEdge(layer1, null, '', flinksql_source1, flinksql_task1);
                graph.insertEdge(layer1, null, '', flinksql_task1, flinksql_target1);
           
                graph.addListener(mxEvent.CLICK, this.renderNext)
            },
            undefined,
            graph.getDefaultParent().children
        );
    };

    renderNext = (sender: any, evt: any) => {
        const { executeLayout, graph } = this.GraphEditor;
        const cell = evt.getProperty('cell');
        console.log(cell);


        const layer1 = graph.getDefaultParent();
        executeLayout(() => {
            
            var flinksql_source = graph.insertVertex(layer1, 'flinksql_source', 'flinksql_source,', 20, 20, 80, 30);
            var flinksql_source_up = graph.insertVertex(layer1, 'flinksql_source_up', 'flinksql_source_up,', 20, 20, 80, 30);
            var e5 = graph.insertEdge(layer1, null, '', flinksql_source_up, flinksql_source);
            var e6 = graph.insertEdge(layer1, null, '', flinksql_source, cell);
        })
      
    }

    setModelVisible = (index: number) => {
        const model: mxGraphModel = this.graph.getModel();
        const layer = model.getChildAt(model?.root?.children[0], index)
        if (layer) {
            model.setVisible(layer, !model.isVisible(layer))
        }
    }

    getmxGeometry = () => {
        const vertex = this.graph.model.getCell('vertex1');
        console.log(this.graph.model.getRoot())
        console.log('vertexGeometry: mxGeometry = ', vertex.geometry);
    }

    render(): React.ReactNode {
        return (
            <div>
                {/* <div
                    id="graphContainer"
                    ref={(e: any) => { this.graphContainer = e; }}
                ></div> */}
                <div className="tableRelation_graph">
                    <GraphEditor
                        ref={(node: any) => (this.GraphEditor = node)}
                        showMenu
                        name="表级血缘"></GraphEditor>
                </div>
                <Button onClick={() => this.setModelVisible(0)}>Layer 0</Button>
                <Button onClick={() => this.setModelVisible(1)}>Layer 1</Button>
                <Button onClick={() => this.getmxGeometry()}>get geometry</Button>
            </div>
        )
    }
} 