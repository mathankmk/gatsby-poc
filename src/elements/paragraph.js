import React, { Component } from "react"
import styled from "styled-components"

const paragraph = styled.p`
  font-size: 18px;
  line-height: 1.5em;
`

export default class Paragraph extends Component {
  render() {
    return <paragraph>{this.props.text}</paragraph>
  }
}
