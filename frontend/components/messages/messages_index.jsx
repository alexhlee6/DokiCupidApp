import React from 'react';
import { Link, Route } from 'react-router-dom';
import MessagesShowContainer from './messages_show_container';

class MessagesIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversations: {}
    }
  }

  componentDidMount() {
    this.props.getConversations();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        all_conversations: this.props.all_conversations, 
        matched_users: this.props.matched_users,
        current_user: this.props.current_user,
        current_conversation: this.props.current_conversation
      });
    }
  }

  handleCreateConversation(otherUserId) {
    this.props.createConversation({
      sender_id: this.props.current_user.id,
      recipient_id: otherUserId
    }).then(() => {
      this.setState({
        all_conversations: this.props.all_conversations,
        matched_users: this.props.matched_users,
        current_user: this.props.current_user,
        current_conversation: this.props.current_conversation
      });
      this.props.history.push(`/messages/${this.props.current_conversation.id}`);
    })
  }

  render() {

    let conversationItems;

    let conversationsArray;

    if (this.state.all_conversations) {
      conversationsArray = Object.values(this.state.all_conversations);

      conversationItems = conversationsArray.map((convo, i) => {

        let otherUserId;
        if (convo.recipient_id === this.state.current_user.id) {
          otherUserId = convo.sender_id;
        } else {
          otherUserId = convo.recipient_id;
        }

        // let currentConversation;
        if (this.state.current_conversation) {
          if (Object.values(this.state.current_conversation).length > 0) {
            if (this.props.location.pathname !== "/messages" && this.state.current_conversation.other_user.id === otherUserId) {
              return (
                <li className="conversation-item  selected-conversation" key={i}>
                  <div className="conversation-item-recipient-main">
                    <Link to={`/messages/${convo.id}`} className="conversation-item-message-user-button">
                      <p className="conversation-item-username">
                        {this.state.matched_users[otherUserId].username}
                      </p>
                    </Link>
                  </div>
                </li>
              )
            }
            
          }
        }
      
        return (
          <li className="conversation-item" key={i}>
            <div className="conversation-item-recipient-main">
              <div onClick={() => {
                this.props.getConversation(convo.id).then(() => {
                  this.props.history.push(`/messages/${convo.id}`);
                })
                  
                }}
                
              className="conversation-item-message-user-button">

                <p className="conversation-item-username">
                  {this.state.matched_users[otherUserId].username}
                </p>

              </div>
            </div>
          </li>
        )
      })
    }

    let matchedUsersItems;

    if (this.state.matched_users) {
      matchedUsersItems = Object.values(this.state.matched_users).map(user => {

        if (conversationsArray) {
          for (let i = 0; i < conversationsArray.length; i++) {
            if (
                conversationsArray[i].sender_id === user.id || 
                conversationsArray[i].recipient_id === user.id
            ) {
              return;
            }
          }
        }

        return (
          <li className="conversation-item" key={user.id}>
            <div 
              className="conversation-item-username" 
              onClick={() => this.handleCreateConversation(user.id)}>
              {user.username}
            </div>
          </li>
        )
      })
    }


    let currentConvo;

      if (this.props.match.isExact) {
        currentConvo = (
          <div className="no-convo-selected">
            No message selected
          </div>
        )
      }  else {
        currentConvo = "";
      }
     
      
    
    return (
      <div className="messages-main">
        <div className="page-header">
          <h1 className="page-title">Messages</h1>
        </div>


        <div className="messages-index-main">

          <div className="messages-index-sidebar">
            <div className="messages-index-sidebar-section conversations">
              <h1 className="messages-index-sidebar-title">Conversations</h1>
              <ul className="messages-index-conversations-list">
                { conversationItems }
              </ul>
            </div>

            <div className="messages-index-sidebar-section">
              <h1 className="messages-index-sidebar-title">Matches</h1>
              <ul className="messages-index-matched-users-list">
                { matchedUsersItems }
              </ul>
            </div>
          </div>

          
          <div className="messages-index-selected-conversation">
            <Route exact path="/messages/:conversationId" component={MessagesShowContainer} />
            {currentConvo}
          </div>
        </div>
      </div>
    )
  }
}

export default MessagesIndex;