import { Dispatch } from 'redux';

export const initialState = {
    count: 0
}

export const actions = {
    // 获取表管理支持的数据源
    countAdd: function () {
        return async (dispatch: Dispatch) => {
            dispatch({ type: 'add' });
        };
    },
}

export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'add':
            return {
                count: state.count + 1
            }
        default:
            return state
    }
}
