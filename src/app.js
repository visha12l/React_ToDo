import React from 'react';
import ReactDOM from 'react-dom';
import './css/custom.css';
import Header from './javascript/components/header.js';
import TodoIndex from './javascript/containers/todo-index.js';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            stateName: '',
        };
    }

    getSubComponent (componentName) {
        switch (componentName) {
            case 'todoIndex':
                return (
                    <div>
                        <Header headerText="To Do App" />
                        <TodoIndex />
                    </div>
                );
        }
    }

    getChoice(name) {
        this.setState({
            stateName: name
        })
    }

    render() {
        return (
            <div className="App">
                <ul className="stickyLeftlist">
                    <li><a onClick={this.getChoice.bind(this, 'todoIndex')}>TO do App</a></li>
                </ul>
                <div>{this.getSubComponent(this.state.stateName)}</div>
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
