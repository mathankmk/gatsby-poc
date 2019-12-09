import React from "react"
import Paragraph from "../src/elements/paragraph"

import { storiesOf } from "@storybook/react"
import Test from "../src/components/test"

storiesOf("Elements", module).add("Paragraph", () => (
  <Paragraph text="Paragraph" />
))
