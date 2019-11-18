class Match < ApplicationRecord 

  validates :user_id, presence: true, uniqueness: { scope: :requested_user_id }
  validates :requested_user_id, presence: true 

  belongs_to :requester, 
    foreign_key: :user_id,
    class_name: :User

  belongs_to :requestee,
    foreign_key: :requested_user_id,
    class_name: :User

end 