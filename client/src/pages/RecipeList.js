import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import RecipeItem from "./RecipeItem";

function RecipeList( ) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json())
      .then(setRecipes);
  }, []);

  function handleDeleteSpice(deletedSpice) {
    setRecipes((recipes) =>
    recipes.filter((recipe) => recipe.id !== deletedSpice.id)
    );
  }


  function handleUpdateSpice(updatedSpice) {
    setRecipes((recipes) =>
    recipes.map((recipe) => {
        return recipe.id === updatedSpice.id ? updatedSpice : recipe;
      })
    );
  }




  return (
    <Wrapper>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeItem 
                  key={recipe.id}
                  recipe = {recipe}
                  onUpdateSpice={handleUpdateSpice}
                  onDeleteSpice={handleDeleteSpice}

                  />
        ))
      ) : (
        <>
          <h2>No Recipes Found</h2>
          <Button as={Link} to="/new">
            Make a New Recipe
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

const Buttonnew = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: red;
  color: black;
  border: 2px solid red;

`;



{/* <Wrapper>
{recipes.length > 0 ? (
  recipes.map((recipe) => (
    <Recipe key={recipe.id}>
      <Box>
        <h2>{recipe.title}</h2>
     
        <p>
          <em>Time to Complete: {recipe.minutesToComplete} minutes</em>
          &nbsp;·&nbsp;
          <cite>By {recipe.user.username}</cite>
        </p>
        <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
        <Buttonnew onClick={handleDeleteSpice}>Delete Me</Buttonnew>
        <Buttonnew>Edit Me</Buttonnew>
        <Buttonnew>Rate Me</Buttonnew>
      </Box>

    </Recipe>
  ))
) : (
  <>
    <h2>No Recipes Found</h2>
    <Button as={Link} to="/new">
      Make a New Recipe
    </Button>
  </>
)}
</Wrapper> */}




export default RecipeList;
