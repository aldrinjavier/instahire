class Work < ActiveRecord::Base
	
	#RELATIONSHIPS
	belongs_to :user
	#VALIDATIONS
	validates :company_name, presence: true
	validates :work_title, presence: true
	validates :date_started, presence: true
	validates :date_finished, presence: true
end
