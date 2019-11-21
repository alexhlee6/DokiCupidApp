class MessagesChannel < ApplicationCable::Channel  
  def subscribed
    stream_for 'messages_channel' #stream_for ?
  end

  def create(data) 
    message = Message.create(body: data["body"], user_id: data["user_id"], conversation_id: data["conversation_id"])
    print message
    socket = { 
      id: message.id, 
      conversation_id: message.conversation_id, 
      body: message.body, 
      user_id: message.user_id, 
      read: message.read, 
      created_at: message.created_at 
    }
    MessagesChannel.broadcast_to("messages_channel", socket)
  end
end  

#  ***