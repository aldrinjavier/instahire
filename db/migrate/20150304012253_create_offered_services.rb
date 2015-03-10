class CreateOfferedServices < ActiveRecord::Migration
  def change
    create_table :offered_services do |t|

      t.integer :user_id #FK
      t.integer :subcategory_id #FK
      t.string :title
      t.text :service_description
      t.timestamps null: false
    end
  end
end
