import React from "react";
import { doToggleTodo } from "../store/actions/todoActions";
import { connect } from "react-redux";

const TodoItem = ({ todo, onToggleTodo }) => {
  const { name, id, completed } = todo;

  return (
    <div>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)}>
        {completed ? "Incomplete" : "Complete"}
      </button>
    </div>
  );
};

function getTodosAsIds(state) {
  return state.todoState.ids;
}

function getTodo(state, todoId) {
  return state.todoState.entities[todoId];
}

function mapStateToProps(state, props) {
  return {
    todo: getTodo(state, props.todoId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleTodo: (id) => dispatch(doToggleTodo(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
