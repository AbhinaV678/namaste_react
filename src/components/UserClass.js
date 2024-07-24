import React from "react";
import { useState } from "react";

class UserClass extends React.Component {
  //recieving props in class based component
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "XYZ",
        bio: "test",
      },
    };
  }

  async componentDidMount() {
    const userInfo = await fetch("https://api.github.com/users/AbhinaV678");

    //not able to access object properties ? check if you have missed using await somewhere
    const json = await userInfo.json();

    this.setState({
      userInfo: json,
    });

    //console.log(json);
  }

  componentDidUpdate() {
    //console.log("did update");
  }

  componentWillUnmount() {
    //console.log("unmounted");
  }

  render() {
    const { name, bio, avatar_url } = this.state.userInfo;

    return (
      <div className="user-card">
        <img src={avatar_url}></img>
        <h2>{name}</h2>
        <h3>{bio}</h3>
        <h4>Contact : devKr1984@gmail.com</h4>
      </div>
    );
  }
}

export default UserClass;
