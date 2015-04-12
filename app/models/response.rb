class Response < ActiveRecord::Base
	belongs_to :user
	belongs_to :task
	has_many :subcomments, dependent: :destroy
	default_scope -> { order('created_at DESC') }

end
