# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'


user1 = User.create(username: "demo_user", password: "demo_user")
  file1A = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/default_boy.jpg")
  user1.photo.attach(io: file1A, filename: "default_boy.jpg")
profile1 = Profile.new(user_id: "", fname: "DemoUser", zipcode: 94102, bio: "This is the profile for a demo user!", identify_as: "Gender Neutral", looking_for: "True Love", compatibility_answers: "NNYNNYYY")
  profile1.user_id = user1.id
  profile1.save
  file1B = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/default_boy.jpg")
  profile1.photos.attach(io: file1B, filename: "default_boy.jpg")



user2 = User.create(username: "alexlee", password: "alexlee")
  file2A = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/akko.jpg")
  user2.photo.attach(io: file2A, filename: "akko.jpg")
profile2 = Profile.new(user_id: "", fname: "Akko", zipcode: 92122, bio: "Believing in myself is my magic!", identify_as: "Female", looking_for: "Friends", compatibility_answers: "YNNYYNYY")
  profile2.user_id = user2.id
  profile2.save
  file2B = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/akko.jpg")
  profile2.photos.attach(io: file2B, filename: "akko.jpg")
  file2C = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/akko2.png")
  profile2.photos.attach(io: file2C, filename: "akko2.png")



user3 = User.create(username: "eichi_tenshouin", password: "eichi_tenshouin")
  file3A = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/1.webp")
  user3.photo.attach(io: file3A, filename: "1.webp")
  profile3 = Profile.new(
    user_id: "", fname: "Eichi", zipcode: 90005, 
    bio: "Eichi is the Idol representative and business executive for STARMAKER PRODUCTION. He is a calm and thoughtful leader who loves idols deeper than anyone else. Eichi sings with a gentle and delicate voice, with elegant performances brimming with warmth.", 
    identify_as: "Male", looking_for: "Relationship", 
    compatibility_answers: "NYNYNYYN"
  )
  profile3.user_id = user3.id
  profile3.save
  file3B = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/2.webp")
  user3.photo.attach(io: file3B, filename: "2.webp")
  file3C = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/3.webp")
  profile3.photos.attach(io: file3C, filename: "3.webp")
  file3D = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/4.webp")
  profile3.photos.attach(io: file3D, filename: "4.webp")
  file3E = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/5.webp")
  profile3.photos.attach(io: file3E, filename: "5.webp")



user4 = User.create(username: "fujiwara_chika", password: "fujiwara_chika")
  file4A = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/chika_icon.jpg")
  user4.photo.attach(io: file4A, filename: "chika_icon.jpg")
profile4 = Profile.new(user_id: "", fname: "Chika", zipcode: 91104, bio: "Please increase the budget of the tabletop game club! :)", identify_as: "Female", looking_for: "Nothing Serious", compatibility_answers: "YNYYNYYN")
  profile4.user_id = user4.id
  profile4.save
  file4B = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/chika1.jpg")
  profile4.photos.attach(io: file4B, filename: "chika1.jpg")
  file4C = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/chika_icon.jpg")
  profile4.photos.attach(io: file4C, filename: "chika_icon.jpg")
  file4D = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/chika2.jpg")
  profile4.photos.attach(io: file4D, filename: "chika2.jpg")



user5 = User.create(username: "ishigami_senku", password: "ishigami_senku")
  file5A = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/senku3.jpg")
  user5.photo.attach(io: file5A, filename: "senku3.jpg")
profile5 = Profile.new(user_id: "", fname: "Senku", zipcode: 91350, bio: "I'm going to use the power of science to rescue every single person", identify_as: "Male", looking_for: "Nothing Serious", compatibility_answers: "YYNYNYNN")
  profile5.user_id = user5.id
  profile5.save
  file5B = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/senku.jpeg")
  profile5.photos.attach(io: file5B, filename: "senku.jpeg")
  file5C = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/senku3.jpg")
  profile5.photos.attach(io: file5C, filename: "senku3.jpg")
  file5D = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/senku2.jpg")
  profile5.photos.attach(io: file5D, filename: "senku2.jpg")