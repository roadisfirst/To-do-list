import React from 'react';

const AnimationContext = React.createContext({
    withAnimation: false,
    start: () => {},
    stop: () => {}
})

export default AnimationContext;