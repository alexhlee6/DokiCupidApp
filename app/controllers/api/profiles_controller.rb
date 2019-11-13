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



  def profile_params
    params.require(:profile).permit(
      :fname, :zipcode, :bio, :identify_as, :looking_for, :compatibility_answers
    )
  end
end 