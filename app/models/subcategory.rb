class Subcategory < ActiveRecord::Base
	belongs_to :category
	has_many :tasks
	has_many :users

	def task_name_and_count
		tasks = Task.current
		counter = 0
		tasks.each do |t|
			if id == t.subcategory_id
				counter +=1
			end
		end

		"#{name} (#{counter})"
	end
end
