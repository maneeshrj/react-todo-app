import React from 'react';
import './App.css';

// LIST ITEM
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  selectItem = (event) => {
    event.preventDefault();
    this.props.listState.selectItem(this.props.item.id);
    // console.log(this.state.selected);
  }

  swapItem = (event) => {
    event.preventDefault();
    this.props.listState.selectSwap(this.props.item.id);
    // console.log(this.state.swap);
  }

  deleteItem = (event) => {
    event.preventDefault();
    this.props.signals.deleteItem(this.props.item.id);
  }

  render() {
    let selected = this.props.listState.selected.includes(this.props.item.id);
    let swapSelected = (this.props.listState.itemForSwap !== null && this.props.listState.itemForSwap === this.props.item.id);
    let endDate = (new Date(this.props.item.endDate + ' CST'));
    let past = endDate < new Date();
    let current = endDate.toDateString() === (new Date()).toDateString();
    return (
      <li key={this.props.item.id} 
        className={
          "Todo-list-item" + (selected ? " Todo-list-item-selected" : "") 
          + (swapSelected ? "" : " fade-in") 
          + (past ? " Todo-list-item-past" : "")
          + (current ? " Todo-list-item-current" : "")
        }
      >
        <div className='Todo-list-item-text'>
          <a 
            className={(selected ? 'fa-circle-check '  : 'fa-circle ') + 'fa-regular item-btn item-btn-green'}
            onClick={this.selectItem}
          ></a>
          {this.props.item.text}
        </div>
        <div className='Todo-list-item-btns'>
          <i className='Todo-list-item-date'>
            {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric",})}
          </i>
          <a 
            className={(swapSelected ? 'swap-btn-selected '  : '') +'fa-shuffle fa-solid item-btn item-btn-blue'}
            onClick={this.swapItem}
          ></a>
          <a 
            className='fa-solid fa-trash item-btn item-btn-red'
            onClick={this.deleteItem}
          ></a>
        </div>
      </li>
    );
  }
}

export default TodoListItem;