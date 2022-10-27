import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { initialState, reducer } from './reducer';


export default function initializeStore(state: any) {
    const store = createStore(
        reducer,
        Object.assign({}, initialState, state),
        applyMiddleware(ReduxThunk)
    )
    return store
}