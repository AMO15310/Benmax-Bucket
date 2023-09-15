import "./signup.scss";

import React, { Component } from "react";

import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

class Inputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirm: "",
      blur1: false,
      blur2: false,
      blur3: false,
      blur4: false,
      signed: "",
      error: false,
      mess: "Account succesfully created log in to continue!",
      mess2: "",
    };
  }
  blurEffect1 = () => {
    this.setState({
      blur1: true,
    });
  };
  blurEffect2 = () => {
    this.setState({
      blur2: true,
    });
  };
  blurEffect3 = () => {
    this.setState({
      blur3: true,
    });
  };
  blurEffect4 = () => {
    this.setState({
      blur4: true,
    });
  };
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handlePassChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleConfChange = (event) => {
    this.setState({
      confirm: event.target.value,
    });
  };
  handleForm = (event) => {
    event.preventDefault();
    if (
      !this.state.name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.confirm
    ) {
      return false;
    }
    if (this.state.password !== this.state.confirm) {
      return false;
    }
    const details = {
      userName: this.state.name,
      userEmail: this.state.email,
      userPassword: this.state.password,
      userConfirmationPass: this.state.confirm,
    };
    createUserWithEmailAndPassword(
      auth,
      details.userEmail,
      details.userPassword
    )
      .then((userCredential) => {
        const user = userCredential.user;
        this.setState({
          signed: user,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        this.setState({
          error: true,
          mess2: errorMessage,
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, 4000);
      });
  };
  errorMess1 = `Name should be (3-16) and not include a special character`;
  errorMess2 = `Email should be valid`;
  errorMess3 = `Password should not be less than 6 and include atleast 1 number`;
  errorMess4 = `Passwords must be same`;
  render() {
    return (
      <div className="sign">
        <form onSubmit={(event) => this.handleForm(event)}>
          <div className="container">
            <div className="messages">
              <p className="mess signed">
                {this.state.signed && this.state.mess}
              </p>
              <p className="mess error">
                {this.state.error && this.state.mess2}
              </p>
            </div>
            <p className="title">Sign up</p>
            <label>name</label>
            <input
              type="name"
              className="nameinp"
              value={this.state.name}
              onChange={this.handleNameChange}
              onBlur={this.blurEffect1}
              focused={this.state.blur1.toString()}
              placeholder="Name"
              pattern="^[A-Za-z0-9]{3,16}$"
              required
            ></input>
            <span className="namespan">{this.errorMess1}</span>
            <label>email</label>

            <input
              type="email"
              className="email"
              value={this.state.email}
              placeholder="...@forexample.com"
              onChange={this.handleEmailChange}
              onBlur={this.blurEffect2}
              focused={this.state.blur2.toString()}
              required
            ></input>
            <span className="emailspan">{this.errorMess2}</span>
            <label>password</label>

            <input
              type="password"
              className="pass"
              value={this.state.password}
              onChange={this.handlePassChange}
              onBlur={this.blurEffect3}
              focused={this.state.blur3.toString()}
              required
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              placeholder="password"
            ></input>
            <span className="passwordspan">{this.errorMess3}</span>
            <label>confirm password</label>

            <input
              type="password"
              className="confpass"
              value={this.state.confirm}
              onChange={this.handleConfChange}
              onBlur={this.blurEffect4}
              placeholder="confirm password"
              pattern={this.state.password}
              onFocus={this.blurEffect4}
              focused={this.state.blur4.toString()}
              required
            ></input>
            <span className="confspan">{this.errorMess4}</span>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={(event) => this.handleForm(event)}
            >
              Submit
            </button>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <p className="haveone">
                Already have an account ? <span className="sign">Sign up</span>{" "}
              </p>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default Inputs;
