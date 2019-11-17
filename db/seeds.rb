# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'


user1 = User.create(username: "demo_user", password: "demo_user")
  file1A = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/default_boy.jpg")
  user1.photo.attach(io: file1A, filename: "default_boy.jpg")
profile1 = Profile.new(user_id: "", fname: "DemoUser", zipcode: 94102, bio: "This is the profile for a demo user!", identify_as: "Gender Neutral", looking_for: "True Love", compatibility_answers: "NNYNNYYY")
  profile1.user_id = user1.id
  profile1.save
  file1B = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/default_boy.jpg")
  profile1.photos.attach(io: file1B, filename: "default_boy.jpg")



user2 = User.create(username: "alexlee", password: "alexlee")
  file2A = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/akko.jpg")
  user2.photo.attach(io: file2A, filename: "akko.jpg")
profile2 = Profile.new(user_id: "", fname: "Akko", zipcode: 92122, bio: "Believing in myself is my magic!", identify_as: "Female", looking_for: "Friends", compatibility_answers: "YNNYYNYY")
  profile2.user_id = user2.id
  profile2.save
  file2B = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/akko.jpg")
  profile2.photos.attach(io: file2B, filename: "akko.jpg")
  file2C = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/akko2.png")
  profile2.photos.attach(io: file2C, filename: "akko2.png")



user3 = User.create(username: "uenoyama", password: "uenoyama")
  file3A = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/uenoyama1.jpg")
  user3.photo.attach(io: file3A, filename: "uenoyama1.jpg")
profile3 = Profile.new(user_id: "", fname: "Uenoyama", zipcode: 90005, bio: "I like rock music and playing the guitar.", identify_as: "Male", looking_for: "Relationship", compatibility_answers: "NYNYNYYN")
  profile3.user_id = user3.id
  profile3.save
  file3B = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/uenoyama.jpg")
  profile3.photos.attach(io: file3B, filename: "uenoyama.jpg")
  file3C = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/uenoyama1.jpg")
  profile3.photos.attach(io: file3C, filename: "uenoyama1.jpg")



user4 = User.create(username: "fujiwara_chika", password: "fujiwara_chika")
  file4A = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/chika_icon.jpg")
  user4.photo.attach(io: file4A, filename: "chika_icon.jpg")
profile4 = Profile.new(user_id: "", fname: "Chika", zipcode: 91104, bio: "Please increase the budget of the tabletop game club! :)", identify_as: "Female", looking_for: "Nothing Serious", compatibility_answers: "YNYYNYYN")
  profile4.user_id = user4.id
  profile4.save
  file4B = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/chika1.jpg")
  profile4.photos.attach(io: file4B, filename: "chika1.jpg")
  file4C = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/chika_icon.jpg")
  profile4.photos.attach(io: file4C, filename: "chika_icon.jpg")
  file4D = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/chika2.jpg")
  profile4.photos.attach(io: file4D, filename: "chika2.jpg")



user5 = User.create(username: "ishigami_senku", password: "ishigami_senku")
  file5A = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/senku3.jpg")
  user5.photo.attach(io: file5A, filename: "senku3.jpg")
profile5 = Profile.new(user_id: "", fname: "Senku", zipcode: 91350, bio: "I'm going to use the power of science to rescue every single person", identify_as: "Male", looking_for: "Nothing Serious", compatibility_answers: "YYNYNYNN")
  profile5.user_id = user5.id
  profile5.save
  file5B = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/senku.jpeg")
  profile5.photos.attach(io: file5B, filename: "senku.jpeg")
  file5C = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/senku3.jpg")
  profile5.photos.attach(io: file5C, filename: "senku3.jpg")
  file5D = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/senku2.jpg")
  profile5.photos.attach(io: file5D, filename: "senku2.jpg")