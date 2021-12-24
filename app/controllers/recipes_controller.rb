class RecipesController < ApplicationController

    def index
        render json: Recipe.all
      end
    
      def create
        recipe = @current_user.recipes.create!(recipe_params)
        render json: recipe, status: :created
      end
    
      def update
        recipe = Recipe.find_by(id: params[:id])
        if recipe
        recipe.update(recipe_params)
        render json: recipe
        else
        render json: { error: "spice not found"}, status: :not_found
        end
        end
    
    
    
      def destroy
        recipe = Recipe.find_by(id: params[:id])
        if recipe
        recipe.destroy
        head :no_content
        else
        render json: { error: "Recipe not found"}, status: :not_found
        end
        end
    
      private
    
      def recipe_params
        params.permit(:title, :instructions, :minutes_to_complete, :rating)
      end
    
    end
