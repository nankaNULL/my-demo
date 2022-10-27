import React from 'react';
import LineCharts from './lineChart';
import { option } from './option';

export default class EchartsPage extends React.PureComponent<any, any> {
    render(): React.ReactNode {
        
        return (
            <div style={{ height: 300, width: 400 }}>
                <LineCharts options={option} />
            </div>
        )
    }
}