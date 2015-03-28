class Area < ActiveRecord::Base
	#RELATIONSHIPS
	belongs_to :county
	has_many :users
	has_many :tasks

	def task_name_and_count
		tasks = Task.current.result.to_a
		counter = 0
		tasks.each do |t|
			if id == t.area_id
				counter +=1
			end
		end
		"#{name} (#{counter})"
	end

end
