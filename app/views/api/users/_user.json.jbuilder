json.extract! @user, :username, :id

json.photoUrl url_for(@user.photo) if @user.photo.attached?

if @user.profile
  json.profileId @user.profile.id
else 
  json.profileId ""
end 

if @user.profile 
  json.zipcode @user.profile.zipcode
else 
  json.zipcode ""
end 

json.matches do 
  json.matched_user_ids @user.matched_user_ids if @user.matches
  json.pending_match_user_ids @user.pending_match_user_ids if @user.matches
end 