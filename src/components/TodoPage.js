import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './Todos';
import AddTodo from './AddTodo';
import axios from 'axios';


class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('http://localhost:3000/json-placeholder/todos?_limit=10')
    .then(res => this.setState({ todos: res.data }))
  }

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }

  delTodo = (id) => {
    axios.delete(`http://localhost:3000/json-placeholder/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  }

  addTodo = (title) => {
    axios.post('http://localhost:3000/json-placeholder/todos', {
      title,
      completed: false
    }).then(res =>
      this.setState({ todos: [...this.state.todos, res.data] }));
  }

  render() {
    return (
      <section>
        <Router>
          <div className="App">
            <div className="container">
              <Route
                exact
                path="/todo"
                render={(props) => (
                  <>
                    <AddTodo addTodo={this.addTodo} />
                    <Todos
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </Router>
      </section>
    );
  }
}

export default App;

