class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :instructions, :minutes_to_complete, :rating
  attribute :can_destroy, if: :current_ability
  attribute :can_edit, if: :current_ability
  has_one :user

 def can_destroy
 current_ability.can?(:destroy, object)
 end
 
def can_edit
    current_ability.can?(:update, object)
end

 def current_ability
 @instance_options[:current_ability]
 end

end
