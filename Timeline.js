import React from 'react';
import PropTypes from 'prop-types';

import MuiBox from '@mui/material/Box';
import MuiTimeline from '@mui/lab/Timeline';
import MuiTimelineItem from '@mui/lab/TimelineItem';
import MuiTimelineSeparator from '@mui/lab/TimelineSeparator';
import MuiTimelineConnector from '@mui/lab/TimelineConnector';
import MuiTimelineContent from '@mui/lab/TimelineContent';
import MuiTimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import MuiTimelineDot from '@mui/lab/TimelineDot';
import MuiTypography from '@mui/material/Typography';

import getDimensions from '../../common/getDimensions';
import DynamicIcon from '../../common/DynamicIcon';

const Timeline = (props) => {
  // Resize handler for container
  const [containerRef, containerDim] = getDimensions();

  const availableHeight =
    props.height - props.card_content_vert_padding - containerDim.padding.vert;

  return (
    <div
      ref={containerRef}
      style={{
        height: availableHeight,
        width: '100%',
      }}
    >
      <MuiTimeline sx={{ margin: '0px', padding: '0px' }}>
        {props.entries.map((d, i) => {
          // if the icon has download as an action, fire the TEs

          return (
            <MuiTimelineItem
              key={`${i}-${d.text}`}
              sx={{
                minHeight: '25px',
                height: `${availableHeight / props.entries.length}px`,
              }}
            >
              <MuiTimelineOppositeContent
                sx={{ flex: 0, padding: '0px' }}
              ></MuiTimelineOppositeContent>
              <MuiTimelineSeparator>
                <MuiTimelineConnector sx={{ opacity: i === 0 ? 0 : 1 }} />
                <MuiTimelineDot sx={{ margin: '0px', padding: '2px' }}>
                  <DynamicIcon
                    icon={d.icon}
                    styles={{
                      height: `${
                        0.5 * (availableHeight / props.entries.length)
                      }px`,
                    }}
                  ></DynamicIcon>
                </MuiTimelineDot>
                <MuiTimelineConnector
                  sx={{ opacity: i === props.entries.length - 1 ? 0 : 1 }}
                />
              </MuiTimelineSeparator>
              <MuiTimelineContent
                sx={{ maxWidth: '100%', display: 'flex', alignItems: 'center' }}
              >
                <MuiTypography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {d.text}
                </MuiTypography>
              </MuiTimelineContent>
            </MuiTimelineItem>
          );
        })}
      </MuiTimeline>
    </div>
  );
};

Timeline.propTypes = {
  height: PropTypes.number.isRequired,
  card_content_vert_padding: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Timeline;
