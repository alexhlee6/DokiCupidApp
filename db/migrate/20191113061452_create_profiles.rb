class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.integer :user_id, null: false, unique: true, index: true 
      t.string :fname, null: false, index: true 
      t.integer :zipcode, null: false, index: true 
      t.text :bio, null: false
      t.string :identify_as, null: false, index: true
      t.string :looking_for, null: false, index: true
      t.string :compatibility_answers, null: false 

      t.timestamps
    end
  end
end
