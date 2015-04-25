class CataloguesController < ApplicationController

	def search
		index
		render :index
	end

	def index

		result = []
		@search.result.each_with_index do |t, index|
			if t.is_pay_per_hour 
				if t.appointments.first.end_at.present?
					result.push t
				end
			else
				result.push t
			end
		end
		@public_posts = result
	end

end
