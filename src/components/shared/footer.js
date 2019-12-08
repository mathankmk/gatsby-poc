import * as React from "react"
import styled from "styled-components"
import theme from "../../variables"

import Logo from "../logo"

const FooterWrapper = styled.footer`
  display: block;
  background-color: #050c0e;
  padding: 50px 0;
  margin-top: 40px;
`

const Copyright = styled.div`
  color: white;
  text-align: center;
  background-color: #182629;
  padding: 20px;
  font-size: 14px;
`

const footer = props => {
  return (
    <>
      <FooterWrapper>
        <Logo
          background={"transparent"}
          color={theme.white}
          viewBox="0 0 54 74"
        />
      </FooterWrapper>
      <Copyright>Copyright Foolproof 2019</Copyright>
    </>
  )
}

export default footer
