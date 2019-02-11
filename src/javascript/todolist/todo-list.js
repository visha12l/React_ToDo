import React from 'react';
import TodoItem from './todo-item';
import TodoSearch from './todo-search';
import '../../css/todolist.css';
import underscore from 'underscore';

export default class TodoList extends React.Component {
    constructor() {
        super();
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.state = {
            oldList: [],
            searchList: [],
            addbuttonStatus: false,
            requestErrorMsg: false
        };
    }

    handleInputChange(refName) {
        let userInput= this.refs[refName].value;
        this.setState({
            addbuttonStatus: !!userInput,
        });
        this.validateForm(refName);
    }

    validateForm(refName) {
        var inputValue = this.refs[refName].value;;
        if(/[^a-zA-Z0-9\-\/]/.test(inputValue)) {
            alert("you cannot add special characters to note");
            return false;
        }
        return true;
    }

    addItem(event) {
        event.preventDefault();
        let noteText = this.refs.input.value.toLowerCase() // user input value
        let duplicateEntry = underscore.contains(underscore.pluck(this.state.oldList, 'userInput') , noteText); //check for duplicate value
        if(noteText && !duplicateEntry) {
            this.setState({
                oldList: [...this.state.oldList, {userInput:noteText}],
                requestErrorMsg: false,
            });
        } else {
            this.setState({
                requestErrorMsg: true,
            });
        }
          this.refs.input.value="";
    }

    deleteItem(deleteItemId) {
        this.setState({
            oldList: underscore.filter(this.state.oldList, (name, key) => deleteItemId !== key )
        });
    }

    handleInputFocus(refName) {
        this.refs[refName].classList.remove("hide");
    }

    handleInputBlur(refName) {
        this.refs[refName].classList.add("hide");
    }

    searchItem(value) {
        var result = underscore.filter(this.state.oldList, (task, key) => {
            return (task.userInput.toLowerCase().search(value.toLowerCase()) > -1); // return value if its in the list
        });
        if(result) {
            this.setState({
                searchList: result
            });
        }
    }

    render() {
        let { oldList } = this.state;
        return (
            <div className="container">
                <form className="todoListForm" onSubmit={this.addItem}>
                    <h3>{oldList.length} task to show </h3>
                    <div className="clearFloat">
                        <div className="floatLeft">
                            <div className="clearFloat">
                                <div className="userData floatLeft">
                                    <input placeholder="Enter Item"
                                        ref="input"
                                        onChange={this.handleInputChange.bind(this,"input")}
                                        onFocus={this.handleInputFocus.bind(this, "floatingLabel")}
                                        onBlur={this.handleInputBlur.bind(this, "floatingLabel")}
                                    />
                                    <span className="floatingLabel hide" ref="floatingLabel">Enter Item</span>
                                </div>
                                <div className="submitWrapper floatLeft">
                                    {this.state.addbuttonStatus &&
                                        <button type="submit" className="btn blueButton">add</button>
                                    }
                                </div>
                            </div>
                            <TodoItem listData={oldList} deleteItem={this.deleteItem}/>
                        </div>
                        {oldList &&
                            <div className="floatRight">
                                <TodoSearch searchItem={this.searchItem} searchList={this.state.searchList}/>
                            </div>
                        }
                    </div>
                </form>
            </div>
        );
    }
}
