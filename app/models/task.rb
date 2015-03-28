class Task < ActiveRecord::Base
	#VIRTUAL ATTRIBUTES
	attr_accessor :category_id
	attr_accessor :county_id
	cattr_accessor :current

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
	validates :category_id, presence: {message: "Please select a category." } 
	validates :subcategory_id, presence: {message: "Please select a subcategory." }, if: :is_category_present 
	validates :title, presence: {message: "Please enter a title." },
	length: {minimum: 10}
	validates :description, presence: {message: "Please enter a description." }
	validates :pay_offer, presence: {message: "Please enter a value." }
	validates :county_id, presence: {message: "Please enter a county." }
	validates :area_id, presence: {message: "Please enter an area." }
	default_scope -> { order('created_at DESC') }

	def is_category_present
		@category_id.present?
	end
	
	def hello
		return "hi"  
	end
	


		# validate :is_date_nil

	# def is_date_nil
	# 	if @start_date.blank? && @end_date.blank? && @start_time.present? && @end_time.present?
	# 		errors.add(:start_date,  "Can't leave blank")
	# 		errors.add(:end_date,  "Can't leave blank")
	# 	end

	# 	if @start_time.blank? && @end_time.blank? && @start_date.present? && @end_date.present?
	# 		errors.add(:start_time,  "Can't leave blank")
	# 		errors.add(:end_time,  "Can't leave blank")
	# 	end
	# end
	
end
