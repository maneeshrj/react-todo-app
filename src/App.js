import logo from './logo.svg';
import React from 'react';
import Todo from './Todo';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-title">
            TODO
          </p>
        </header>
        
        <Todo userData={this.props.userData} saveUserData={this.props.saveUserData} />
      </div>
    );
  }
}

export default App;
