import React from 'react';
import './App.css';
import TodoListItem from './TodoListItem.js';

// LIST
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemForSwap: null,
      selected: [],
      selectSwap: this.selectSwap,
      selectItem: this.selectItem
    };
  }

  selectSwap = (id) => {
    if(this.state.itemForSwap !== null) {
      let id1 = this.state.itemForSwap;
      // console.log('swapping')
      this.setState(prevState => ({
        ...prevState,
        itemForSwap: null
      }));
      this.props.signals.swapItem(id1, id);
    } else {
      this.setState(prevState => ({
        ...prevState,
        itemForSwap: id
      }));
    }
  }

  selectItem = (id) => {
    if(this.state.selected.includes(id)) {
      this.setState(prevState => ({
        ...prevState,
        selected: this.state.selected.filter(item => item !== id)
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        selected: this.state.selected.concat(id)
      }));
    }
  }
  
  render() {
    return (
      <ul className='Todo-list'>
        {this.props.items.map(item => (
          <TodoListItem item={item} signals={this.props.signals} listState={this.state} />
        ))}
      </ul>
    );
  }
}

export default TodoList;