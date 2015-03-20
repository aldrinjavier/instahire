class CataloguesController < ApplicationController

	def search
		index
		render :index
	end

	def index
		@public_posts = @search.result.includes(:subcategory)
	end

end
