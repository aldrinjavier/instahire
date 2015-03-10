class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|

      t.integer :user_id #FK
      t.string :company_name
      t.string :work_title
      t.date :date_started
      t.date :date_finished
      t.timestamps null: false
    end
  end
end
