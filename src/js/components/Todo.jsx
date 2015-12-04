import React from 'react';
import ReactDOM from 'react-dom';

import {store} from './App.jsx';

export class Todo extends React.Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
    this._toggleTodo = this._toggleTodo.bind(this);
    this.state = store.getState();
  }

  _onSubmit(e) {
    e.preventDefault();
    let val = ReactDOM.findDOMNode(this.refs.text).value;

    store.dispatch({
      type: 'ADD_TODO',
      id: this.state.todos.length + 1,
      text: val
    });

    this.state = store.getState();
  }

  _toggleTodo(todo, e) {
    e.preventDefault();

    store.dispatch({
      type: 'TOGGLE_TODO',
      id: todo.id
    });

    this.state = store.getState();
  }

  render() {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <input ref="text" type="text" />
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (
              <li key={todo.id}>
                <a href="#" style={{textDecoration: todo.completed ? 'line-through' : 'none'}} onClick={this._toggleTodo.bind(this, todo)}>
                  {todo.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};
