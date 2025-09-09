import React from 'react';
import PropTypes from 'prop-types';

import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';
import MuiBox from '@mui/material/Box';
import MuiIconButton from '@mui/material/IconButton';
import MuiTypography from '@mui/material/Typography';
import MuiDivider from '@mui/material/Divider';
import MuiDownloadIcon from '@mui/icons-material/Download';
import MuiLink from '@mui/material/Link';
import MuiPortal from '@mui/material/Portal';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import getDimensions from '../../common/getDimensions';
import Modal from '../../common/modals/Modal';

const DownloadButton = (props) => {
  // Handle snackbar state
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('success');
  const [alertMessage, setAlertMessage] = React.useState('Download succeeded!');
  const handleSnackbarOpen = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle download button click
  function downloadAction(metadata) {
    console.log('Executing track event with metadata: ', metadata);
    // Send download initiated track event
    pendo.track('Download Initiated', metadata);

    // Randomly determine if fail or success
    if (Math.random() < 0.95) {
      pendo.track('Download Succeeded', metadata);
      handleSnackbarOpen('success', 'Download succeeded!');
      window.pendo.showGuideById('c5zfIIWkf2PNBHzY00m3nOVgv0k');
    } else {
      pendo.track('Download Failed', metadata);
      handleSnackbarOpen('error', 'Download failed. Please try again later.');
      window.pendo.showGuideById('BEQ7Aiqx4y7cU9oNiD7gB1kWxog');
    }
    // window.pendo.loadGuides();
  }

  return (
    <MuiBox>
      <MuiPortal>
        <MuiSnackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          autoHideDuration={4000}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </MuiAlert>
        </MuiSnackbar>
      </MuiPortal>
      <MuiIconButton
        edge="end"
        aria-label="download"
        onClick={() => {
          downloadAction({
            title: props.title,
            src: props.src,
            srcComponent: props.srcComponent,
          });
        }}
        className="download-button"
        sx={{
          backgroundColor: '#1DA259',
          '&:hover': {
            backgroundColor: '#1a9150',
          },
          color: 'white',
          ...props.buttonStyles,
        }}
      >
        <MuiDownloadIcon />
      </MuiIconButton>
    </MuiBox>
  );
};

DownloadButton.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcComponent: PropTypes.string.isRequired,
  buttonStyles: PropTypes.object,
};

const ListResults = (props) => {
  var date = new Date(new Date() - 432000000);
  var dateToStr = date.toUTCString().split(' ');
  var dynamicDate = dateToStr[2] + ' ' + dateToStr[1];

  // Resize handler for container
  const [containerRef, containerDim] = getDimensions();

  // Fetch table data
  const [articleData, setArticleData] = React.useState([]);

  React.useEffect(() => {
    fetch(props.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setArticleData(data);
      })
      .catch((error) =>
        console.error(`Failed to load data from ${props.dataUrl}`)
      );
  }, []);

  // Handle modal state
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = (article) => {
    // Call optional open start callback
    if (props.openStartCallback) {
      props.openStartCallback();
    }

    setSrc(article.link);
    setTitle(article.title);
    setModalOpen(true);

    // Call optional open end callback
    if (props.openEndCallback) {
      props.openEndCallback();
    }
  };
  const handleModalClose = () => {
    // Call optional open start callback
    if (props.closeStartCallback) {
      props.closeStartCallback();
    }

    setModalOpen(false);

    // Call optional open end callback
    if (props.closeEndCallback) {
      props.closeEndCallback();
    }
  };

  // Handle current src and title state
  const [src, setSrc] = React.useState('');
  const [title, setTitle] = React.useState('');

  // const availableHeight =
  //   props.height - props.card_content_vert_padding - containerDim.padding.vert;

  // Get padding to determine height
  const ref = React.useRef(null);
  const [padding, setPadding] = React.useState(0);

  React.useEffect(() => {
    const parentStyles = getComputedStyle(
      ref.current.parentElement.parentElement
    );
    const paddingTop = parseInt(parentStyles.paddingTop.slice(0, -2));
    const paddingBottom = parseInt(parentStyles.paddingBottom.slice(0, -2));
    setPadding(paddingTop + paddingBottom);
  });

  return (
    <>
      <Modal
        open={modalOpen}
        handleClose={handleModalClose}
        header={{
          ...props.modal.header,
          name: title,
          button: (
            <DownloadButton
              title={title}
              src={src}
              srcComponent={'Article Viewer'}
            ></DownloadButton>
          ),
        }}
        content={{
          ...props.modal.content,
          src: src,
          title: title,
        }}
      ></Modal>
      <MuiBox ref={containerRef}>
        <MuiList
          ref={ref}
          style={{
            width: '100%',
            maxHeight: '100%',
            margin: '0px',
            paddingTop: '0px',
            height: props.height - padding,
            width: '100%',
          }}
          className="article-list"
        >
          {articleData.map((article) => (
            <MuiBox key={article.id}>
              <MuiListItem
                style={{ padding: '0px 0px 0px 10px' }}
                secondaryAction={
                  <DownloadButton
                    title={article.title}
                    src={article.link}
                    srcComponent={'Article List'}
                    buttonStyles={{
                      ...props.buttonStyles,
                    }}
                  ></DownloadButton>
                }
              >
                <MuiListItemText
                  style={{ fontSize: '12px' }}
                  primary={
                    <MuiTypography
                      type="body1"
                      style={{
                        fontWeight: '500',
                        color: '#000048',
                        fontSize: '14px',
                      }}
                    >
                      <MuiLink
                        sx={{
                          cursor: 'pointer',
                        }}
                        className="link"
                        onClick={(event) => {
                          event.preventDefault();
                          handleModalOpen(article);
                        }}
                        style={{
                          textDecoration: 'none',
                          color: ' #000080',
                          fontSize: '14px',
                        }}
                      >
                        {article.title}
                      </MuiLink>
                    </MuiTypography>
                  }
                  secondary={
                    <MuiTypography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <MuiBox style={{ width: '85%', margin: '0px' }}>
                        <MuiBox
                          className="article-author"
                          style={{ fontWeight: '500', fontSize: '12px' }}
                        >
                          {article.author}
                        </MuiBox>
                        <MuiBox
                          className="article-date"
                          style={{ fontSize: '12px' }}
                        >
                          {dynamicDate}
                        </MuiBox>
                        <MuiBox className="article-summary">
                          {article.summary}
                        </MuiBox>
                      </MuiBox>
                    </MuiTypography>
                  }
                />
              </MuiListItem>
              <MuiDivider />
            </MuiBox>
          ))}
        </MuiList>
      </MuiBox>
    </>
  );
};

ListResults.propTypes = {
  height: PropTypes.number.isRequired,
  card_content_vert_padding: PropTypes.number.isRequired,
  dataUrl: PropTypes.string.isRequired,
  modal: PropTypes.object.isRequired,
  openStartCallback: PropTypes.func,
  openEndCallback: PropTypes.func,
  closeStartCallback: PropTypes.func,
  closeEndCallback: PropTypes.func,
  buttonStyles: PropTypes.object,
};

export default ListResults;
