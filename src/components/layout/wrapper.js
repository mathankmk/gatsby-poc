import * as React from "react";
import styled from "styled-components";
import { device } from "../../helpers";
import PropTypes from "prop-types";

export const WrapperFrame = styled.div`
  width: 75%;
  position: relative;
  margin: 0 auto;
  height: auto;

  @media ${device.laptop} {
    width: 90%;
    max-width: 1440px;
  }
`;

const wrapper = props => <WrapperFrame>{props.children}</WrapperFrame>;

wrapper.propTypes = {
  children: PropTypes.any.isRequired
};

export default wrapper;
