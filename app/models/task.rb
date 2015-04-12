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
	has_many :responses, dependent: :destroy
	accepts_nested_attributes_for :appointments

	#VALIDATIONS
	#category validation
	validates :category_id, presence: {message: "Please select a category." } 

	#subcategory validation
	validates :subcategory_id, presence: {message: "Please select a subcategory." }, 
	:if => lambda { |o| o.category_id.present?}

	#title validations
	validates :title, presence: {message: "Please enter a title." }
	validates :title, length: {minimum: 10, maximum: 40, too_short: "Please enter at least 10 characters.", 
		too_long: "Please enter less than 40 characters"}, :if => lambda { |o| o.title.present?}

	#description validations
	validates :description, presence: {message: "Please enter a description." }
	validates :description, length: {minimum: 20, maximum: 200, too_short: "Please enter at least 20 characters.", 
		too_long: "Please enter less than 200 characters."}, 
		:if => lambda { |o| o.description.present?}

	#county validation
	validates :county_id, presence: {message: "Please enter a county." }

	#area validation
	validates :area_id, presence: {message: "Please enter an area." }, 
	:if => lambda { |o| o.county_id.present?}

	#pay offer validation
	validate :pay_offer_validation

	#order tasks: recently added
	default_scope -> { order('created_at DESC') }

	#custom validation
	def pay_offer_validation
		if self.pay_offer.blank?
			errors.add(:pay_offer, "Please enter a value.")
		elsif !self.pay_offer.is_a? Numeric
			errors.add(:pay_offer, "Please enter numeric characters only.")
		else
			if self.is_pay_per_hour
				if self.pay_offer < 10
					errors.add(:pay_offer, "€ #{pay_offer} is invalid. The minimum offer you can set is €10.")
				end
			else
				if self.pay_offer < 20
					errors.add(:pay_offer, "€ #{pay_offer} is invalid. The minimum offer you can set is €20.")
				end
			end
		end
	end

	def title_validation
		if title.blank?
			errors.add(:title, "Please enter a title.")
		end
		if title.present? && title.length < 10
			errors.add(:title, "Minimum is 10")
		end
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
