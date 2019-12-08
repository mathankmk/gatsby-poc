import React, { useState } from "react";
import styled from "styled-components";
import Image from "../../elements/image";
import Lockup from "../lockup";
import Like from "./like-button";
import PropTypes from "prop-types";

const BeerCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
  height: 100%;
  margin: auto;
`;

const ImagContainer = styled.div`
  padding: 40px 20px;
  background-color: #2897b1;
  position: relative;
  margin-top: auto;

  img {
    height: 100px;
    width: auto;
    display: block;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  padding: 20px;
`;

function Beercard(props) {
  const [active, setActive] = useState(false);

  const changeLike = () => {
    setActive(!active);
  };

  return (
    <BeerCard>
      <Content>
        <Lockup text={props.description} tag="h3" title={props.title} />
      </Content>
      <ImagContainer>
        <Like liked={active} action={changeLike} />
        <Image url={props.image} />
      </ImagContainer>
    </BeerCard>
  );
}

Beercard.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Beercard;
