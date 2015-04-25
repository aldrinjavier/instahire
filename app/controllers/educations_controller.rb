class EducationsController < ApplicationController
	def update
		@user = current_user
		if @user.update_attributes(user_params)
			flash[:success] = "Education was updated."
			redirect_to @user
		else
			render 'edit'
		end
	end

	def edit
		@user = current_user
		@user.educations.build if @user.educations.empty?
	end
end
