
  json.array! @profiles do |profile|
    json.extract! profile, :id, :user_id, :fname, :zipcode, :compatibility_answers
    json.photo_url url_for(profile.user.photo) if profile.user.photo.attached?
  end 
