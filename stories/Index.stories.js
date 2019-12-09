import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import Test from "../src/components/test"
storiesOf("Index", module)
  .add("primary", () => <Test onClick={action("clicked")} label="Primary" />)
  .add("secondary", () => (
    <Test onClick={action("clicked")} label="Secondary" />
  ))
  .add("tertiary", () => <Test onClick={action("clicked")} label="Tertiary" />)
