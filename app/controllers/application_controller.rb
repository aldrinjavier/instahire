class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper
  def user_params
  	params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :personal_bio, :county_id, :area_id, :client, educations_attributes: [:id, :user_id, :school_name, :degree, :year_started, :year_finished, :_destroy], works_attributes: [:id, :user_id, :company_name, :work_title, :date_started, :date_finished], offered_services_attributes: [:id, :user_id, :subcategory_id, :title, :service_description])
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
