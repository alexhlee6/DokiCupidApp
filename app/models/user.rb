class User < ApplicationRecord
  attr_reader :password
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6}, allow_nil: true
  validates :password_digest, presence: true
  after_initialize :ensure_session_token

  has_one_attached :photo

  has_one :profile,
    foreign_key: :user_id,
    class_name: :Profile

  has_many :requested_matches, # sent match requests / ppl who you "liked" you
    foreign_key: :user_id,
    class_name: :Match

  has_many :received_match_requests,  # received match requests / ppl who "liked" you
    foreign_key: :requested_user_id,
    class_name: :Match
  
  

  def matches #returns array of MATCHES where 
    Match.where("(user_id = ? OR requested_user_id = ?) AND is_matched = ?", self.id, self.id, true)
  end 


  def matched_users #returns array of USERS MATCHED WITH CURRENT USER
    matches = self.matches
    matched_users = []
    matches.each do |match|
      if match.user_id == self.id 
        matched_users << User.find(match.requested_user_id)
      else 
        matched_users << User.find(match.user_id)
      end
    end
    matched_users
  end


  def requesting_users 
    matches = Match.where("(requested_user_id = ?) AND is_matched = ?", self.id, false)
    requesting_users = []
    matches.each do |match| 
      requesting_users << User.find(match.user_id)
    end
    requesting_users
  end



  def self.generate_session_token 
    SecureRandom::urlsafe_base64(16)
  end 
  
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end 
  
  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save
    self.session_token
  end 
  
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end 

end
