class WorksController < ApplicationController

	def update
		@user = current_user
		if @user.update_attributes(user_params)
			flash[:success] = "Work experience was updated."
			redirect_to @user
		else
			render 'edit'
		end
	end

	def edit
		@user = current_user
		@user.works.build if @user.works.empty?
	end
end
