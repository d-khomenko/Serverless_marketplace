import React from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react"; //todo more castomization

class App extends React.Component {
  state = {};

  render() {
    return <div>App</div>;
  }
}

export default withAuthenticator(App);
