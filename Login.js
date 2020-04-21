import React, { Component } from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  bind = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Login = event => {
    event.preventDefault();
    let url = "http://localhost/lapangan/public/login";
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    axios.post(url, form)
      .then(response => {
        let logged = response.data.status;
        if (logged) {
          window.location = "/Home";
          this.setState({ message: "Login Berhasil!" });
          // saves token data to local storage
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("role", response.data.users.role);
          // saves user login data to local storage
          localStorage.setItem("id", JSON.stringify(response.data.users.id));
          // directs to data siswa page
          if(response.data.users.role === "admin"){
            window.location = "/Member";
          }else{
            window.location = "/home";
          }
          localStorage.setItem("id", JSON.stringify(response.data.users.id));
        } else {
          this.setState({ message: "Login Gagal" });
        }
        $("#message").toast("show");
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container" style={{ width: "40%" }}><br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="card my-2 shadow">
          <div className="card-header bg-dark">
            <center><h5 className="text-white">LOGIN</h5></center>
          </div>

          <div className="card-body">
            <Toast id="message" autohide="false" title="Informasi">
              {this.state.message}
            </Toast>
            <form onSubmit={this.Login}>
              <input
                type="text"
                className="form-control m-1 shadow"
                name="username"
                value={this.state.username}
                onChange={this.bind}
                required
                placeholder="Masukkan Username"
              />
              <input
                type="password"
                className="form-control m-1 shadow"
                name="password"
                value={this.state.password}
                onChange={this.bind}
                required
                placeholder="Masukkan password"
              /><br/>
              <center><button className="mt-2 btn btn-block btn-light shadow" style={{ width: "40%" }}type="submit">
                Login
              </button></center>
            </form>
          </div>
        </div>
       <center>Belum punya akun?&nbsp;<a href="/register" class="btn-" >Register</a></center>
      </div>
    );
  }
}

export default Login;
