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
  profile1 = Profile.new(
    user_id: "", fname: "DemoUser", zipcode: 94102, bio: "This is the profile for a demo user!", 
    identify_as: "Non-binary", looking_for: "True Love", 
    compatibility_answers: "Extroverted/Dog Person/Methodical/Organized/Adventurous/Cooperative/Sensitive/Laid-back"
  )
  profile1.user_id = user1.id
  profile1.save
  file1B = URI.open("https://dokicupid-seeds.s3-us-west-1.amazonaws.com/default_boy.jpg")
  profile1.photos.attach(io: file1B, filename: "default_boy2.jpg")



user2 = User.create(username: "izumi_sena", password: "izumi_sena")
  file2A = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/izumi/1.webp")
  user2.photo.attach(io: file2A, filename: "2A.webp")
  profile2 = Profile.new(
    user_id: "", fname: "Izumi", zipcode: 92122, 
    bio: "On top of his idol activities, Izumi engages in modelling in Europe. Stoic and high-strung, he also enjoys fussing over people who give him the chance to do so. He has a soulful singing voice and his performances are relaxed and beautiful.", 
    identify_as: "Male", looking_for: "Friends", 
    compatibility_answers: "Introverted/Cat Person/Creative/Carefree/Reserved/Independent/Head-strong/Laid-back"
  )
  profile2.user_id = user2.id
  profile2.save
  file2D = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/izumi/1.webp")
  profile2.photos.attach(io: file2D, filename: "2D.webp")
  file2B = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/izumi/2.webp")
  profile2.photos.attach(io: file2B, filename: "2B.webp")
  file2C = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/izumi/3.webp")
  profile2.photos.attach(io: file2C, filename: "2C.webp")



user3 = User.create(username: "eichi_tenshouin", password: "eichi_tenshouin")
  file3A = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/1.webp")
  user3.photo.attach(io: file3A, filename: "3A.webp")
  profile3 = Profile.new(
    user_id: "", fname: "Eichi", zipcode: 90005, 
    bio: "Eichi is the Idol representative and business executive for STARMAKER PRODUCTION. He is a calm and thoughtful leader who loves idols deeper than anyone else. Eichi sings with a gentle and delicate voice, with elegant performances brimming with warmth.", 
    identify_as: "Male", looking_for: "Relationship", 
    compatibility_answers: "Introverted/Dog Person/Methodical/Organized/Adventurous/Cooperative/Head-strong/Task-oriented"
  )
  profile3.user_id = user3.id
  profile3.save
  file3D = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/1.webp")
  profile3.photos.attach(io: file3D, filename: "3D.webp")
  file3B = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/2.webp")
  profile3.photos.attach(io: file3B, filename: "3B.webp")
  file3C = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/eichi/3.webp")
  profile3.photos.attach(io: file3C, filename: "3C.webp")



user4 = User.create(username: "rei_sakuma", password: "rei_sakuma")
  file4A = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/rei/1.webp")
  user4.photo.attach(io: file4A, filename: "4A.webp")
  profile4 = Profile.new(
    user_id: "", fname: "Rei", zipcode: 91104, 
    bio: "A self-proclaimed vampire who possesses a wealth of knowledge, but is vulnerable in the morning. He has a strong connection with the comrades he considers family despite being so philosophically profound.
    Dotes on his younger brother Ritsu Sakuma. With a mellow voice that entices the audience, his performance is tender yet powerful.", 
    identify_as: "Male", looking_for: "Nothing Serious", 
    compatibility_answers: "Introverted/Dog Person/Creative/Carefree/Adventurous/Independent/Sensitive/Laid-back"
  )
  profile4.user_id = user4.id
  profile4.save
  file4D = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/rei/1.webp")
  profile4.photos.attach(io: file4D, filename: "4D.webp")
  file4B = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/rei/2.webp")
  profile4.photos.attach(io: file4B, filename: "4B.webp")
  file4C = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/rei/3.webp")
  profile4.photos.attach(io: file4C, filename: "4C.webp")



user5 = User.create(username: "niki_shiina", password: "niki_shiina")
  file5A = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/niki/1.webp")
  user5.photo.attach(io: file5A, filename: "5A.webp")
  profile5 = Profile.new(
    user_id: "", fname: "Niki", zipcode: 91350, 
    bio: "An idol who also works as a chef. He used to perform as part of a duo with Rinne Amagi. Though he's someone very easily swayed by the words of others, he has an overall chipper personality. He becomes wild and brusque once his stomach is empty. Normally, though, he has a friendly atmosphere about him and feels easy to talk to. With a mischievous voice, his performances are light and carefree.", 
    identify_as: "Male", looking_for: "Nothing Serious", 
    compatibility_answers: "Extroverted/Dog Person/Creative/Carefree/Adventurous/Cooperative/Sensitive/Laid-back"
  )
  profile5.user_id = user5.id
  profile5.save
  file5D = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/niki/1.webp")
  profile5.photos.attach(io: file5D, filename: "5D.webp")
  file5B = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/niki/2.webp")
  profile5.photos.attach(io: file5B, filename: "5B.webp")
  file5C = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/niki/3.webp")
  profile5.photos.attach(io: file5C, filename: "5C.webp")



user6 = User.create(username: "arashi_narukami", password: "arashi_narukami")
  file6A = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/arashi/1.webp")
  user6.photo.attach(io: file6A, filename: "6A.webp")
  profile6 = Profile.new(
    user_id: "", fname: "Arashi", zipcode: 91360, 
    bio: "A self-proclaimed “big sister”. She is skilled at taking care of people and loves cute things. She has a friendly and sociable personality, but can occasionally have extreme mood swings. She has ample self-confidence when it comes to a refined performance and a light, gentle singing voice.", 
    identify_as: "Female", looking_for: "Relationship", 
    compatibility_answers: "Extroverted/Cat Person/Methodical/Organized/Adventurous/Cooperative/Sensitive/Laid-back"
  )
  profile6.user_id = user6.id
  profile6.save
  file6D = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/arashi/1.webp")
  profile6.photos.attach(io: file6D, filename: "6D.webp")
  file6B = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/arashi/2.webp")
  profile6.photos.attach(io: file6B, filename: "6B.webp")
  file6C = URI.open("https://dokicupid-seeds.s3.us-west-1.amazonaws.com/es/arashi/3.webp")
  profile6.photos.attach(io: file6C, filename: "6C.webp")