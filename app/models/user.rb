class User < ActiveRecord::Base
	#ATTRIBUTES
	attr_accessor :remember_token
	attr_accessor :county_id

	mount_uploader :picture, PictureUploader

	#RELATIONSHIPS
	belongs_to :area
	delegate :county, :to => :area

	# has_many :client_relationships, class_name: "Task", foreign_key: "client_id", dependent: :destroy
	# has_many :worker_relationships, class_name: "Task", foreign_key: "worker_id", dependent: :destroy

	has_many :task_posts, class_name: "Task", foreign_key: "client_id", dependent: :destroy
	has_many :task_todos, class_name: "Task", foreign_key: "worker_id", dependent: :destroy

	# has_many :worker_tasks, through: :client_relationships, source: :worker
	# has_many :client_tasks, through: :worker_relationships, source: :client

	has_many :workers, through: :task_posts, source: :worker
	has_many :clients, through: :task_todos, source: :client

	has_many :educations, dependent: :destroy
	has_many :works, dependent: :destroy
	has_many :offered_services, dependent: :destroy
	has_many :responses
	has_many :subcomments

	accepts_nested_attributes_for :educations, allow_destroy: true
	accepts_nested_attributes_for :works, allow_destroy: true
	accepts_nested_attributes_for :offered_services, allow_destroy: true

	#VALIDATIONS
	before_save {self.email = email.downcase}
	validates :first_name, presence: {message: "Please enter your first name." }, length: {maximum: 25}
	validates :last_name, presence: {message: "Please enter your last name." }, length: {maximum: 25}

	# Email validations
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
	validates :email, presence: {message: "Please enter an email." }, length: {maximum: 50}
	validates :email, format: {with: VALID_EMAIL_REGEX, :message => "Invalid! Please enter a valid email."},
	:if => lambda { |o| o.email.present?}
	validates :email, uniqueness: { case_sensitive: false, :message => "This email has already been taken." } 


	# Password validations
	has_secure_password
	validates :password, length: { minimum: 6 }, allow_blank: true

	# Location validations
	# validates :county_id, presence: true, :if => lambda { self.created_at?}
	# validates :area_id, presence: true, :if => lambda { |o| o.county_id.present?}
	
# , length: {maximum: 255},
	# Returns a random token.
	# Class method

	HASH_NAME = {
		"Pay per hour" => "Pay per hour",
		"Fixed pay" => "Fixed pay",
	}

	
	def fullname
		"#{first_name} #{last_name}"
	end

	def role
		if self.client
			"Client"
		else
			"Worker"
		end
	end

	def location
		"#{self.area.name}, #{self.county.name}"
	end

	def User.new_token
		SecureRandom.urlsafe_base64
	end

	# Returns the hash digest of the given string.
	def User.digest(string)
		cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
		BCrypt::Engine.cost
		BCrypt::Password.create(string, cost: cost)
	end

	# Remembers a user in the database for use in persistent sessions.
	def remember
		self.remember_token = User.new_token
		update_attribute(:remember_digest, User.digest(remember_token))
	end

	# Returns true if the given token matches the digest.
	def authenticated?(remember_token)
		return false if remember_digest.nil?
		BCrypt::Password.new(remember_digest).is_password?(remember_token)
	end

	# Forgets a user.
	def forget
		update_attribute(:remember_digest, nil)
	end

	

end
