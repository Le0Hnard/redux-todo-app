import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { doAddTodo } from "../store/actions/todoActions";

class TodoCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.onCreateTodo = this.onCreateTodo.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  onChangeName(event) {
    this.setState({ value: event.target.value });
  }

  onCreateTodo(event) {
    this.props.onAddTodo(this.state.value);
    this.setState({ value: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onCreateTodo}>
          <input
            type="text"
            placeholder="Add Todo..."
            value={this.state.value}
            onChange={this.onChangeName}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: (name) => dispatch(doAddTodo(uuidv4(), name)),
  };
};

export default connect(null, mapDispatchToProps)(TodoCreate);
