import * as React from "react"
import styled from "styled-components"
import { device } from "../helpers"

import Image from "../elements/image"
import Lockup, { LockupContainer } from "./lockup"
import beer from "../images/beer.jpeg"
import Wrapper from "./layout/wrapper"

const Hero = styled.div`
  color: white;
  height: 100vh;
  overflow: hidden;

  @media ${device.laptop} {
    width: 100%;
    height: auto;
    max-height: 100vh;
    overflow: hidden;
    position: relative;
  }

  ${LockupContainer} {
    position: absolute;
    padding-top: 200px;
    width: 100%;
    max-width: 550px;
  }
`

const dummyText = `Some hops is plowed. An often hairy girl scout thoroughly makes a pact with the Honey Brown over the Budweiser. A blood clot makes a pact with the discusting satellite brewery. A lover about the Pilsner Urquell takes a peek at the bottle of beer. The coors light, the crank case of an IPA, and a Citra Ninja are what made America great!`

const hero = props => {
  return (
    <>
      <Hero>
        <Wrapper>
          <Lockup text={dummyText} tag="h1" title="Great IPA" />
        </Wrapper>

        <Image url={beer} />
      </Hero>
    </>
  )
}

export default hero
