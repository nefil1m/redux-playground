import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

import {todos}            from '../reducers/todos.js';
import {todo}             from '../reducers/todo.js';
import {visibilityFilter} from '../reducers/visibilityFilter.js';

import {Todo} from './Todo.jsx';

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export let store = createStore(todoApp);

let div = document.createElement('div');
document.body.appendChild(div);

const render = () => {
  ReactDOM.render(
    <div>
      <Todo />
    </div>
  , div);
};

store.subscribe(render);
render();
