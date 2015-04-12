class TasksController < ApplicationController

	before_action :logged_in_user_worker, only: [:new] #worker will not be able to acces tasks/new

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

	def show
		@task = Task.find(params[:id])
		# @response = @task.responses.build if logged_in?
		@responses = @task.responses.all

		@responses.each do |r|
			if r.is_accepted == true
				@accepted_offer = r
				break
			end
		end

	end

	private
	def task_params
		params.require(:task).permit(:category_id, :subcategory_id, :title, :description, :pay_offer, :is_pay_per_hour, :county_id, :area_id, appointments_attributes: [:id, :start_date, :start_time, :duration])
	end

	def logged_in_user_worker
		unless current_user.client?
			redirect_to(root_url)
		end
	end

end
