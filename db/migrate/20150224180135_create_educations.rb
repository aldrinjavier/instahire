class CreateEducations < ActiveRecord::Migration
  def change
    create_table :educations do |t|

      t.integer :user_id #FK
      t.string :school_name
      t.string :degree
      t.date :year_started
      t.date :year_finished

      t.timestamps null: false
    end
  end
end
