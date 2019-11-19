json.matched_users do 
  @matched_users.each do |matched_user| 
    json.set! matched_user.id do 
      json.id matched_user.id 
      json.fname matched_user.profile.fname if matched_user.profile
      json.profile_id matched_user.profile.id if matched_user.profile 
      json.current_user_compatibility_answers current_user.profile.compatibility_answers if current_user.profile
      json.other_user_compatibility_answers matched_user.profile.compatibility_answers if matched_user.profile
      json.photo_url url_for(matched_user.photo) if matched_user.photo.attached?
    end 
  end
end 

json.who_liked_you do 
  @who_liked_you.each do |liker| 
    json.set! liker.id do 
      json.id liker.id 
      json.fname liker.profile.fname if liker.profile
      json.profile_id liker.profile.id if liker.profile 
      json.current_user_compatibility_answers current_user.profile.compatibility_answers if current_user.profile
      json.other_user_compatibility_answers liker.profile.compatibility_answers if liker.profile
      json.photo_url url_for(liker.photo) if liker.photo.attached?
    end 
  end
end 

json.who_you_liked do 
  @who_you_liked.each do |liked_user| 
    json.set! liked_user.id do 
      json.id liked_user.id 
      json.fname liked_user.profile.fname if liked_user.profile
      json.profile_id liked_user.profile.id if liked_user.profile 
      json.current_user_compatibility_answers current_user.profile.compatibility_answers if current_user.profile
      json.other_user_compatibility_answers liked_user.profile.compatibility_answers if liked_user.profile
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
        json.creator_name "You"
      else  
        json.other_user_id match.user_id
        json.creator_name User.find(match.user_id).profile.fname if User.find(match.user_id).profile
      end
      
      json.created_at match.created_at
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