import React from 'react';

export default function getDimensions(self) {
  const ref = React.useRef(null); // Reference to DOM element created by component
  const [dimensions, setDimensions] = React.useState({
    padding: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      vert: 0,
      hor: 0,
    },
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      vert: 0,
      hor: 0,
    },
    width: 0,
    height: 0,
    outerWidth: 0,
    outerHeight: 0,
    innerWidth: 0,
    innerHeight: 0,
  }); // State object to store all dimensions that may be digested in component

  // Callback function to set dimensions when element is updated
  const handleUpdate = () => {
    if (self) {
      console.log(`Resize occured for ${self}`, ref, dimensions);
    }
    const styles = getComputedStyle(ref.current);
    if (ref.current.offsetHeight !== dimensions.height) {
      let dim = {
        padding: {
          top: parseInt(styles.paddingTop.slice(0, -2)),
          right: parseInt(styles.paddingRight.slice(0, -2)),
          left: parseInt(styles.paddingLeft.slice(0, -2)),
          bottom: parseInt(styles.paddingBottom.slice(0, -2)),
        },
        margin: {
          top: parseInt(styles.marginTop.slice(0, -2)),
          right: parseInt(styles.marginRight.slice(0, -2)),
          left: parseInt(styles.marginLeft.slice(0, -2)),
          bottom: parseInt(styles.marginBottom.slice(0, -2)),
        },
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      };
      dim.padding.vert = dim.padding.top + dim.padding.bottom;
      dim.padding.hor = dim.padding.left + dim.padding.right;
      dim.margin.vert = dim.margin.top + dim.margin.bottom;
      dim.margin.hor = dim.margin.left + dim.margin.right;
      dim.outerHeight = dim.height + dim.margin.vert;
      dim.outerWidth = dim.width + dim.margin.hor;
      dim.innerHeight = dim.height - dim.padding.vert;
      dim.innerWidth = dim.width - dim.padding.hor;
      setDimensions(dim);
    }
  };

  // Resize observer that fires callback on element update
  const observer = new ResizeObserver(handleUpdate);
  React.useEffect(() => {
    observer.observe(ref.current);

    return function cleanup() {
      observer.disconnect();
    };
  });

  // Return ref and dimensions state needed in component
  return [ref, dimensions];
}
