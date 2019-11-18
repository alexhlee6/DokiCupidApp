
json.extract! @profile, :id, :fname, :user_id, :zipcode, :bio, :looking_for, :identify_as, :compatibility_answers

json.photo_urls @profile.photos do |photo|
  json.photo_id photo.id
  json.filename photo.filename
  json.url url_for(photo)
end 