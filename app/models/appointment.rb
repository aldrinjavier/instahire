class Appointment < ActiveRecord::Base
	#VIRTUAL ATTRIBUTES
	attr_accessor :start_date, :start_time, :duration
	
	#RELATIONSHIPS
	belongs_to :task

	#VALIDATIONS
	before_validation :convert_to_start_at
	before_validation :convert_to_end_at
	validates :duration, presence: true
	validate :is_date_nil
	validate :time_collision_validation, if: :is_appointments_not_empty
	validate :check_time
	# after_save :save_start_date

	#check if a data in appointment table exists
	def is_appointments_not_empty
		Appointment.all.present? 
	end

	#before_validation: concatenates values in start_date and start_time fields
	def convert_to_start_at
		unless @start_date.blank? && @start_time.blank? 
			self.start_at = Time.parse("#{@start_date} #{@start_time}") + (1.hours)
		end
	end

	#before_validation: concatenates start_date and start_time fields plus the duration to make end_at's value
	def convert_to_end_at
		if @start_date.present? && @start_time.present? && @duration.present?
			self.end_at = Time.parse("#{@start_date} #{@start_time}") + (@duration.to_f.hours+ (1.hours))
		end
	end

	#validation: check if start_date and start_time input is a past time and less than 12 hours from now
	def check_time	
		return unless errors.blank? #this will ensure the right error count on top area
		if @start_date.present? && @start_time.present?
			#concatenate start_date and start_time
			start_at = Time.parse("#{@start_date} #{@start_time}") 
			#variable that holds the time 12 hours from now
			start_at_plus_12_hours =  Time.now + (12.hours)
			if start_at <= Time.now
				errors.add(:start_date, "Cannot input past times")
			elsif start_at < start_at_plus_12_hours 
				errors.add(:start_date, "Input plus 12 hours")
			end
		end
	end

	#before_validation: concatenates start_date and start_time fields plus the duration to make end_at's value
	def time_collision_validation
		appointments = Appointment.all

		#if duration is equals to 0, it means it is fixed pay. 
		#Here, duration is set to 0 so it will not be validated 
		#This will execute if is_pay_per hour is set to 0
		if @start_date.present? && @start_time.present? && duration == 0.to_s
			start_at = Time.parse("#{@start_date} #{@start_time}") + (1.hours)
			
			appointments.each do |a|

				# compare fixed-pay input to pay per hour appointment
				if a.task.is_pay_per_hour && start_at < a.end_at && start_at >= a.start_at 
					errors.add(:start_time, "hello")
					errors.add(:start_date, "An appointment is already 
						set at #{a.start_at.strftime("%I:%M%p")}, #{a.start_at.strftime("%d/%m/%Y")} 
						to #{a.end_at.strftime("%I:%M%p")} on #{a.end_at.strftime("%d/%m/%Y")}. 
						Please select a different date or time.")
					break
					

					#compare fixed-pay input to fixed pay appointment
				elsif !a.task.is_pay_per_hour  && start_at == a.start_at 
					errors.add(:start_date, "A fixed pay appointment is aleady set at #{a.start_at.strftime("%I:%M%p")}
						, #{a.start_at.strftime("%d/%m/%Y")}. 
						Please select a different date or time.")
					break
				end #if-else
			end #do loop


			#Here, duration should be present and will be always validated
			#This will execute if is_pay_per hour is set to 1
		elsif @start_date.present? && @start_time.present? && duration.present?
			start_at = Time.parse("#{@start_date} #{@start_time}") + (1.hours)
			end_at = Time.parse("#{@start_date} #{@start_time}") + (@duration.to_f.hours+ (1.hours))

			appointments.each do |a|

				# compare pay per hour input to pay per hour appointment
				if a.task.is_pay_per_hour && start_at < a.end_at  && a.start_at < end_at 

					errors.add(:start_time, "hello")
					errors.add(:start_date, "An appointment already 
						exists at #{a.start_at.strftime("%I:%M%p")}, #{a.start_at.strftime("%d/%m/%Y")} 
						to #{a.end_at.strftime("%I:%M%p")} on #{a.end_at.strftime("%d/%m/%Y")}. 
						Please select a different date or time.")
					break

				# 	#compare pay per hour input to fixed pay appointment
			elsif !a.task.is_pay_per_hour && a.start_at <= end_at  && a.start_at >= start_at

				errors.add(:start_time)
				errors.add(:start_date, "A fixed pay appointment is aleady set at #{a.start_at.strftime("%I:%M%p")}
					, #{a.start_at.strftime("%d/%m/%Y")}. 
					Please select a different date or time.")
				break				
			end			
		end 
	end 
end 

	#validation: check if start date and start time is blank
	#will handle correct validation when one is blank and the other is present
	def is_date_nil
		if @start_date.blank? && @start_time.blank?
			errors.add(:start_date,  "Start date can't be blank")
			errors.add(:start_time,  "Start time can't be blank")
		end

		if @start_date.blank? && @start_time.present?
			errors.add(:start_date,  "Start date can't be blank")
		end

		if  @start_time.blank? && @start_date.present?
			errors.add(:start_time,  "Start time can't be blank")
		end
	end


	###############GETTER and SETTERS################
	
	#duration setter
	def duration=(duration)
		@duration = duration if duration.present?
	end	

	#start_date setter
	def start_date=(date)
		@start_date = Date.strptime(date, "%d/%m/%Y") if date.present?
	end

	#start_date getter
	def start_date
		unless @start_date.blank?
			@start_date.strftime("%d/%m/%Y")
		end
		# start_at.strftime("%d/%m/%Y") if start_at.present? 
	end 

	#start_time setter
	def start_time=(time)
		@start_time = Time.parse(time).strftime("%H:%M:%S") if time.present?
	end

	#start_time getter
	def start_time
		@start_time || start_at.strftime("%I:%M%p")  if start_at.present? 
	end

	# def start_date
	# 		@start_date.strftime("%d/%m/%Y") if start_at.present?  # || start_at.strftime("%d/%m/%Y") if start_at.present? 
	# 	end 

	# def save_start_date
	# 	@start_date = Date.strptime(@start_date, "%d/%m/%Y") if @start_date.present?
	# end

	# def save_start_date
	# 	@start_date = Date.parse(@start_date).strftime("%d/%m/%Y")if @start_date.present?

	# end

end

