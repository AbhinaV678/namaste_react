import User from "./User";
import UserClass from "./UserClass";

import { Component } from "react";

import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>About</h1>
        <div>
          Logged In User
          {/* {How to use useContext in a class based component} */}
          <UserContext.Consumer>
            {({ LoggedInUser }) => <h1>{LoggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        <h2>Welcome to our app!</h2>

        <UserClass name={"A.K Deb"} location={"Kolkata"} />
      </div>
    );
  }
}

export default About;
