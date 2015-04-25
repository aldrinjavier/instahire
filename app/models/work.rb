class Work < ActiveRecord::Base
	
	#RELATIONSHIPS
	belongs_to :user
	
	#VALIDATIONS
	validates :company_name, presence: {message: "Please enter the company's name." }
	validates :work_title, presence: {message: "Please enter your work title" }
	validates :date_started, presence: {message: "Please enter the date when you started." }
	validates :date_finished, presence: {message: "Please enter the date when you finished."}, 
	:if => lambda { |o| o.is_currently_working == false}
	validate :validate_end_date_and_start_date

	def validate_end_date_and_start_date
		if date_finished && date_started
			
			if date_started > DateTime.now || date_finished > DateTime.now
				# when date started is in the future date
				if date_started > DateTime.now
					errors.add(:date_started, "Please enter a date no later than this month for the date started.") 
				end
				# when date finished is in the future date
				if date_finished > DateTime.now
					errors.add(:date_finished, "Please be sure the end date is no later than this month. If you are still in this position, click the checkbox.") 
				end

			elsif date_started < DateTime.now || date_finished < DateTime.now
				# when date finished is more ahead tham date started
				if date_finished < date_started
					errors.add(:date_finished, "Please be sure the date started is not after the date finished.") 
				end

			end
		end
	end
end
