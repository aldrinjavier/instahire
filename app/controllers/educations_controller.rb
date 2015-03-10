class EducationsController < ApplicationController
	def update
		@user = current_user
		if @user.update_attributes(user_params)
			flash[:success] = "Profile updated"
			redirect_to(root_url)
		else
			render 'edit'
		end
	end

	def edit
		@user = current_user
	end
end
