class Task < ActiveRecord::Base
	#VIRTUAL ATTRIBUTES
	attr_accessor :category_id
	attr_accessor :county_id

	#RELATIONSHIPS
	belongs_to :client, class_name: "User"
	belongs_to :worker, class_name: "User"

	belongs_to :area
	delegate :county, :to => :area

	belongs_to :subcategory
	delegate :category, :to => :subcategory

	has_many :appointments, :dependent => :destroy
	accepts_nested_attributes_for :appointments

	#VALIDATIONS
	validates :category_id, presence: {message: "Please enter a category." }
	validates :subcategory_id, presence: {message: "Please enter a subcategory." }
	default_scope -> { order('created_at DESC') }
	# validates :title, presence: {message: "Please enter a title." }
	# validates :description, presence: {message: "Please enter a description." }
	# validates :pay_offer, presence: {message: "Please enter a value." }
	# validates :county_id, presence: {message: "Please enter a county." }
	# validates :area_id, presence: {message: "Please enter an area." }
	
end
