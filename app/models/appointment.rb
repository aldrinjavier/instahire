class Appointment < ActiveRecord::Base
	#VIRTUAL ATTRIBUTES
	attr_accessor :start_date, :start_time, :end_date, :end_time
	
	#RELATIONSHIPS
	belongs_to :task

	#VALIDATIONS
	validates :start_date, presence: true
	validates :end_date, presence: true
	validates :start_time, presence: true
	validates :end_time, presence: true
	# validates :start_at, presence: true
	# validates :end_at, presence: true
	before_validation :convert_to_datetime
	validate :is_date_nil

	def is_date_nil
		if @start_date.blank? && @end_date.blank? && @start_time.present? && @end_time.present?
			errors.add(:start_date,  "Can't leave blank")
			errors.add(:end_date,  "Can't leave blank")
		end

		if @start_time.blank? && @end_time.blank? && @start_date.present? && @end_date.present?
			errors.add(:start_time,  "Can't leave blank")
			errors.add(:end_time,  "Can't leave blank")
		end
	end

	def start_date
		start_at.strftime("%d/%m/%Y") if start_at.present?	
	end 

	def start_time
		start_at.strftime("%I:%M%p") if start_at.present?
	end

	def start_date=(date)

		unless date.blank?
			@start_date =  Date.strptime(date, "%d/%m/%Y")
		end
	end

	def start_time=(time)

		unless time.blank?
			@start_time = Time.parse(time).strftime("%H:%M:%S")
		end

	end

	def end_date
		end_at.strftime("%d/%m/%Y") if end_at.present?
	end 

	def end_time
		end_at.strftime("%I:%M%p") if end_at.present?
	end

	def end_date=(date)

		unless date.blank?
			@end_date = Date.strptime(date, "%d/%m/%Y")
		end
	end

	def end_time=(time)

		unless time.blank?
			@end_time = Time.parse(time).strftime("%H:%M:%S")
		end
	end

	def convert_to_datetime
		unless @start_date.blank? && @start_time.blank? 
			self.start_at = DateTime.parse("#{@start_date} #{@start_time}")	
		end

		unless @end_date.blank? && @end_time.blank?
			self.end_at = DateTime.parse("#{@end_date} #{@end_time}")
		end
	end

end
