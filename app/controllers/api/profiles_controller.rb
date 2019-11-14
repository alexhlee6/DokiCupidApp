class Api::ProfilesController < ApplicationController

  def index 
    @profiles = Profile.all

    render :index
  end 

  def show 
    @profile = Profile.find(params[:id])

    if @profile 
      render :show
    else 
      render json: { message: "User does not exist" }
    end 
  end 

  def create 
    @profile = Profile.new(profile_params)
    @profile.user_id = @profile.user_id.to_i
    @profile.zipcode = @profile.zipcode.to_i
    if @profile.save 
      render :show
    else  
      render json: @profile.errors.full_messages, status: 422
    end
  end


  def profile_params
    params.require(:profile).permit(
      :user_id, :fname, :zipcode, :bio, :identify_as, :looking_for, :compatibility_answers, photos: []
    )
  end
end 