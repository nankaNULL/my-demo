import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "antd";
import { withRouter } from 'next/router';
import { actions } from '../../store/reducer';


const ReduxPage = (props: any) => {
    const { router } = props;
    const dispatch = useDispatch();
    const state = useSelector((state: any) => ({ count: state.count }));
    return (
        <div>
            <h1>Redux Page</h1>
            <p>Count: {state.count}</p>
            <Button onClick={() => dispatch(actions.countAdd() as any)}>COUNT ADD</Button>
            <Button onClick={() => router?.reload()}>Page Reload</Button>
        </div>
    )
}
ReduxPage.getInitialProps = async (initialProps: any) => {
    const { reduxStore } = initialProps;
    reduxStore?.dispatch(actions.countAdd());
    return {}
}

export default withRouter(ReduxPage);