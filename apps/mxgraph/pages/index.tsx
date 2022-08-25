import React from "react";
import { MxFactory } from "../components/mxFactory";
import CollapseGraph from "../components/collapse";
import CollapseTreeGraph from "../components/collapseTree";
import HelloWorldGraph from "../components/helloworld";
import HtmlLabels from "../components/htmlLabel";
import Layers from "../components/layers";
import PermiterGraph from "../components/perimeter";
import { ASSET_TYPE } from "../components/assetBlood/constants";
import StyleSheetGraph from "../components/stylesheet";
import ShapesGraph from "../components/shapes";
import LayoutGraph from "../components/layout";
import SwimlaneLayoutGraph from "../components/swimlaneLayout";
import HandlerGraph from "../components/handler";
import ConnectionGraph from "../components/connection";
import AnchorsGraph from "../components/anchors";
// import GraphContainer from "../components/assetBlood/graphContainer";
// import '../styles/graphContainer.scss';

export default class MxGraph extends React.PureComponent<any, any> {
	Mx: any = null;

	componentDidMount() {
		this.Mx = MxFactory.create();
		this.forceUpdate();
	}
	render(): React.ReactNode {
		if (!this.Mx) {
			return 'loading'
		}
		return (
			<div>
				{/* <GraphContainer Mx={this.Mx} /> */}
				{/* <HelloWorldGraph Mx={this.Mx} /> */}
				{/* <Layers Mx={this.Mx} /> */}
				{/* <LayoutGraph Mx={this.Mx} /> */}
				{/* <SwimlaneLayoutGraph Mx={this.Mx} /> */}
				{/* <HtmlLabels Mx={this.Mx} /> */}
				{/* <CollapseGraph Mx={this.Mx} /> */}
				{/* <CollapseTreeGraph Mx={this.Mx} /> */}
				{/* <PermiterGraph Mx={this.Mx} /> */}
				{/* <StyleSheetGraph Mx={this.Mx} /> */}
				{/* <ShapesGraph Mx={this.Mx} /> */}
				{/* <HandlerGraph Mx={this.Mx} /> */}
				{/* <ConnectionGraph Mx={this.Mx} /> */}
				<AnchorsGraph Mx={this.Mx} />
			</div>
		)
	}
} 