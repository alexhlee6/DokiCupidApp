import { connect } from 'react-redux';
import MessageShow from './messages_show';
import { getConversations, getConversation, createConversation } from '../../actions/conversation_actions'


const mSTP = (state, ownProps) => {
  let conversationId = parseInt(ownProps.match.params.conversationId);
  let messages = [];

  let currentUser = state.entities.users[state.session.id];

  if (state.entities.conversations["current_conversation"]) {
    messages = state.entities.conversations["current_conversation"].messages
  }
  

  let current_conversation = state.entities.conversations["current_conversation"];

  return {
    all_conversations: state.entities.conversations.conversations,
    current_conversation: current_conversation,
    conversationId,
    userId: state.session.id,
    messageLogs: messages,
    currentUser
  }
}

const mDTP = (dispatch) => {
  return {
    getConversations: () => dispatch(getConversations()),
    getConversation: (conversationId) => dispatch(getConversation(conversationId))
  } 
}

export default connect(mSTP, mDTP)(MessageShow);