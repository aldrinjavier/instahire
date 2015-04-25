module ApplicationHelper
	
	def full_title(page_title = '')
		base_title = "Instahire"
		if page_title.empty?
			base_title
		else
			"#{page_title} | #{base_title}"
		end
	end

	def link_to_add_fields(name, f, association, path, extra_class = '')
		new_object = f.object.send(association).klass.new
		id = new_object.object_id
		fields = f.simple_fields_for(association, new_object, child_index: id) do |builder|
			render(path, f: builder)
		end
		link_to(name, '#', class: "add_fields btn glyphicon glyphicon-plus-sign " + extra_class, data: {id: id, fields: fields.gsub("\n", "")})
	end

	def time_in_hour_and_minutes(seconds_value)
		seconds = seconds_value.to_i
		hours = seconds / 3600
		seconds -= hours * 3600
		minutes = seconds / 60

		if minutes == 0 && hours > 0
			pluralize(hours, 'hour')

		elsif hours == 0 && minutes > 0
			pluralize(minutes, 'minute')
		else
			"#{pluralize(hours, 'hour')} and #{pluralize(minutes, 'minute')}"
		end
	end

	def calculate_earnings(seconds_value, pay_offer)
		seconds = seconds_value.to_i
		minutes = seconds / 60
		pay = pay_offer.to_f / 60
		return (minutes * pay).to_i
	end

	def customised_time_ago_in_words(from_time)
		#It will have week. ie 1 week ago, 2 weeks ago, and 3 weeks ago, 
		#since the default time_ago_in_words function does not work this way
		to_time   = Time.now
		weeks_ago = ((to_time - from_time)/1.week).abs
		[nil, "1 week", "2 weeks", "3 weeks"][weeks_ago] || 
		distance_of_time_in_words(from_time, to_time)
	end

	def time_period(start, finish)

		no_of_months = (finish.year * 12 + finish.month) - (start.year * 12 + start.month)
		months = (no_of_months + 1) % 12
		years = (no_of_months + 1) / 12

		if no_of_months.to_f < 1
			"(1 month)"
		else
			if years < 1

				"(#{pluralize(months , 'month')})"
			else
				if months == 0 
					"(#{pluralize(years, 'year')})"
				else
					"(#{pluralize(years, 'year')} and #{pluralize(months, 'month')})"
				end
			end
		end
	end

	def pay_type(type)  
		if type
			"Pay per hour"
		else
			"Fixed pay"
		end
	end

	def object_count(count)
		if count==7
			count-1
		else
			count
		end
	end

	# def end_at(start, duration)
	# 	return start + duration*60*60
	# end

	# def test(s)
	# 	@public_posts =s
	# end

	# def link_to_add_fields(name, f, association, cssClass, title)  
	# 	new_object = f.object.class.reflect_on_association(association).klass.new  
	# 	fields = f.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|  
	# 		render(association.to_s.singularize + "_fields", :f => builder)  
	# 	end  
	# 	link_to name, "#", :onclick => h("add_fields(this, \"#{association}\", \"#{escape_javascript(fields)}\")"), :class => cssClass, :title => title 
	# end  
	
end
