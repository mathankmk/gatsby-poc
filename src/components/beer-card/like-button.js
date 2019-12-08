import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LikeButton = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  outline: none;
`;

const Icon = styled.svg`
  width: 32px;
  height: 32px;
  stroke: white;
  stroke-width: 2px;
  fill: ${props => (props.liked ? "white" : "transparent")};
`;

const like = props => {
  return (
    <LikeButton onClick={props.action}>
      <Icon liked={props.liked}>
        <path
          id="heart-icon"
          d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,13.159-10.399,14-0.454c1.011-9.938,14-8.903,14,0.454
	C30,20.335,16,28.261,16,28.261z"
        />
      </Icon>
    </LikeButton>
  );
};

like.propTypes = {
  liked: PropTypes.bool.isRequired
};
export default like;
