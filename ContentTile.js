import React from 'react';
import PropTypes from 'prop-types';

import MuiCard from '@mui/material/Card';
import MuiCardHeader from '@mui/material/CardHeader';
import MuiDivider from '@mui/material/Divider';
import MuiCardContent from '@mui/material/CardContent';

import getDimensions from '../../common/getDimensions';
import Chart from './Chart';
import Table from './Table';
import QuickInfo from './QuickInfo';
import TabbedInput from './TabbedInput';
import Timeline from './Timeline';
import ListResults from './ListResults';
import Text from './Text';
import Embed from './Embed.js';
import ButtonArray from './ButtonArray';

// Create object of supported content types to be rendered in tile
const supportedComponents = {
  Chart: Chart,
  Table: Table,
  QuickInfo: QuickInfo,
  TabbedInput: TabbedInput,
  Timeline: Timeline,
  ListResults: ListResults,
  Text: Text,
  Embed: Embed,
  ButtonArray: ButtonArray,
};

const ContentTile = (props) => {
  // Handle card margins
  const cardRef = React.useRef(null);

  const getCardOffset = (cardEl) => {
    if (cardEl) {
      const computedStyle = window.getComputedStyle(cardEl);
      return (
        parseInt(computedStyle.marginTop, 10) +
        parseInt(computedStyle.marginBottom, 10)
      );
    } else {
      return 0;
    }
  };

  // Resize handler for card content
  const [cardHeaderRef, cardHeaderDim] = getDimensions();

  // Resize handler for card content
  const [cardContentRef, cardContentDim] = getDimensions();

  // Handle window resize
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleWindowResize);
  });

  // Select content component based on type
  const Content = supportedComponents[props.content.type];

  return (
    <MuiCard
      ref={cardRef}
      sx={{
        margin: '8px',
        borderRadius: '5px',
        ...props.styles,
      }}
      {...props.opts}
      id={props.id}
      className={props.classes}
      data-test={props.content.datatest}
      acme-micro-app={props.content.acmemicro}
    >
      <MuiCardHeader
        sx={{
          fontSize: '1rem',
          fontWeight: 500,
          ...props.header.styles,
        }}
        {...props.header.opts}
        id={props.header.id}
        className={props.header.classes}
        ref={cardHeaderRef}
        title={props.header.name}
        disableTypography={true}
      ></MuiCardHeader>

      {/* Hide divider if it is a text box */}
      {Content !== Text ? <MuiDivider style={props.header.divider} /> : ''}

      <MuiCardContent
        ref={cardContentRef}
        sx={{ overflowY: 'auto' }}
        style={{ ...props.styles }}
      >
        <Content
          altText={props.altText}
          sx={{ ...props.content.styles }}
          {...props.content.opts}
          id={props.content.id}
          className={props.content.classes}
          // height of the Card content (below divider) - subtract padding (16t+24b) to get content height
          height={
            (windowHeight -
              props.header_height -
              props.footer_height -
              props.container_offset) *
              props.height -
            cardHeaderDim.outerHeight -
            getCardOffset(cardRef.current) -
            1
          }
          card_content_vert_padding={cardContentDim.padding.vert}
        ></Content>
      </MuiCardContent>
    </MuiCard>
  );
};

ContentTile.propTypes = {
  altText: PropTypes.string,
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  height: PropTypes.number.isRequired,
  header: PropTypes.shape({
    display: PropTypes.bool,
    styles: PropTypes.object,
    opts: PropTypes.object,
    id: PropTypes.string,
    classes: PropTypes.string,
    name: PropTypes.string.isRequired,
    divider: PropTypes.object,
  }).isRequired,
  content: PropTypes.shape({
    styles: PropTypes.object,
    opts: PropTypes.object.isRequired,
    id: PropTypes.string,
    classes: PropTypes.string,
    datatest: PropTypes.string,
    acmemicro: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
  header_height: PropTypes.number.isRequired,
  footer_height: PropTypes.number.isRequired,
  container_offset: PropTypes.number.isRequired,
};

export default ContentTile;
