class CreateSubcategories < ActiveRecord::Migration
	def change
		create_table :subcategories do |t|

			t.integer :category_id
			t.string :name
		end
	end
end
