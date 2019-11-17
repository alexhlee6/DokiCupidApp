json.user do 
  json.partial! 'api/users/user', user: @user
end 

json.profile do 
  json.id @profile_id
end 