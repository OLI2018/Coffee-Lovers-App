class RecipesController < ApplicationController
  def index
    render json: Recipe.all.preload(:user), current_ability: current_ability
    end
 
    def create
      # create! exceptions will be handled by the rescue_from ActiveRecord::RecordInvalid code
      recipe = @current_user.recipes.create!(recipe_params)
      render json: recipe, status: :created, current_ability: current_ability
    end

  def edit
    recipe = Recipe.find_by(id: params[:id])
    if recipe
      render json: recipe, current_ability: current_ability
    else
      render json: { error: "Recipe not found"}, status: :not_found
    end
  end

    def update
      recipe = Recipe.find_by(id: params[:id])
      if recipe
      recipe.update(recipe_params)
      render json: recipe, current_ability: current_ability
      else
      render json: { error: "Recipe not found"}, status: :not_found
      end
      end
  
  
    def destroy
      recipe = Recipe.find_by(id: params[:id])
      if recipe
      recipe.destroy
      head :no_content
        if can? :destroy, recipe
        recipe.destroy
        head :no_content
        else
        render json: { error: "Cannot destroy the recipe"}, status: :forbidden
        end
      else
      render json: { error: "Recipe not found"}, status: :not_found
      end
      end
  
    private
  
    def recipe_params
      params.permit(:title, :instructions, :minutes_to_complete, :rating)
    end
  
  end