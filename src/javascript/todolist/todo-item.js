import React from 'react';
var underscore = require('underscore');

export default class TodoItem extends React.Component {

    deleteItem(key) {
        this.props.deleteItem(key);
    }

    render() {
        let listData = this.props.listData;
        return (
            <div>
                <ul className="todoList">
                    {underscore.map(listData, (list, key) => {
                        return (
                            <li key={key} className="clearFloat">
                                <p className="floatLeft">Task::{list.userInput}</p>
                                <a className="btn redButton floatRight" onClick={this.deleteItem.bind(this, key)}>delete</a>
                            </li>
                        )
                      }
                      )
                    }
                </ul>
            </div>
        );
    }
}

TodoItem.defaultProps = {
    listData: [],
};
