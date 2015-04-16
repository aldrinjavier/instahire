class Education < ActiveRecord::Base
	#RELATIONSHIPS
	belongs_to :user

	#VALIDATIONS
	validates :school_name, presence: {message: "Please enter your school's name." }
	validates :degree, presence: {message: "Please enter your degree." }
	validates :year_started, presence: {message: "Please enter the month and year when you started." }
	validates :year_finished, presence: {message: "Please enter the month and year when you finished." }
end
