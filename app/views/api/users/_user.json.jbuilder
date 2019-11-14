json.extract! @user, :username, :id

json.photoUrl url_for(@user.photo) if @user.photo.attached?

if @user.profile
  json.profileId @user.profile.id
else 
  json.profileId ""
end 