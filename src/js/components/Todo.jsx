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
    let ref = ReactDOM.findDOMNode(this.refs.text)
    let val = ref.value;

    if(!val) return;

    ref.value = '';

    store.dispatch({
      type: 'ADD_TODO',
      text: val
    });
  }

  _toggleTodo(todo, e) {
    e.preventDefault();

    store.dispatch({
      type: 'TOGGLE_TODO',
      id: todo.id
    });
  }

  _onToggleFilter(filter, e) {
    e.preventDefault();

    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <input ref="text" type="text" />
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {this.props.todos.map((todo, index) => {
            let filter = this.props.visibilityFilter;
            if(filter !== 'SHOW_ALL') {
              if(filter === 'SHOW_COMPLETED' && !todo.completed) return null;
              if(filter === 'SHOW_NOT_COMPLETED' && todo.completed) return null;
            }
            return (
              <li key={todo.id}>
                <a href="#" style={{textDecoration: todo.completed ? 'line-through' : 'none'}} onClick={this._toggleTodo.bind(this, todo)}>
                  {todo.text}
                </a>
              </li>
            );
          })}
        </ul>

        <a href="#" onClick={this._onToggleFilter.bind(this, 'SHOW_ALL')}>All</a>,
        <a href="#" onClick={this._onToggleFilter.bind(this, 'SHOW_COMPLETED')}>Completed</a>,
        <a href="#" onClick={this._onToggleFilter.bind(this, 'SHOW_NOT_COMPLETED')}>Not completed</a>
      </div>
    );
  }
};
