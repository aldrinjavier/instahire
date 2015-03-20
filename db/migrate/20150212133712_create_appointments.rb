class CreateAppointments < ActiveRecord::Migration
	def change
		create_table :appointments do |t|

			t.integer :task_id
			t.string :status
			t.datetime :start_at
			t.datetime :end_at
			
			t.timestamps null: false
		end
	end
end
