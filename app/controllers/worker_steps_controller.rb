class WorkerStepsController < ApplicationController
	before_action :worker_user, only: [:show, :update]

	include Wicked::Wizard

	steps :basic_info, :education_experience, :work_experience, :offered_service

	def show
		@user = current_user
		case step
		when :basic_info
			# if area id is present, assign it to county_id so that when previous step is clicked, 
			# a value will be selected in county and area id.
			@user.county_id = @user.county.id if @user.area_id?

		when :education_experience
			@user.educations.build if @user.educations.count < 1

		when :work_experience
			@user.works.build if @user.works.count < 1

		when :offered_service
			@user.offered_services.build if @user.offered_services.count < 1

		end
		render_wizard
	end

	def update

		
		@user = current_user

		@user.update_attributes(user_params)

		render_wizard @user
	end

	private

	def worker_user
		#if the user is client, redirect to homepage
		if current_user.client?
			redirect_to(root_url)
		end
	end
end
