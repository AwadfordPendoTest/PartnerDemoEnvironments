import React from 'react';
import PropTypes from 'prop-types';

import MuiGrid from '@mui/material/Grid';

import ContentTile from './ContentTile';

const supportedComponents = {
  Grid: MuiGrid,
  ContentTile: ContentTile,
};

const PageContent = (props) => {
  // Update document title based on current route
  React.useEffect(() => {
    document.title = props.title || '';
  }, [props.title]);

  function renderPageContent(content, key) {
    return content.map((d, i) => {
      let newKey = `${key}-${d.componentName}${i}${
        d?.opts?.content?.opts?.dataUrl
          ? `-${d?.opts?.content?.opts?.dataUrl}`
          : ''
      }`;

      if (d.componentName) {
        let Component = supportedComponents[d.componentName];

        return (
          <Component
            sx={{ ...d.styles }}
            {...d.opts}
            id={d.id}
            className={d.classes}
            key={newKey}
            header_height={props.headerHeight}
            footer_height={props.footerHeight}
            container_offset={props.containerOffset}
          >
            {d.contents ? renderPageContent(d.contents, newKey) : ''}
          </Component>
        );
      } else {
        return (
          <p key={newKey}>
            No Content Set in Page Config. Please update /src/common/Config.js
          </p>
        );
      }
    });
  }

  return renderPageContent(props.contents, 'root');
};

PageContent.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
  headerHeight: PropTypes.number.isRequired,
  footerHeight: PropTypes.number.isRequired,
  containerOffset: PropTypes.number.isRequired,
};

export default PageContent;
