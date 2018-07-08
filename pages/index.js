import React, { Component } from 'react';
import Layout from '../components/Layout';

class IndexPage extends Component {
  state = {
    user: null;
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      const user = event.target.value;
      this.setState({user});
    }
  }

}
