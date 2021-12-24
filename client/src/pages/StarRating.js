import { useRef } from "react";
import styled from "styled-components";

function StarRating({ percentage, onClick }) {
  const widthPct = `${percentage * 100}%`;
  const elementRef = useRef();

  function handleClick(e) {
    onClick(
      e.nativeEvent.offsetX / elementRef.current.getBoundingClientRect().width
    );
  }

  return (
    <Div className="star-rating" onClick={handleClick} ref={elementRef}>
      <Foreground className="foreground" style={{ width: widthPct }}>
        ★★★★★
      </Foreground>
      <Background className="background">★★★★★</Background>
    </Div>
  );
}

const Div = styled.div`
color: rgba(0, 0, 0, 0.1);
font-size: 1.5rem;
position: relative;
display: inline-block;
cursor: pointer;
`;

const Foreground = styled.span`
color: #ffcd00;
position: absolute;
display: flex;
overflow: hidden;
`;

const Background = styled.span`
display: flex;
`;

export default StarRating;
