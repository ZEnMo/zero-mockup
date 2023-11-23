// inputWidthAdjuster.js
export const calculateWidth = (valueLength) => {
    const baseWidth = 0.5; // Minimum width 
    const scalingFactor = 1; // Width per character, adjust as needed
    const maxWidth = 9; // Maximum width 
  
    let newWidth = baseWidth + (valueLength * scalingFactor);
    return newWidth > maxWidth ? maxWidth : newWidth;
  };
  
  export const adjustWidth = (inputRef, length) => {
    if (inputRef.current) {
      inputRef.current.style.width = calculateWidth(length) + 'vw';
    }
  };
  