class Education < ActiveRecord::Base
	#RELATIONSHIPS
	belongs_to :user

	#VALIDATIONS
	validates :school_name, presence: {message: "Please enter your school's name." }
	validates :degree, presence: {message: "Please enter your degree." }
	validates :year_started, presence: {message: "Please enter the month and year when you started." }
	validates :year_finished, presence: {message: "Please enter the month and year when you finished." }
	validate :validate_end_date_before_start_date

	def validate_end_date_before_start_date
		if year_finished && year_started
			errors.add(:year_finished, "Please be sure the date started is not after the date finished.") if year_finished < year_started
		end
	end
end
