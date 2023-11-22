// AnimationContext.js
import React from 'react';

const AnimationContext = React.createContext({
  isRising: true,
  triggerRise: () => {}
});

export default AnimationContext;
