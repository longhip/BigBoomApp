/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../components/App/App.css';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/todo';

const title = 'Todo List';

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: () => {
            dispatch(addTodo())
        },
    }
}

const TodoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo)

function Todo(props, context) {
    context.setTitle(title);
    return (
        <div className={s.root}>
            <div className={s.container}>
                <h1>{title}</h1>
                <p className={s.lead}></p>
                <button className="btn bg-slate-700 btn-block" onClick={() => props.addTodo()}>
                    Add todo
                </button>
                <ul>
                    {props.todos.map(todo => <li key={todo.id}> {todo.content} </li> )}
                </ul>
            </div>
        </div>
    );
}

Todo.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(TodoContainer);
