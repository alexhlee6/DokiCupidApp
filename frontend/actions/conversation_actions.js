import * as ConversationApiUtil from '../util/conversation_util';


export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION";
// export const REMOVE_CONVERSATION = "REMOVE_CONVERSATION";


const receiveConversations = (conversations) => ({
  type: RECEIVE_CONVERSATIONS,
  conversations
})

const receiveConversation = (conversation) => {
  return {
    type: RECEIVE_CONVERSATION,
    conversation
  }
}

// const removeConversation = (conversationId) => ({
//   type: REMOVE_CONVERSATION,
//   conversationId
// })



export const getConversations = () => dispatch => {
  return ConversationApiUtil.getConversations().then(conversations => dispatch(receiveConversations(conversations)))
}

export const getConversation = (conversationId) => dispatch => {
  return ConversationApiUtil.getConversation(conversationId).then(conversation => dispatch(receiveConversation(conversation)))
}

export const createConversation = (conversation) => dispatch => {
  return ConversationApiUtil.postConversation(conversation).then(conversation => dispatch(receiveConversation(conversation)))
}
