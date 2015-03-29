class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :task_id #FKEY
      t.integer :user_id #FKEY
      t.boolean :is_comment
      t.boolean :is_accepted, default: false
      t.integer :negotiate_pay
      t.string :comment_text
      t.timestamps null: false	
    end
  end
end

