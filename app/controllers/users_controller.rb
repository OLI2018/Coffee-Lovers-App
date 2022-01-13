class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
      # create! exceptions will be handled by the rescue_from ActiveRecord::RecordInvalid code
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    end
  
    def show
      render json: @current_user
    end
  
    private
  
    def user_params
      params.permit(:username, :password, :password_confirmation, :image_url, :bio)
    end
  
  end
