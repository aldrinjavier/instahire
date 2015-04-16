class Work < ActiveRecord::Base
	
	#RELATIONSHIPS
	belongs_to :user
	
	#VALIDATIONS
	validates :company_name, presence: {message: "Please enter the company's name." }
	validates :work_title, presence: {message: "Please enter your work title" }
	validates :date_started, presence: {message: "Please enter the date when you started." }
	validates :date_finished, presence: {message: "Please enter the date when you finished."}, 
	:if => lambda { |o| o.is_currently_working == false}
end
