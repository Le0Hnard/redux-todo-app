import React from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = ({ todosAsIds }) => {
  return (
    <div>
      {todosAsIds.map((todoId) => (
        <TodoItem key={todoId} todoId={todoId} />
      ))}
    </div>
  );
};

function getTodosAsIds(state) {
  return state.todoState.ids;
}

function mapStateToProps(state) {
  return {
    todosAsIds: getTodosAsIds(state),
  };
}

export default connect(mapStateToProps)(TodoList);
