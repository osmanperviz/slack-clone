import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

class App extends Component {
  componentDidMount() {
    // This doesn't refer to the `span`s! It refers to the children between
    // last line's `<App></App>`, which are undefined.
    console.log(this.props.children);
  }
  render() {
    return (
      <MuiThemeProvider>
        { this.props.children }
      </MuiThemeProvider>
    )
  }
}

export default App;
