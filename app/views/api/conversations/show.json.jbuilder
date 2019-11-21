
json.id @conversation.id
  json.other_user do 
    json.id @other_user.id 
    json.username @other_user.username
    json.fname @other_user.profile.fname if @other_user.profile.present?
    json.photo_url url_for(@other_user.photo) if @other_user.photo.attached?
    json.profile_id @other_user.profile.id if @other_user.profile.present? 
  end

  json.current_user do 
    json.id current_user.id
  end 
  
  json.messages do
    json.array! @messages do |message| 
      json.id message.id
      json.user_id message.user_id
      json.username User.find(message.user_id).username
      json.created_at message.created_at
      json.body message.body
    end
end 




  # @conversation.each do |conversation| 
  #   json.set! conversation.id do 
  #     json.id conversation.id
  #     json.sender_id conversation.sender_id
  #     json.recipient_id conversation.recipient_id
  #   end
  # end
