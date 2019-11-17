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

  def update
    @profile = Profile.find(params[:id])
    new_params = profile_params.dup
    new_params[:user_id] = new_params[:user_id].to_i
    new_params[:zipcode] = new_params[:zipcode].to_i
    if @profile.update(new_params)
      render :show
    else  
      render json: @profile.errors.full_messages, status: 422
    end
  end

  def destroy 
    @profile = Profile.find(params[:id])
    @profile_id = @profile.id.dup
    @user = @profile.user
    if @profile.user.id == current_user.id 
      @profile.destroy 
      render :destroy
    end
  end


  def profile_params
    print params
    params.require(:profile).permit(
      :user_id, :fname, :zipcode, :bio, :identify_as, :looking_for, :compatibility_answers, photos: []
    )
  end
end 