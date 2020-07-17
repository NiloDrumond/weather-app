import React from 'react';

import { Title } from './styles';

const HeaderTitle = ({ children, ...rest }) => (
  <Title {...rest}>{children}</Title>
);

export default HeaderTitle;
