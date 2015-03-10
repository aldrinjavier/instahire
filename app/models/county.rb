class County < ActiveRecord::Base
	#RELATIONSHIPS
	has_many :areas
	has_many :users, :through => :areas
	has_many :tasks, :through => :areas
end
