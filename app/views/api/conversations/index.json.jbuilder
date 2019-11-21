
json.conversations do 
  @conversations.each do |conversation| 
    json.set! conversation.id do 
      json.id conversation.id
      json.sender_id conversation.sender_id
      json.recipient_id conversation.recipient_id
    end
  end
end 

json.matched_users do
  @matched_users.each do |user|
    json.set! user.id do 
      json.id user.id
      json.username user.username
      json.photo_url url_for(user.photo) if user.photo.attached?
      json.profile_id user.profile.id if user.profile.present? 
    end
  end 
end