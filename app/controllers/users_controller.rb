class UsersController < ApplicationController

	#FILTERS
	before_action :logged_in_user, only: [:index, :edit, :update]
	before_action :restrict_logged_in_user, only: [:new] #logged in users will not be able to access registration page
	before_action :correct_user, only: [:edit, :update]	#correct users will not be able to edit or update other's profile
	

	def destroy
		User.find(params[:id]).destroy
		flash[:success] = "User deleted"
		redirect_to users_url
	end

	def index
		# @users = User.all
		@users = User.where(:client => false).paginate(page: params[:page], :per_page => 5)
	end

	def new
		if params[:client_value] == nil
			render 'static_pages/signup'
		end
		
		@user = User.new
		session[:isClient] = params[:client_value]
		@user.client = session[:isClient]
		# @user.educations.build
	end

	def create
		@user = User.new(user_params)
		if @user.save
			log_in @user
			# if @user.client 
			# 	flash[:success] = "Welcome to Instahire! You are now a registered client."
			# else
			# 	flash[:success] = "Welcome to Instahire! You are now a registered worker."
			# end
			if @user.client == true 
				redirect_to client_steps_path
			else
				redirect_to worker_steps_path
			end
		else
			render 'new'
		end
	end

	def show
		@user = current_user
		# @search = @user.task_posts.search(params[:q])
		# @search = Task.all.search(params[:q])
		@task_posts = @user.task_posts
	end

	def update
		@user = User.find(params[:id])
		if @user.update_attributes(user_params)
			flash[:success] = "Profile updated"
			redirect_to @user
		else
			render 'edit'
		end
	end

	def edit
		@user = User.find(params[:id])
	end

	private
# Before filters

# Confirms a logged-in user.
# Users who are not logged in will not have an access to index, edit, and update actions
def logged_in_user
	unless logged_in?
		store_location
		flash[:danger] = "Please log in."
		redirect_to login_url
	end
end



# Confirms the correct user.
# Correct user will not have access to edit and update other users.
# Correct user will only have access to edit and update their own.
def correct_user
	@user = User.find(params[:id])
	redirect_to(root_url) unless current_user?(@user)
end

end
