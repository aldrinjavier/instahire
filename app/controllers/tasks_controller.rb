class TasksController < ApplicationController

	def new
		@task = current_user.task_posts.build
		@task.appointments.build
	end

	def create
		@task = current_user.task_posts.build(task_params)
		if @task.save
			flash[:success] = "Micropost created!"
			redirect_to @current_user
		else
			render 'new'
		end
	end

	private
	def task_params
		params.require(:task).permit(:category_id, :subcategory_id, :title, :description, :pay_offer, :is_pay_per_hour, :county_id, :area_id, appointments_attributes: [:id, :start_date, :start_time, :duration])
	end

end
