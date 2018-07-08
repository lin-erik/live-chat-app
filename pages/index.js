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

  render() {
    const {user} = this.state;

    const nameInput = {
      background: 'transparent',
      color: '#999',
      border: 0,
      border-bottom: '1px solid #666',
      border-radius: 0,
      font-size: '3rem',
      font-weight: 500,
      box-shadow: 'none !important'
    };

  }
}
