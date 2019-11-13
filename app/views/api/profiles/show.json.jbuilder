
json.extract! @profile, :id, :fname, :user_id, :zipcode, :bio, :looking_for, :identify_as, :compatibility_answers
  # json.photo_urls do 
  #   json.array! @profile.photos do |photo|
  #     json.id photo.id if photo.attached? 
  #     json.photo_url url_for(photo) if photo.attached? 
  #   end 
  # end 
json.photo_urls @profile.photos do |photo|
  json.filename photo.filename
  json.url url_for(photo)
end 