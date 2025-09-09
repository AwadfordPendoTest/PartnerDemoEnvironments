import React from 'react';
import PropTypes from 'prop-types';

import { useParams, useSearchParams } from 'react-router-dom';

import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

import getDimensions from '../../common/getDimensions';

const QuickInfo = (props) => {
  // Url info from router
  const { detailType, detailId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Resize handler for container
  const [containerRef, containerDim] = getDimensions();

  // Resize handler for text items
  const [imageRef, imageDim] = getDimensions();

  // Resize handler for text items
  const [textRef, textDim] = getDimensions();

  // Get quick info from relevant table
  const [fields, setFields] = React.useState({});

  React.useEffect(() => {
    if (detailId === 'new' && searchParams.get('obj')) {
      setFields(JSON.parse(decodeURI(searchParams.get('obj'))));
    } else {
      let id = detailId === 'new' ? '0' : detailId;
      fetch(`${props.baseUrl}${detailType}.json`)
        .then((response) => response.json())
        .then((data) => {
          const entry = data.rows.filter((d) => d.id === id)[0];

          const details = {};

          if (props.onEntryLoaded) {
            props.onEntryLoaded(entry);
          }
          for (const key of props.schema[detailType]) {
            details[data.schema[key].label] = entry[key];
          }
          setFields(details);
        })
        .catch((error) => {
          console.log(
            `Unable to fetch details for detailType: ${detailType} and detailId: ${id}`,
            error
          );
        });
    }
  }, [detailType, detailId, searchParams]);

  const availableHeight =
    props.height - props.card_content_vert_padding - containerDim.padding.vert;

  function fireTE(app) {
    if (app === 'crm') {
      console.log('Initiating track events');
      const fileNames = [
        'invoice.txt',
        'list.txt',
        'contact.txt',
        'account.txt',
      ];
      let num = Math.floor(Math.random() * 4);
      let paymentNum = Math.floor(Math.random() * 8);
      let selection = fileNames[num];
      if (window.pendo) {
        window.pendo.track('File Downloaded', {
          filename: selection,
        });

        window.pendo.track('Payment Initiated');

        if (paymentNum >= 6) {
          window.pendo.track('Payment Failed');
        } else {
          window.pendo.track('Payment Succeeded');
        }
      }
    }
  }

  // Call onload callback if present
  React.useEffect(() => {}, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: availableHeight,
        width: '100%',
      }}
    >
      <MuiBox
        ref={imageRef}
        sx={{
          display: 'flex',
          paddingBottom: '16px',
          justifyContent: 'center',
        }}
        onClick={() => {
          // change to read in app
          fireTE(props.baseUrl.split('/')[1]);
        }}
      >
        <img
          src={props.src}
          style={{
            maxHeight: `${
              availableHeight -
              imageDim.padding.vert -
              imageDim.margin.vert -
              textDim.outerHeight
            }px`,
            maxWidth: '80%',
          }}
        ></img>
      </MuiBox>
      <MuiBox ref={textRef}>
        {Object.entries(fields).map(([key, val]) => {
          return (
            <MuiBox
              key={key}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <MuiTypography sx={{ fontWeight: 'bold' }}>{key}:</MuiTypography>
              <MuiTypography sx={{ paddingLeft: '20px', textAlign: 'right' }}>
                {val}
              </MuiTypography>
            </MuiBox>
          );
        })}
      </MuiBox>
    </div>
  );
};

QuickInfo.propTypes = {
  height: PropTypes.number.isRequired,
  card_content_vert_padding: PropTypes.number.isRequired,
  schema: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  onEntryLoaded: PropTypes.func,
};

export default QuickInfo;
