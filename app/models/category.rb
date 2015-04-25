class Category < ActiveRecord::Base
	has_many :subcategories
	has_many :tasks, :through => :subcategories
	
	def task_name_and_count
		tasks = Task.current
		counter = 0
		tasks.each do |t|
			if id == t.subcategory.category.id
				counter +=1
			end
		end

		"#{name} (#{counter})"	
	end

end
