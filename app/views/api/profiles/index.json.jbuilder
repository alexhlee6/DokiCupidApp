
  json.array! @profiles do |profile|
    json.extract! profile, :id, :user_id, :fname, :zipcode, :compatibility_answers
    json.photo_url url_for(profile.user.photo) if profile.user.photo.attached?
    json.photo_urls profile.photos do |photo|
      json.photo_id photo.id
      json.filename photo.filename
      json.url url_for(photo)
    end 
  end 
