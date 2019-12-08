import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../../helpers";

const GridContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const GridElement = styled.div`
  width: 100%;
  @media ${device.tablet} {
    max-width: 50%;
  }
  @media ${device.laptop} {
    max-width: ${props => (props.gridColumns === 2 ? "50%" : "33.3%")};
  }
`;

const Grid = props => {
  const { children, columns } = props;
  return (
    <GridContainer>
      {children.map((child, index) => (
        <GridElement key={index} gridColumns={columns}>
          {child}
        </GridElement>
      ))}
    </GridContainer>
  );
};

Grid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Grid;
