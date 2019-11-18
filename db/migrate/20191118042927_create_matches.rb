class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.integer :user_id, null: false, index: true
      t.integer :requested_user_id, null: false, index: true
      t.boolean :is_matched, default: false

      t.timestamps
    end
    add_index :matches, [:user_id, :requested_user_id], unique: true
  end
end
