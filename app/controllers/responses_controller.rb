class ResponsesController < ApplicationController
	# before_filter :authorise
	def create
		@task = Task.find(params[:task_id])
		@response = @task.responses.build(response_params)
		@response.user_id = current_user.id
		@response.save
		respond_to do |format|
			flash[:success] = "response was createad"
			format.html { redirect_to @task}			
		end
	end

	def update
		@response = Response.find(params[:id])
		@task = @response.task

		#update the old accepted offer
		#find the response which is_accepted attribute is true
		#@previously_accepted array var will always contain either 1 or 0 element
		@previously_accepted = @task.responses.where(is_accepted: true)
		#if it contains an element, iterate the array and update that 1 element in the array
		if @previously_accepted.any?
			@previously_accepted.each do |e|		
				e.update_attribute(:is_accepted, false)
			end
		end

		#update the newly accepted offer from response
		@response.update_attributes(response_params)
		respond_to do |format|
			format.html { redirect_to @task }
		end
	end

	def destroy
		@response = Response.find(params[:id]).destroy
		@task = @response.task
		flash[:success] = "Response deleted"
		redirect_to @task
	end

	private
	def response_params
		params.require(:response).permit(:comment_text, :negotiate_pay, :is_accepted, :is_comment)
	end

end
