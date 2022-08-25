import React from "react";
import { mxCell, mxGraphExportObject, mxGraphModel } from "mxgraph";

const USER_OBJECT = 'UserObject';

interface IProps {
    Mx: mxGraphExportObject;
}
export default class HtmlLabels extends React.PureComponent<IProps, any> {
    graphContainer: any = null;
    graph: any = null;
    layout: any = null;

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
            mxCell,
            mxGraphModel,
            mxClient,
            mxUtils,
            mxEvent,
            mxCodecRegistry,
            mxUndoManager
        } = this.props.Mx;

        const _this = this;

        // Disables the built-in context menu
        mxEvent.disableContextMenu(this.graphContainer);

        // Creates the graph inside the given container
        const graph = new mxGraph(this.graphContainer);
        this.graph = graph;

        // Enables HTML labels
        graph.setHtmlLabels(true);

        // Ignores cached label in codec
        mxCodecRegistry.getCodec(mxCell).exclude.push('div');

        graph.convertValueToString = function (cell) {
            if (cell.div != null) {
                // Uses cached label
                return cell.div;
            }
            if (_this.isUserObject(cell)) {
                // Returns a DOM for the label
                const div = document.createElement('div');
                div.innerHTML = cell.getAttribute('label', 'defalutValue');
                mxUtils.br(div, 1);

                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');

                if (cell.getAttribute('checked', 'defalutValue') == 'true') {
                    checkbox.setAttribute('checked', 'checked');
                    checkbox.defaultChecked = true;
                }

                // Writes back to cell if checkbox is clicked
                console.log(mxClient.IS_QUIRKS);
                mxEvent.addListener(checkbox, (mxClient.IS_QUIRKS) ? 'click' : 'change', function () {
                    const elt = cell.value.cloneNode(true);
                    elt.setAttribute('checked', (checkbox.checked) ? 'true' : 'false');
                    graph.model.setValue(cell, elt);
                });

                div.appendChild(checkbox);

                // Caches label
                cell.div = div;

                return div;
            }

            
            // if (_this.isUserObject(cell)) {
            //     const text = cell.getAttribute('label', 'default');
            //     console.log('text: string = ', text);
            //     return '<div>' +
            //         `<span>${text}</sapn><br />` +
            //         `<input type="checkbox">` +
            //     '</div>'
            // }

            return '';
        };

        // Invalidates cached labels
        // label 有变动了，更新，实际更新时靠 setValue 才可以真真改变值的
        // graph.model.setValue = function (cell: mxCell, value) {
        //     cell.div = null;
        //     console.log(cell, value);
        //     mxGraphModel.prototype.setValue.apply(graph.model, [cell, value]);
        // };

        // Overrides method to store a cell label in the model
        // label 文案变更
        graph.cellLabelChanged = function (cell: mxCell, newValue, autoSize: boolean) {
            if (_this.isUserObject(cell)) {
                // Clones the value for correct undo/redo
                const label = cell.value.cloneNode(true);
                label.setAttribute('label', newValue);
                newValue = label;
            }

            mxGraph.prototype.cellLabelChanged.apply(graph, [cell, newValue, autoSize])
            // cellLabelChanged.apply(graph, [cell, newValue, autoSize])
            // cellLabelChanged(cell, newValue, autoSize)
        };

        // Overrides method to create the editing value
        // label 编辑时，将 html 转义成文本内容
        graph.getEditingValue = function (cell) {
            if (_this.isUserObject(cell)) {
                return cell.getAttribute('label', 'defaultValue');
            }
        };

        const parent = graph.getDefaultParent();

        graph.model.beginUpdate();
        try {
            // Creates a user object that stores the state
            const doc = mxUtils.createXmlDocument();
            let obj = doc.createElement('UserObject');
            obj.setAttribute('label', 'Hello, World!');
            obj.setAttribute('checked', 'false');
            graph.insertVertex(parent, 'label', obj, 20, 20, 80, 60);
        }
        finally {
            graph.model.endUpdate();
        }


        // Undo/redo
        // 监听变更记录，实现重做 / 回退
        var undoManager = new mxUndoManager();
        var listener = function (sender: any, evt: any) {
            undoManager.undoableEditHappened(evt.getProperty('edit'));
        };
        graph.getModel().addListener(mxEvent.UNDO, listener);
        graph.getView().addListener(mxEvent.UNDO, listener);

        document.body.appendChild(mxUtils.button('Undo', function () {
            undoManager.undo();
        }));

        document.body.appendChild(mxUtils.button('Redo', function () {
            undoManager.redo();
            const cell = graph.model.getCell('label').value;
            console.log(cell);
        }));

    };

    render(): React.ReactNode {
        return (
            <div>
                <div
                    id="graphContainer"
                    ref={(e: any) => { this.graphContainer = e; }}
                ></div>
            </div>
        )
    }
} 