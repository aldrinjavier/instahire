class Area < ActiveRecord::Base
	#RELATIONSHIPS
	belongs_to :county
	has_many :users
	has_many :tasks
end
