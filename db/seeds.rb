# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



user1 = User.create(username: "demo_user", password: "demo_user")
file1 = File.open('app/assets/images/default_boy.jpg')
user1.photo.attach(io: file1, filename: "default_boy.jpg")


user2 = User.create(username: "alexlee", password: "alexlee")
file2 = File.open('app/assets/images/akko.jpg')
user2.photo.attach(io: file2, filename: "akko.jpg")

