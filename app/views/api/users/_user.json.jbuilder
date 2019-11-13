json.extract! @user, :username, :id

json.photoUrl url_for(@user.photo) if @user.photo.attached?
