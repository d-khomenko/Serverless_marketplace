import React from "react";
import { Auth, Hub } from "aws-amplify";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Authenticator, AmplifyTheme } from "aws-amplify-react"; //todo more castomization
import "./App.css";

class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    //console.dir(AmplifyTheme); //*all prop
    this.getUserData();
    Hub.listen("auth", this, "onHubCapsule");
  }
  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? this.setState({ user }) : this.setState({ user: null });
  };
  onHubCapsule = (capsule) => {
    //thx aws hub
    switch (capsule.payload.event) {
      case "SignIn":
        console.log("signed in");
        this.getUserData();
        break;
      case "SignUp":
        console.log("signed up");
        break;
      case "SignOut":
        console.log("signed out");
        this.setState({ user: null });
        break;
      default:
        return;
    }
  };

  render() {
    const { user } = this.state;
    return !user ? <Authenticator theme={theme} /> : <div>App</div>;
  }
}
const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--amazonOrange)",
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)",
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px",
  },
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0cb",
  },
};

//export default withAuthenticator(App, true, [], null, theme); //!second -> {includeGreetings: true},
export default App;
