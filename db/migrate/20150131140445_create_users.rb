class CreateUsers < ActiveRecord::Migration
	def change
		create_table :users do |t|

			t.integer :area_id #FKEY
			t.string :email
			t.string :password_digest
			t.string :first_name
			t.string :last_name
			t.string :personal_bio
			t.boolean :client
			t.timestamps null: false
			
		end
	end
end
