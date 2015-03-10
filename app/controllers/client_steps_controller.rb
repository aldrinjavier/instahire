class ClientStepsController < ApplicationController
before_action :client_user, only: [:show, :update]
	include Wicked::Wizard
	steps :basic_info

	def show
		@user = current_user
		render_wizard
	end

	def update
		@user = current_user

		@user.update_attributes(user_params)

		render_wizard @user
	end

	private

	def client_user
		#if the user is worker, redirect to homepage
		unless current_user.client?
			redirect_to(root_url)
		end
	end

end
