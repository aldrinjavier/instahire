# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150328203423) do

  create_table "appointments", force: :cascade do |t|
    t.integer  "task_id",    limit: 4
    t.string   "status",     limit: 255
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "areas", force: :cascade do |t|
    t.integer "county_id", limit: 4
    t.string  "name",      limit: 255
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "counties", force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "educations", force: :cascade do |t|
    t.integer  "user_id",       limit: 4
    t.string   "school_name",   limit: 255
    t.string   "degree",        limit: 255
    t.date     "year_started"
    t.date     "year_finished"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "offered_services", force: :cascade do |t|
    t.integer  "user_id",             limit: 4
    t.integer  "subcategory_id",      limit: 4
    t.string   "title",               limit: 255
    t.text     "service_description", limit: 65535
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  create_table "responses", force: :cascade do |t|
    t.integer  "task_id",       limit: 4
    t.integer  "user_id",       limit: 4
    t.boolean  "is_comment",    limit: 1
    t.boolean  "is_accepted",   limit: 1,   default: false
    t.integer  "negotiate_pay", limit: 4
    t.string   "comment_text",  limit: 255
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  create_table "subcategories", force: :cascade do |t|
    t.integer "category_id", limit: 4
    t.string  "name",        limit: 255
  end

  create_table "subcomments", force: :cascade do |t|
    t.integer  "response_id",  limit: 4
    t.integer  "user_id",      limit: 4
    t.string   "comment_text", limit: 255
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.integer  "client_id",       limit: 4
    t.integer  "worker_id",       limit: 4
    t.integer  "subcategory_id",  limit: 4
    t.integer  "area_id",         limit: 4
    t.string   "title",           limit: 255
    t.text     "description",     limit: 65535
    t.string   "location",        limit: 255
    t.string   "post_type",       limit: 255
    t.boolean  "is_pay_per_hour", limit: 1
    t.integer  "pay_offer",       limit: 4
    t.integer  "negotiated_pay",  limit: 4
    t.datetime "expiry_date"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "users", force: :cascade do |t|
    t.integer  "area_id",         limit: 4
    t.string   "email",           limit: 255
    t.string   "password_digest", limit: 255
    t.string   "first_name",      limit: 255
    t.string   "last_name",       limit: 255
    t.string   "personal_bio",    limit: 255
    t.boolean  "client",          limit: 1
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "remember_digest", limit: 255
  end

  create_table "works", force: :cascade do |t|
    t.integer  "user_id",       limit: 4
    t.string   "company_name",  limit: 255
    t.string   "work_title",    limit: 255
    t.date     "date_started"
    t.date     "date_finished"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

end
