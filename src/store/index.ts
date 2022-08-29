import { applyMiddleware, compose, createStore } from 'redux'
import reducers from './reducers' // 合并
import thunk, { ThunkMiddleware } from 'redux-thunk'

// ts as 强制类型声明 断言 
const composeEnhancers = 
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,
    composeEnhancers(
        applyMiddleware(
            // 断言 dispatch 异步action ts -> thunkMiddleware
            thunk as ThunkMiddleware
        )
    )
)
// rootState  state 状态类型
// type interface ts 里的类型声明 
export type rootState = ReturnType<typeof reducers>
export default store;