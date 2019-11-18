# @matches.each do |match|

#   json.set! match.id do 
#     json.id match.id
    
#     if current_user.id == match.user_id
#       json.user_id match.user_id
#       json.matched_user_id match.requested_user_id

#       if @matched_users
#         json.matched_user do 
#           json.id match.requested_user_id
#           json.fname User.find(match.requested_user_id).profile.fname if User.find(match.requested_user_id).profile
#           json.photo_url url_for(User.find(match.requested_user_id).photo) if User.find(match.requested_user_id).photo.attached? 
#         end
#       end 
#     else 
#       json.user_id match.requested_user_id
#       json.matched_user_id match.user_id

#       if @matched_users
#         json.matched_user do 
#           json.id match.user_id
#           json.fname User.find(match.user_id).profile.fname if User.find(match.user_id).profile
#           json.photo_url url_for(User.find(match.user_id).photo) if User.find(match.user_id).photo.attached? 
#         end
#       end 


#     end
#     json.is_matched match.is_matched
#   end
# end

json.matched_users do 
  @matched_users.each do |matched_user| 
    json.set! matched_user.id do 
      json.id matched_user.id 
      json.fname matched_user.profile.fname if matched_user.profile
      json.photo_url url_for(matched_user.photo) if matched_user.photo.attached?
    end 
  end
end 

json.who_liked_you do 
  @who_liked_you.each do |liker| 
    json.set! liker.id do 
      json.id liker.id 
      json.fname liker.profile.fname if liker.profile
      json.photo_url url_for(liker.photo) if liker.photo.attached?
    end 
  end
end 

json.who_you_liked do 
  @who_you_liked.each do |liked_user| 
    json.set! liked_user.id do 
      json.id liked_user.id 
      json.fname liked_user.profile.fname if liked_user.profile
      json.photo_url url_for(liked_user.photo) if liked_user.photo.attached?
    end 
  end
end 

json.matches do 
  @matches.each do |match|
    json.set! match.id do 
      json.id match.id
      json.current_user_id current_user.id

      if current_user.id == match.user_id 
        json.other_user_id match.requested_user_id
      else  
        json.other_user_id match.user_id
      end

      json.is_matched match.is_matched
    end 
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