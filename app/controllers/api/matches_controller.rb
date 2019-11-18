class Api::MatchesController < ApplicationController

  def index  # :request_type => "getReceivedMatchRequests" or "getSentMatchRequests" or "getMatchedUsers" 
    if match_params[:request_type] == "getReceivedMatchRequests" 
      @matches = current_user.received_match_requests
    elsif match_params[:request_type] == "getMatchedUsers"
      @matches = current_user.matches
      @matched_users = current_user.matched_users
    elsif match_params[:request_type] == "getSentMatchRequests"
      @matches = current_user.requested_matches
    end
    
    render :index
  end

  
  def show # get one match
    @match = Match.find(params[:id])
    render :show
  end


  def create
    user_id = match_params[:user_id].to_i
    requested_user_id = match_params[:requested_user_id].to_i
    @match = Match.find_by_user_id_and_requested_user_id(requested_user_id, user_id)

    if @match.present?
      @match.is_matched = true 
      @match.save
      render :show
    else 
      @match = Match.new(user_id: match_params[:user_id], requested_user_id: match_params[:requested_user_id])
      if @match.save
        render :show
      else 
        render json: @match.errors.full_messages, status: 422
      end
    end
  end


  def destroy
    @match = Match.find(params[:id])
    if current_user.id == @match.user_id || current_user.id == @match.requested_user_id
      @match.destroy
      @matches = Match.where("user_id = ? AND matched = ?", current_user.id, true).or(
        Match.where("requested_user_id = ? AND matched = ?", current_user.id, true))
      render :index 
    end
  end


  def match_params  # i want :request_type to be "getMatchRequests" or "getMatchedUsers" for index
    params.require(:match).permit(:user_id, :requested_user_id, :is_matched, :request_type) 
  end 

end