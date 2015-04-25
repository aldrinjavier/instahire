class CataloguesController < ApplicationController

	def search
		index
		render :index
	end

	def index
		@public_posts = @result
	end

end
