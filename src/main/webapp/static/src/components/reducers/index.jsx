import { combineReducers } from 'redux'
import addUserModal from './addUserModal'

/*
combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，
合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。

合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。
state 对象的结构由传入的多个 reducer 的 key 决定。

最终，state 对象的结构会是这样的：
{
    reducer1: ...
    reducer2: ...
}
通过为传入对象的 reducer 命名不同来控制 state key 的命名。
例如，你可以调用 combineReducers({ todos: myTodosReducer, counter: myCounterReducer })
将 state 结构变为 { todos, counter }。

通常的做法是命名 reducer，然后 state 再去分割那些信息，因此你可以使用 ES6 的简写方法：
combineReducers({ counter, todos })。这与 combineReducers({ counter: counter, todos: todos })
一样。
*/
const rootReducer = combineReducers({
    addUserModal
});

export default rootReducer
