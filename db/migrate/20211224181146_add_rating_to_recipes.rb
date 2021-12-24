class AddRatingToRecipes < ActiveRecord::Migration[6.1]
  def change
    add_column :recipes, :rating, :float
  end
end
