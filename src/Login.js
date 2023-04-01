import logo from './logo.svg';
import React from 'react';
import './Login.css';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    setUsername = (event) => {
        this.setState({username: event.target.value});
        // console.log(this.state.username);
        event.preventDefault();
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
        // console.log(this.state.password);
        event.preventDefault();
    }

    handleSubmit = (event) => {
        console.log("username:", this.state.username);
        console.log("password:", this.state.password);
        this.props.submitLogin(this.state.username, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
        <div className="Login">
            <header className="Login-header">
                <img src={logo} className="Login-logo" alt="logo" />
                <form className="Login-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.username} onChange={this.setUsername}/>
                    <input type="password" value={this.state.password} onChange={this.setPassword} />
                    <input type="submit" value="Login"></input>
                    <p className="Login-error">{this.props.loginError}</p>
                </form>
            </header>
        </div>
        );
    }
}

export default Login;
