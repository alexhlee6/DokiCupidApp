# json.extract! @match, :id, :user_id, :requested_user_id, :is_matched

json.set! @match.id do 
  json.id @match.id
  json.user_id current_user.id 

  if @match.user_id == current_user.id
    json.matched_user_id @match.requested_user_id
  else
    json.matched_user_id @match.user_id
  end
  
  json.is_matched @match.is_matched
end