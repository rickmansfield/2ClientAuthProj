import React from "react";
import { axiosWithAuth }  from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "lambda",
      password: "school",
    },
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentails,
        [e.target.name]: e.target.value,
      },
    });
    console.log('handleChange gives me:', this.state.credentials);//notice notice notice notice
  };

  //old method. 
  // login = e => {
  //   e.preventDefault();
  //   axiosWithAuth.post('http://localhost:5000/api/login', this.state.credentials)
  //   .then(resp=>{
  //     console.log(res);
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // };


  login = (e) => {
    e.preventDefault();
    console.log("Login Fired!! ");
    // 1. use axios to make post request
    console.log('Credentials are:', this.state);//NOTICE THIS .........
    axiosWithAuth()
      .post("/login", this.state.credentials)
      // 2. if request is successful, log token
      .then((res) => {
        console.log("Login Res.data.token", res.data.payload);
        localStorage.setItem("token", res.data.payload);
        console.log("this.props", this.props);
        this.props.history.push("/protected");
      })
      // 3. if request is error, log error
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;