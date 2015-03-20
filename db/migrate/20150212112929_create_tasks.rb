class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|

      t.integer :client_id #FK
      t.integer :worker_id #FK
      t.integer :subcategory_id #FK
      t.integer :area_id #FK
      t.string :title
      t.text :description
      t.string :location
      t.string :post_type #catalogue post or direct post
      t.boolean :is_pay_per_hour #0 if fixed pay (false), 1 if pay per hour (true)
      t.integer :pay_offer 
      t.integer :negotiated_pay
      t.datetime :expiry_date
   
      t.timestamps null: false
    end
  end
end
