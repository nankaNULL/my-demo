import React from "react"
import { Button } from "antd";
import style from '../../styles/button.module.scss';
import { withRouter } from "next/router";
import styled from 'styled-components';

const StyledLabel = styled.p`
    color: red;
`;


class StylePage extends React.PureComponent<any, any> {
    render() {
        const { router } = this.props;
        return (
            <div className={style['style-page']}>
                <h1 className="style-page-title">Style Page</h1>
                <StyledLabel>styled-component</StyledLabel>
                <Button
                    className={style['btn-color']}
                    onClick={() => router.reload()}
                >Page Reload</Button>
            </div>

        )
    }
}
export default withRouter(StylePage);