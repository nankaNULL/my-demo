import * as React from 'react';
import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    GridComponent,
    LegendComponent,
    TooltipComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    DatasetComponent,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    LineChart,
    CanvasRenderer,
]);

export interface IEchartsProps {
    width?: number;
    height?: number;
    options?: any;
}

export default class LineCharts extends React.Component<IEchartsProps> {
    public id: HTMLDivElement | null = null;

    public myChart: echarts.ECharts | null = null;

    public componentDidMount() {
        const { options } = this.props;
        this.myChart = echarts.init(this.id as HTMLElement);
        this.myChart.setOption(options, true);
    }

    public render() {
        return (
            <div
                ref={(id) => (this.id = id)}
                style={{ width: `100%`, height: `100%` }}
            />
        );
    }
}
