import React from 'react';
import './App.css';
import TodoList from './TodoList.js';

// LIST CONTAINER
class Todo extends React.Component {
  constructor(props) {
    super(props);
    
    let today = new Date().toISOString().substring(0, 10);
    if('items' in this.props.userData) {
      this.state = {
        text: '',
        endDate: today,
        userData: this.props.userData,
        showAddItemForm: false
      };
    } else {
      this.state = {
        text: '',
        endDate: today,
        userData: {
          ...this.props.userData,
          items: []
        },
        showAddItemForm: false
      };
    }

    this.signals = {
      deleteItem: this.deleteItem,
      swapItem: this.swapItem
    };
  }

  changeText = (event) => {
    this.setState(prevState => ({
      ...prevState,
      text: event.target.value
    }));
  }

  changeEndDate = (event) => {
    this.setState(prevState => ({
      ...prevState,
      endDate: event.target.value
    }));
  }

  submitAddItemForm = (event) => {
    event.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      endDate: this.state.endDate
    };
    let newUserData = {
      ...this.state.userData,
      items: this.state.userData.items.concat(newItem)
    };
    this.props.saveUserData(newUserData);
    let today = new Date().toISOString().substring(0, 10);
    this.setState(prevState => ({
      ...prevState,
      text: '',
      endDate: today,
      userData: newUserData,
      showAddItemForm: false
    }));
  }

  deleteItem = (id) => {
    let newUserData = {
      ...this.state.userData,
      items: this.state.userData.items.filter(item => item.id !== id)
    };
    this.props.saveUserData(newUserData);
    this.setState(prevState => ({
      ...prevState,
      userData: newUserData
    }));
  }

  swapItem = (id1, id2) => {
    let newUserData = {
      ...this.state.userData,
      items: this.state.userData.items.map(item => {
        if(item.id === id1) {
          return this.state.userData.items.find(item => item.id === id2);
        } else if(item.id === id2) {
          return this.state.userData.items.find(item => item.id === id1);
        } else {
          return item;
        }
      })
    };
    this.props.saveUserData(newUserData);
    this.setState(prevState => ({
      ...prevState,
      userData: newUserData
    }));
  }

  toggleAddItemForm = () => {
    this.setState(prevState => ({
      ...prevState,
      showAddItemForm: !this.state.showAddItemForm
    }));
  }

  render() {
    // console.log(this.state);
    return (
      <div className='Todo'>
        <i>{this.state.userData.greeting} {this.state.userData.usertag}!</i>
        <h3 className='Todo-list-heading'>{this.state.userData.items.length + (this.state.userData.items.length === 1? ' task' : ' tasks')}</h3>
        <TodoList items={this.state.userData.items} signals={this.signals}/>
        <form onSubmit={this.submitAddItemForm} className={'add-item-form' + (this.state.showAddItemForm? '': ' hidden')}>
            <input
              id="add-item-text"
              className="add-item-input"
              placeholder='Add a task...'
              onChange={this.changeText}
              value={this.state.text}
            />
            <input
              className="add-item-input"
              type="date"
              onChange={this.changeEndDate}
              value={this.state.endDate}
            />
        </form>
        <button 
          className='add-item-btn'
          onClick={this.toggleAddItemForm}
        >{this.state.showAddItemForm? '-': '+'}</button>
      </div>
    );
  }
}

export default Todo;