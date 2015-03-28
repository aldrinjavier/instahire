class County < ActiveRecord::Base
	#RELATIONSHIPS
	has_many :areas
	has_many :users, :through => :areas
	has_many :tasks, :through => :areas

	def task_name_and_count
		tasks = Task.current.result.to_a
		counter = 0
		tasks.each do |t|
			if id == t.area.county.id
				counter +=1
			end
		end
		"#{name} (#{counter})"
	end

end
