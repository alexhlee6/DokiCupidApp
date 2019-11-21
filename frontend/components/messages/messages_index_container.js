import { connect } from 'react-redux';
import { getConversations, getConversation, createConversation } from '../../actions/conversation_actions'
import MessagesIndex from './messages_index';

const mSTP = (state) => {

  let current_conversation = {};
  if ( state.entities.conversations ) {
    if (state.entities.conversations["current_conversation"] )
    current_conversation = state.entities.conversations["current_conversation"];
  }

  return {
    all_conversations: state.entities.conversations.conversations,
    matched_users: state.entities.conversations.matched_users,
    current_user: state.entities.users[state.session.id],
    current_conversation
  }
}

const mDTP = (dispatch) => {
  return {
    getConversations: () => dispatch(getConversations()),
    getConversation: (conversationId) => dispatch(getConversation(conversationId)),
    createConversation: (conversation) => dispatch(createConversation(conversation))
  }
}

export default connect(mSTP, mDTP)(MessagesIndex);