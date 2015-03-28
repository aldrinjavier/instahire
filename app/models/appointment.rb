class Appointment < ActiveRecord::Base
	#VIRTUAL ATTRIBUTES
	attr_accessor :start_date, :start_time, :duration
	
	#RELATIONSHIPS
	belongs_to :task

	#VALIDATIONS
	before_validation :convert_to_datetime
	validates :duration, presence: true
	validate :is_date_nil


	def convert_to_datetime
		unless @start_date.blank? && @start_time.blank? 
			self.start_at = Time.parse("#{@start_date} #{@start_time}")			
		end
	end

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

	def start_date=(date)
		@start_date =  Date.strptime(date, "%d/%m/%Y") if date.present?
	end

	def start_time=(time)
		@start_time = Time.parse(time).strftime("%H:%M:%S") if time.present?
	end

	def start_date
		unless @start_date.blank?
			@start_date.strftime("%d/%m/%Y") 
		end
		start_at.strftime("%d/%m/%Y") if start_at.present? 
	end 

	def start_time
		@start_time || start_at.strftime("%I:%M%p") if start_at.present? 
	end

	def duration=(duration)
		@duration = duration
	end

end
