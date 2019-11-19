
json.extract! @profile, :id, :fname, :user_id, :zipcode, :bio, :looking_for, :identify_as, :compatibility_answers

json.photo_urls @profile.photos do |photo|
  json.photo_id photo.id
  json.filename photo.filename
  json.url url_for(photo)
end 

# json.matches do 
#   json.matched_user_ids @user.matched_user_ids if @user.matches
#   json.pending_match_user_ids @user.pending_match_user_ids if @user.matches
# end 


# json.matched_user_ids