class OfferedService < ActiveRecord::Base


	#RELATIONSHIPS
	belongs_to :user
	belongs_to :subcategory

	#VALIDATIONS
	validates :title, presence: {message: "Please enter the name of your sevice" }
	validates :service_description, presence: {message: "Please enter the description of your service." }

end
