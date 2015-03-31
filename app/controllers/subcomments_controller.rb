class SubcommentsController < ApplicationController

	def new
		@response = Response.find(params[:response_id])
		@subcomments = @response.subcomments.all
		@subcomment = @response.subcomments.new
	end

	def create
		@subcomment = Subcomment.new(subcomment_params)
		# @task = @subcomment.response.task
		@task = @subcomment.response.task
		@subcomment.user_id = current_user.id
		@subcomment.save
		respond_to do |format|
			format.html { redirect_to @task }
			format.js
		end
	end

	private
	def subcomment_params
		params.require(:subcomment).permit(:comment_text, :response_id)
	end

end
