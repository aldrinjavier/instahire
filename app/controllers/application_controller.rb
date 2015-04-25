class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_filter :set_global_search_variable

  def set_global_search_variable
    # select all task with all upcoming appointments
    # added + 1 hour to match the right time (For some reason, time is 1 hour behind in my laptop)
    @search = Task.joins(:appointments).where(["start_at >= ?", DateTime.now + 1.hours]).search(params[:q])

    Task.current = @search
  end

  protect_from_forgery with: :exception
  include SessionsHelper

  def user_params
   params.require(:user).permit(:remove_picture, :picture_cache, :picture, :first_name, :last_name, 
    :email, :password, :password_confirmation, :personal_bio, :county_id, :area_id, :client,
    educations_attributes: [:id, :school_name, :degree, :year_started, :year_finished, :_destroy], 
    works_attributes: [:id, :company_name, :work_title, :date_started, :date_finished, :is_currently_working, :_destroy], 
    offered_services_attributes: [:id, :user_id, :subcategory_id, :title, :service_description, :_destroy])
 end

# Before filters

# Used in users and static_pages controllers
# Logged in user will not be able to access the specified action
def restrict_logged_in_user
  if logged_in?
    redirect_to(root_url)
  end
end


end
