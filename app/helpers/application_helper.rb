module ApplicationHelper
	
	def full_title(page_title = '')
		base_title = "Instahire"
		if page_title.empty?
			base_title
		else
			"#{page_title} | #{base_title}"
		end
	end

	def link_to_add_fields(name, f, association)
		new_object = f.object.send(association).klass.new
		id = new_object.object_id
		fields = f.simple_fields_for(association, new_object, child_index: id) do |builder|
			render(association.to_s.singularize + "_form", f: builder)
		end
		link_to(name, '#', class: "add_fields", data: {id: id, fields: fields.gsub("\n", "")})
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
		#It will have week. ie 1 week ago, 2 weeks ago, and 3 weeks ago.
		to_time   = Time.now
		weeks_ago = ((to_time - from_time)/1.week).abs
		[nil, "1 week", "2 weeks", "3 weeks"][weeks_ago] || 
		distance_of_time_in_words(from_time, to_time)
	end

	# def link_to_add_fields(name, f, association, cssClass, title)  
	# 	new_object = f.object.class.reflect_on_association(association).klass.new  
	# 	fields = f.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|  
	# 		render(association.to_s.singularize + "_fields", :f => builder)  
	# 	end  
	# 	link_to name, "#", :onclick => h("add_fields(this, \"#{association}\", \"#{escape_javascript(fields)}\")"), :class => cssClass, :title => title 
	# end  
	
end
