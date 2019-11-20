import React from 'react';

class Message extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: '',
      messageLogs: []
    };
    this.updateCurrentMessage = this.updateCurrentMessage.bind(this);
    this.handleSendEvent = this.handleSendEvent.bind(this);
    this.handleMessageInputKeyPress = this.handleMessageInputKeyPress.bind(this);
  }

  componentDidMount() {
    this.createSocket();
  }

  updateCurrentMessage(e) {
    this.setState({
      body: e.currentTarget.value
    });
  }

  handleMessageInputKeyPress(e) {
    if (event.key === 'Enter') {
      this.handleSendEvent(e);
    }
  }

  handleSendEvent(e) {
    e.preventDefault();
    this.messages.create({
      body: this.state.body, conversation_id: this.state.conversation_id, user_id: this.state.user_id
    });
    this.setState({body: "" });
  }


  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3000/cable');
    this.messages = cable.subscriptions.create({
      channel: 'MessagesChannel'
    }, {
      connected: () => { },
      received: (data) => {
        console.log(data);
        let messageLogs = this.state.messageLogs;
        messageLogs.push(data);
        this.setState({ messageLogs: messageLogs })
      },
      create: function (messageContent) {
        this.perform('create', {
          data: messageContent
        });
      }
    });
  }

  renderMessageLog() {
    return this.state.messageLogs.map((el) => {
      return (
        <li key={`chat_${el.id}`}>
          <span className='chat-message'>{el.body}</span>
          <span className='chat-created-at'>{el.created_at}</span>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='message-main'>
        <ul className='message-logs'>
          {this.renderMessageLog()}
        </ul>

        <div className='message-form'>
          <div className='message-stage'>
            <h1>Message</h1>
            <div className='chat-logs'>
            </div>
            <input
              onKeyPress={this.handleMessageInputKeyPress}
              value={this.state.body}
              onChange={this.updateCurrentMessage}
              type='text'
              placeholder='Enter your message...'
              className='chat-input' />
            <button
              onClick={this.handleSendEvent}
              className='send'>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;