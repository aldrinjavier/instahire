class CreateSubcomments < ActiveRecord::Migration
  def change
    create_table :subcomments do |t|
      t.integer :response_id #FKEY
      t.integer :user_id #FKEY
      t.string :comment_text
      t.timestamps null: false
    end
  end
end
