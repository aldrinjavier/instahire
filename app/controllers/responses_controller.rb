class ResponsesController < ApplicationController
	def create
		@task = Task.find(params[:task_id])
		@response = @task.responses.create(response_params)
		@response.user_id = current_user.id
		@response.save
		respond_to do |format|
			format.html { redirect_to @task }
			format.js
		end
	end

	def update
		@response = Response.find(params[:id])
		@task = @response.task
		@response.update_attributes(response_params)
		respond_to do |format|
			format.html { redirect_to @task }
			format.js
		end
	end

	private
	def response_params
		params.require(:response).permit(:comment_text, :negotiate_pay, :is_accepted)
	end

end
