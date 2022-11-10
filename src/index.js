import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import { schema, normalize } from "normalizr";

const todoSchema = new schema.Entity("todo");

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

const todos = [
  { id: "1", name: "Hands On: Redux Standalone with advanced Actions" },
  { id: "2", name: "Hands On: Redux Standalone with advanced Reducers" },
  { id: "3", name: "Hands On: Bootstrap App with Redux" },
  { id: "4", name: "Hands On: Naive Todo with React and Redux" },
  { id: "5", name: "Hands On: Sophisticated Todo with React and Redux" },
  { id: "6", name: "Hands On: Connecting State Everywhere" },
  { id: "7", name: "Hands On: Todo with advanced Redux" },
  { id: "8", name: "Hands On: Todo but more Features" },
  { id: "9", name: "Hands On: Todo with Notifications" },
  { id: "10", name: "Hands On: Hacker News with Redux" },
];

const normalizedTodos = normalize(todos, [todoSchema]);
console.log(normalizedTodos);

const initialTodoState = {
  entities: normalizedTodos.entities.todo,
  ids: normalizedTodos.result,
};

function todoReducer(state = initialTodoState, action) {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
}

function applyAddTodo(state, action) {
  const todo = { ...action.todo, completed: false };
  const entities = { ...state.entities, [todo.id]: todo };
  const ids = [...state.ids, action.todo.id];
  return [...state, entities, ids];
}

function applyToggleTodo(state, action) {
  const id = action.todo.id;
  const todo = state.entities[id];
  const toggledTodo = { ...todo, completed: !todo.completed };
  const entities = { ...state.entities, [id]: toggledTodo };
  return { ...state, entities };
}

function filterReducer(state = "SHOW_ALL", action) {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
}

function applySetFilter(state, action) {
  return action.filter;
}

function doAddTodo(id, name) {
  return {
    type: TODO_ADD,
    todo: { id, name },
  };
}

function doToggleTodo(id) {
  return {
    type: TODO_TOGGLE,
    todo: { id },
  };
}

function doSetFilter(filter) {
  return {
    type: FILTER_SET,
    filter,
  };
}

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
});

const logger = createLogger();

const store = createStore(rootReducer, undefined, applyMiddleware(logger));

function TodoApp({ todos, onToggleTodo }) {
  // return <TodoList todos={todos} onToggleTodo={onToggleTodo} />;
  return <ConnectedTodoList />;
}

function TodoList({ todosAsIds }) {
  return (
    <div>
      {todosAsIds.map((todoId) => (
        <ConnectedTodoItem key={todoId} todoId={todoId} />
      ))}
    </div>
  );
}

function TodoItem({ todo, onToggleTodo }) {
  const { name, id, completed } = todo;
  return (
    <div>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)}>
        {completed ? "Incomplete" : "Complete"}
      </button>
    </div>
  );
}

function getTodosAsIds(state) {
  return state.todoState.ids;
}

function getTodo(state, todoId) {
  return state.todoState.entities[todoId];
}

function mapStateToPropsList(state) {
  return {
    todosAsIds: getTodosAsIds(state),
  };
}

function mapStateToPropsItem(state, props) {
  return {
    todo: getTodo(state, props.todoId),
  };
}

function mapDispatchToPropsItem(dispatch) {
  return {
    onToggleTodo: (id) => dispatch(doToggleTodo(id)),
  };
}

// const ConnectedTodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp);
const ConnectedTodoList = connect(mapStateToPropsList)(TodoList);
const ConnectedTodoItem = connect(
  mapStateToPropsItem,
  mapDispatchToPropsItem
)(TodoItem);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
