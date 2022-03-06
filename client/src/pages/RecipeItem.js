import { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Box, Button } from "../styles";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

function RecipeItem ({recipe, onDeleteSpice, onUpdateSpice } ) {
  const [isLoading, setIsLoading] = useState(false);

    const {id, rating } = recipe; 
   
    function handleDeleteSpice() {
      setIsLoading(true);
        fetch(`/recipes/${id}`, {
          method: "DELETE",
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            onDeleteSpice(recipe);
          }
        });
      }

      function handleUpdateRating(pct) {
        const newRating = pct * 5;
        fetch(`/recipes/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: newRating }),
        })
          .then((r) => r.json())
          .then(onUpdateSpice);
      }

      function destroyButton(recipe) {
        return recipe.can_destroy ? (
          <Button variant="fill" color="primary" onClick={handleDeleteSpice}>
            {isLoading ? "Loading..." : "Delete Recipe"}
          </Button>
        ) : (
          <Button variant="disabled" disabled="disabled">{isLoading ? "Loading..." : "Delete Recipe"}</Button>
        );
      }

      function editButton(recipe) {
        return recipe.can_edit ? (
          <Button as={Link} to={ `/edit/${recipe.id}` }>Edit</Button>
        ) : (
          <Button variant="disabled" disabled="disabled">Edit</Button>
        );
      }

      return (
               
                <Box>
                  <h2>{recipe.title}</h2>
                     
                  <p>
                    <em>Time to Complete: {recipe.minutes_to_complete} minutes</em>
                    &nbsp;·&nbsp;
                    <cite>By <b> {recipe.user.username} </b> </cite>                  
                  </p>

                   <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
                  {/* <Button variant="fill" color="primary" onClick={handleDeleteSpice}>
                  {isLoading ? "Loading..." : "Delete Recipe"} </Button> */}
                  {editButton(recipe)}
                  {destroyButton(recipe)}
                  {/* <Buttonnew onClick={handleDeleteSpice}>Delete Me</Buttonnew> */}

               Rating {" "}
          <StarRating percentage={rating / 5} onClick={handleUpdateRating} />

                </Box>
    
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
      border-radius: 5px;
      padding: 0.5rem 0;
      margin: 0.5rem 1rem;
      width: 11rem;
      background: indigo;
      color: white;
      border: 2px solid indigo;
      cursor: pointer;
    
    `;
    

    export default RecipeItem;