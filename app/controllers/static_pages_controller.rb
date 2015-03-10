class StaticPagesController < ApplicationController
	before_action :restrict_logged_in_user, only: [:signup]
	def home
	end

	def about
	end

	def signup
	end

end
