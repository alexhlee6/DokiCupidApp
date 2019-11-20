class Api::MessagesController < ApplicationController

  before_action do
   @conversation = Conversation.find(params[:message][:conversation_id])
  end

  def index
    @messages = @conversation.messages
    
    if @messages.last
      if @messages.last.user_id != current_user.id
        @messages.last.read = true;
      end
    end

    render :index
  end

  # def new 
  #   @message = @conversation.messages.new
  # end 

  def create
    @message = Message.new(message_params)
    @message.user = current_user
    @message.conversation_id = params[:message][:conversation_id].to_i
    if @message.save
      render :show
    else 
      render json: @message.errors.full_messages, status: 422
      # ActionCable.server.broadcast 'messages',
      #   message: message.body,
      #   user: message.user.username
      # head :ok
    end

  end

  private
  def message_params
    params.require(:message).permit(:user_id, :conversation_id, :body)
  end
end