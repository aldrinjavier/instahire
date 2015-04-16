class AddIsCurrentlyWorkingToWorks < ActiveRecord::Migration
  def change
    add_column :works, :is_currently_working, :boolean
  end
end
