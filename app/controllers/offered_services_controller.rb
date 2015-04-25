class OfferedServicesController < ApplicationController

	def update
		@user = current_user
		if @user.update_attributes(user_params)
			flash[:success] = "Offered services was updated."
			redirect_to @user
		else
			render 'edit'
		end
	end

	def edit
		@user = current_user
		@user.offered_services.build if @user.offered_services.empty?
	end
end
