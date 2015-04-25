class AppointmentsController < ApplicationController

	def edit

		@appointment = Appointment.find(params[:id])
		@task = @appointment.task
		@appointment.start_date = @appointment.start_at.strftime("%d/%m/%Y")
		start_at = @appointment.start_at
		end_at = @appointment.end_at
				

		if @task.is_pay_per_hour
			@appointment.duration = ((end_at - start_at) / 3600).round
		else
			@appointment.duration = 0
		end
	end

	def update
		@appointment = Appointment.find(params[:id])
		@task = @appointment.task

		if @appointment.update_attributes(appointment_params)
			flash[:success] = "Task updated"
			redirect_to @task
		else
			render 'edit'
		end
	end

	def appointment_params
		params.require(:appointment).permit(:id, :start_date, :start_time, :duration, :appointment_id, :is_pay_per_hour)
	end
end
