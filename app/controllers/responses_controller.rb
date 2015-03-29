class ResponsesController < ApplicationController
	def create
		@task = Task.find(params[:task_id])
		@response = @task.responses.create(response_params)
		@response.user_id = current_user.id
		@response.save
		respond_to do |format|
			format.html { redirect_to @task }
		end
	end

	private
	def response_params
		params.require(:response).permit(:comment_text, :negotiate_pay)
	end

end
