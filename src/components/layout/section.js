import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SectionWrapper = styled.section`
  margin-bottom: 40px;
`;
const section = props => {
  return <SectionWrapper>{props.children}</SectionWrapper>;
};
section.propTypes = {
  children: PropTypes.any.isRequired
};
export default section;
