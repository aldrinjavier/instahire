class CreateAreas < ActiveRecord::Migration
	def change
		create_table :areas do |t|

			t.integer :county_id
			t.string :name			
		end
	end
end
