class Education < ActiveRecord::Base
	#RELATIONSHIPS
	belongs_to :user

	#VALIDATIONS
	validates :school_name, presence: true
	validates :degree, presence: true
	# validates :year_started, presence: true
	# validates :year_finished, presence: true
end
