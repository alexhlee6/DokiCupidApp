# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'


user1 = User.create(username: "demo_user", password: "demo_user")
  # file1A = File.open('app/assets/images/default_boy.jpg')
  file1A = open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/default_boy.jpg")
  user1.photo.attach(io: file1A, filename: "default_boy.jpg")
profile1 = Profile.new(user_id: "", fname: "DemoUser", zipcode: 94102, bio: "This is the profile for a demo user!", identify_as: "Gender Neutral", looking_for: "True Love", compatibility_answers: "NNYNNYYY")
  profile1.user_id = user1.id
  profile1.save
  file1B = File.open('app/assets/images/default_boy.jpg')
  profile1.photos.attach(io: file1B, filename: "default_boy.jpg")



user2 = User.create(username: "alexlee", password: "alexlee")
  file2A = File.open('app/assets/images/akko.jpg')
  user2.photo.attach(io: file2A, filename: "akko.jpg")
profile2 = Profile.new(user_id: "", fname: "Alex", zipcode: 92122, bio: "Hi I'm Alex, the creator of this app!", identify_as: "Female", looking_for: "Friends", compatibility_answers: "YNNYYNYY")
  profile2.user_id = user2.id
  profile2.save
  file2B = File.open('app/assets/images/akko.jpg')
  profile2.photos.attach(io: file2B, filename: "akko.jpg")



user3 = User.create(username: "uenoyama", password: "uenoyama")
  file3A = File.open('app/assets/images/uenoyama.jpg')
  user3.photo.attach(io: file3A, filename: "uenoyama.jpg")
profile3 = Profile.new(user_id: "", fname: "Uenoyama", zipcode: 90005, bio: "I like rock music and playing the guitar.", identify_as: "Male", looking_for: "Relationship", compatibility_answers: "NYNYNYYN")
  profile3.user_id = user3.id
  profile3.save
  file3B = File.open('app/assets/images/uenoyama.jpg')
  profile3.photos.attach(io: file3B, filename: "uenoyama.jpg")
  file3C = File.open('app/assets/images/uenoyama1.jpg')
  profile3.photos.attach(io: file3C, filename: "uenoyama1.jpg")



user4 = User.create(username: "fujiwara_chika", password: "fujiwara_chika")
  file4A = File.open('app/assets/images/chika_icon.jpg')
  user4.photo.attach(io: file4A, filename: "chika_icon.jpg")
profile4 = Profile.new(user_id: "", fname: "Chika", zipcode: 91104, bio: "Please increase the budget of the tabletop game club! :)", identify_as: "Female", looking_for: "Nothing Serious", compatibility_answers: "YNYYNYYN")
  profile4.user_id = user4.id
  profile4.save
  file4B = File.open('app/assets/images/chika1.jpg')
  profile4.photos.attach(io: file4B, filename: "chika1.jpg")
  file4C = File.open('app/assets/images/chika_icon.jpg')
  profile4.photos.attach(io: file4C, filename: "chika_icon.jpg")
  file4D = File.open('app/assets/images/chika2.jpg')
  profile4.photos.attach(io: file4D, filename: "chika2.jpg")