class Conversation < ApplicationRecord
  has_many :messages, dependent: :destroy
  # has_many :users, through: :messages

  validates_uniqueness_of :sender_id, scope: :recipient_id

  belongs_to :sender,
    foreign_key: :sender_id,
    class_name: :User

  belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User

    
  scope :between, -> (sender_id, recipient_id) do 
    where("(conversations.sender_id = ? AND conversations.recipient_id = ?) OR (conversations.sender_id = ? AND conversations.recipient_id = ?)", sender_id, recipient_id, recipient_id, sender_id)
  end

end