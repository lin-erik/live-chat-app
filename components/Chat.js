import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Chat extends Component {
  state = {
    chats: []
  }

  componentDidMount() {
    this.pusher = new Pusher({
      appID: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
      encrypted: true
    });

    this.channel = this.pusher.subscribe('chat-room');

    this.channel.bind('new-message', ( {chat = null} ) => {
      const {chats} = this.state;
      chat && chats.push(chat);
      this.setState({chats});
    });

  this.pusher.connection.bind('connected', () => {
      axios.post('/messages')
           .then(response => {
             const chats = response.data.messages;
             this.setState({chats});
           });
    });
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

  handleKeyUp = (event) => {
    const value = event.target.value;

    if (event.keyCode === 13 && !event.shiftKey) {
      const {activeUser: user} = this.props;
      const chat = {user, message: value, timestamp: +new Date};

      event.target.value = '';
      axios.post('/message', chat);
    }
  }

  render() {
    return (
      this.props.activeUser && <Fragment>

      <div className='border-bottom border-gray w-100 d-flex align-items-center bg-white' style={ {height: 90} }>
        <h2 className='text-dark mb-0 mx-4 px-2'>{this.props.activeUser}</h2>
      </div>

      <div className='border-top border-gray w-100 px-4 d-flex align-items-center bg-light' style={ {minHeight:90} }>
        <textarea className='form-control px-3 py-2' onKeyUp={this.handleKeyUp} placeholder='Enter a message here' style={ {resize: 'none'}}></textarea>
      </div>

      </Fragment>
    )
  }
}

export default Chat;
