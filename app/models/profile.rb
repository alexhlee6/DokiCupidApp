class Profile < ApplicationRecord 
  validates :fname, length: {minimum: 2}, presence: true
  validates :user_id, presence: true, uniqueness: true 
  validates :zipcode, :bio, :identify_as, :looking_for, presence: true
  validates :compatibility_answers, length: {minimum: 8}, presence: true

  has_many_attached :photos,
    dependent: :purge_later

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

end 