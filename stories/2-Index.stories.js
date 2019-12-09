import React from 'react';
// import ReactDom from "react-dom";
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Header } from '../src/components/header';

export default {
  title: 'Index',
};

export const text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
