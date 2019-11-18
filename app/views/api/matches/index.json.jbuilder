@matches.each do |match|

  json.set! match.id do 
    json.id match.id
    
    if current_user.id == match.user_id
      json.user_id match.user_id
      json.matched_user_id match.requested_user_id

      if @matched_users
        json.matched_user do 
          json.id match.requested_user_id
          json.fname User.find(match.requested_user_id).profile.fname if User.find(match.requested_user_id).profile
          json.photo_url url_for(User.find(match.requested_user_id).photo) if User.find(match.requested_user_id).photo.attached? 
        end
      end 
    else 
      json.user_id match.requested_user_id
      json.matched_user_id match.user_id

      if @matched_users
        json.matched_user do 
          json.id match.user_id
          json.fname User.find(match.user_id).profile.fname if User.find(match.user_id).profile
          json.photo_url url_for(User.find(match.user_id).photo) if User.find(match.user_id).photo.attached? 
        end
      end 


    end
    json.is_matched match.is_matched
  end
end

# if @matched_users
#   json.matched_users do 
#     @matched_users.each do |user|
#       json.set! user.id do 
#         json.fname user.profile.fname
#         json.photo_url url_for(user.photo) if user.photo.attached? 
#       end
#     end
#   end 
# end 