class Api::PhotosController < ApplicationController 

  def destroy
    @photo = ActiveStorage::Attachment.find(params[:id])
    if current_user.profile.photos.include?(@photo)
      @photo.purge
    end
    @profile = current_user.profile
    render "/api/profiles/show"
  end

end 