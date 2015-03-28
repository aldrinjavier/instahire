class Category < ActiveRecord::Base
	has_many :subcategories
	has_many :tasks, :through => :subcategories
	
	def task_name_and_count
		tasks = Task.current.result.to_a
		counter = 0
		tasks.each do |t|
			if id == t.subcategory.category.id
				counter +=1
			end
		end

		"#{name} (#{counter})"
			# "#{name} (#{ActiveRecord::Base.connection.execute("SELECT `tasks`.* FROM `tasks` LEFT OUTER JOIN `subcategories` ON `subcategories`.`id` = `tasks`.`subcategory_id` WHERE `subcategories`.`category_id` = #{ActiveRecord::Base.sanitize(id)} ORDER BY created_at DESC").count})"
			# "#{name} #{ActiveRecord::Base.connection.execute(a)}"
			# "#{name} #{"\"#{a}\""}"
			# "#{name} #{first + last}"
			# "#{name} (#{ActiveRecord::Base.connection.execute(test)})"
			# id_index = Task.current.result.to_sql.to_s.index("`category_id` = ").to_i + 15
			# first = "#{Task.current.result.to_sql.to_s[0..id_index]}#{ActiveRecord::Base.sanitize(id)}" 
			# last = Task.current.result.to_sql.to_s[id_index..-1]
			# "#{name} #{first+last}"
			# return "#{name} (#{first})"
			# "#{name} #{ ActiveRecord::Base.connection.execute('SELECT `tasks`.* FROM `tasks` LEFT OUTER JOIN `subcategories` ON `subcategories`.`id` = `tasks`.`subcategory_id` WHERE `subcategories`.`category_id` = 1').count}"


		# id_index = Task.current.result.to_sql.to_s.index("`category_id` = ").to_i + 15
		# # # test = Task.current.result.to_sql
		# first = Task.current.result.to_sql.to_s[0..id_index].to_sql+ActiveRecord::Base.sanitize(id)
		# last = Task.current.result.to_sql.to_s[id_index+1..-1].to_sql
		# a = first + last

		# sentence.sub! 'Robert', 'Joe'

		# "hello".index('lo')            #=> 3
		# Task.current.result.to_sql.to_s.index('category_id')

# "SELECT `tasks`.* FROM `tasks` ORDER BY created_at DESC"
# include?

		# "#{name} (#{tasks.count})"
		# "#{tasks.where("is_pay_per_hour= ? AND area_id= ?", true, nil).count}"
		# "#{name} (#{tasks.where(is_pay_per_hour: true).to_sql })"
		# "#{name} #{ ActiveRecord::Base.connection.execute('SELECT `tasks`.* FROM `tasks` LEFT OUTER JOIN `subcategories` ON `subcategories`.`id` = `tasks`.`subcategory_id` WHERE `subcategories`.`category_id` = 1').count}"
		# ActiveRecord::Base.connection.execute("update table set f1=#{ActiveRecord::Base.sanitize(f1)}")
		# "#{name} (#{tasks.where(is_pay_per_hour: true)})"
		# "#{name} #{ActiveRecord::Base.connection.execute("SELECT `tasks`.* FROM `tasks` LEFT OUTER JOIN `subcategories` ON `subcategories`.`id` = `tasks`.`subcategory_id` WHERE `subcategories`.`category_id` = #{ActiveRecord::Base.sanitize(id)}").count}"
	end

end
