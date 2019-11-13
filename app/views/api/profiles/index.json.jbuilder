json.profiles do 
  json.array! @profiles do |profile|
    json.extract! profile, :id, :user_id, :zipcode, :bio, :looking_for, :compatibility_answers
    json.photo_urls do 
      json.array! profile.photos do |photo|
        json.id photo.id if photo.attached? 
        json.photo_url url_for(photo) if photo.attached? 
      end 
    end 
  end 
end