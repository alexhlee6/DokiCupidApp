# json.extract! @match, :id, :user_id, :requested_user_id, :is_matched

json.set! @match.id do 
  json.id @match.id
  json.current_user_id current_user.id 
  json.other_user_id @user.id
  json.other_user do 
    json.id @user.id
    json.fname @user.profile.fname if @user.profile
    json.photo_url url_for(@user.photo) if @user.photo.attached?
  end
  json.is_matched @match.is_matched
end



  # if @match.user_id == current_user.id
  #   json.matched_user_id @match.requested_user_id
  # else
  #   json.matched_user_id @match.user_id
  # end