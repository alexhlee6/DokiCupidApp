import { RECEIVE_CONVERSATIONS, RECEIVE_CONVERSATION, REMOVE_CONVERSATION } from '../actions/conversation_actions';

const conversationsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      if (state["current_conversation"]) {
        return Object.assign({}, state, action.conversations);
      }
      return action.conversations;
    case RECEIVE_CONVERSATION:
      let withConvo = Object.assign({}, state);
      withConvo["current_conversation"] = action.conversation;
      if (state["conversations"]) {
        withConvo["conversations"][action.conversation.id] = {
          id: action.conversation.id,  
          recipient_id: action.conversation.other_user.id,
          sender_id: action.conversation.current_user.id
        };
      }
      return withConvo;
    case REMOVE_CONVERSATION:
      let removedConvoState = Object.assign({}, state);
      delete removedConvoState[action.conversationId];
      return removedConvoState;
    default:
      return state;
  }
}

export default conversationsReducer;