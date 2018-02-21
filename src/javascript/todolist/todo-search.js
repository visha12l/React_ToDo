import React from 'react';
var underscore = require('underscore');

export default class TodoSearch extends React.Component {
    constructor(props) {
       super();
       this.state = {
           searchStatus: ''  
       };
       this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            searchStatus: true
        })
        this.props.searchItem(this.refs.searchText.value);
    }

    getSearchList() {
        let searchData = this.props.searchList;
        let defaultTemplate = <p>no result.</p>
        if(searchData.length) {
            defaultTemplate = underscore.map(searchData, (task, key) => {
                return (
                    <p key={key}>task::{task.userInput}</p>
                )}
            );
        }
        return defaultTemplate;
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text"
                        placeholder="search task"
                        ref="searchText"
                        onChange={this.handleInputChange}
                    />
                </div>
                {this.state.searchStatus && this.getSearchList()}
            </div>
        );
  }
}
