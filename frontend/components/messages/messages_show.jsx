import React from 'react';

class MessagesShow extends React.Component {

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
    this.props.getConversation(this.props.conversationId).then(
      () => this.setState({
        all_conversations: this.props.all_conversations,
        current_conversation: this.props.current_conversation,
        conversationId: this.props.conversationId,
        messageLogs: this.props.messageLogs,
        userId: this.props.userId,
        currentUser: this.props.currentUser
      })
    )
  }


  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        all_conversations: this.props.all_conversations,
        current_conversation: this.props.current_conversation,
        conversationId: this.props.conversationId,
        messageLogs: this.props.messageLogs,
        userId: this.props.userId,
        currentUser: this.props.currentUser
      })
    }
    let el = this.refs.scroll;
    el.scrollTop = el.scrollHeight;
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
      body: this.state.body, conversation_id: this.state.conversationId, user_id: this.state.userId
    });
    this.setState({ body: "" });
  }


  createSocket() {
    
    this.messages = App.cable.subscriptions.create({
      channel: 'MessagesChannel'
    }, {
      connected: () => { },
      received: (data) => {
        let messageLogs = this.state.messageLogs;
        messageLogs.push(data);
        this.setState({ messageLogs: messageLogs })
      },
      create: function (messageContent) {
        this.perform('create', 
          messageContent
        );
      }
    });
  }

  renderMessageLog() {
    if (this.state.messageLogs) {
     
      return this.state.messageLogs.map((el) => {
        let username;
        let photo;
        if (el.user_id === this.state.currentUser.id) {
          username = <span className="message-username own">{this.state.currentUser.username}</span>
          if (this.state.currentUser) {
            photo = <div className="message-photo"><img src={this.state.currentUser.photoUrl} /></div>
          }
          
        } else if (el.user_id === this.state.current_conversation.other_user.id) {
          username = <span className="message-username">{this.state.current_conversation.other_user.username}</span>
          photo = <div className="message-photo"><img src={this.state.current_conversation.other_user.photo_url} /></div>
        } else {
          username = <span className="message-username">{el.username}</span>
        }

        return (
          <li className="messages-show-message-item" key={`chat_${el.id}`}>
            { photo }
            { username }
            <div className='message-created-at'>
              <p>{el.created_at.slice(0, 10)}</p>
              <p>{el.created_at.slice(11, 16)}</p>
            </div>
            <div className="message-body">{el.body}</div>
          </li>
        );
      });
    }
  }


  render() {

    return (
      <div className='messages-show-main'>
        <ul id="messages-show-message-list" ref="scroll" className='messages-show-message-list'>
          {this.renderMessageLog()}
        </ul>

        <div className='messages-show-form'>
          <div className='messages-show-stage'>
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

export default MessagesShow;