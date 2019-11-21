export const getConversations = () => {
  return $.ajax({
    method: "GET",
    url: "/api/conversations"
  })
}

export const getConversation = (conversationId) => {
  return $.ajax({
    method: "GET",
    url: `/api/conversations/${conversationId}`
  })
}

export const postConversation = (conversation) => {
  return $.ajax({
    method: "POST",
    url: `/api/conversations`,
    data: { conversation }
  })
}