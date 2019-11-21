class Api::ConversationsController < ApplicationController

  def index
    @conversations = current_user.conversations
    @matched_users = current_user.matched_users
  end

  def show
    @conversation = Conversation.find(params[:id])
    if @conversation.sender_id == current_user.id 
      @other_user = User.find(@conversation.recipient_id)
    else 
      @other_user = User.find(@conversation.sender_id)
    end
    @messages = @conversation.messages
    # @message = Message.new
  end

  def create
    if Conversation.between(
        params[:conversation][:sender_id], params[:conversation][:recipient_id]
      ).present?
        @conversation = Conversation.between(params[:conversation][:sender_id],
        params[:conversation][:recipient_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end
    @other_user = User.find(params[:conversation][:recipient_id])
    render :show
    # redirect_to conversation_messages_path(@conversation)
  end

  private
  def conversation_params
    params.require(:conversation).permit(:sender_id, :recipient_id)
  end
end