import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MuiBox from '@mui/material/Box';
import MuiCssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme as muiCreateTheme,
} from '@mui/material/styles';

import getDimensions from './common/getDimensions';
import { runSnippet } from './common/Pendo';
import Header from './components/header/Header';
import PageContent from './components/content/PageContent';
import Footer from './components/footer/Footer';

const App = (props) => {
  // Global theme provider
  const theme = muiCreateTheme({
    typography: {
      fontFamily: ['"Sora"', 'sans-serif'].join(','),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
            body {
            }
          `,
      },
    },
  });

  // Pendo metadata state handler
  const [pendoMetadata, setPendoMetadata] = React.useState({});

  // Resize handler for header
  const [headerRef, headerDim] = getDimensions();

  // Resize handler for footer
  const [footerRef, footerDim] = getDimensions();

  // Ref for content container to get margin + padding values
  const [contentContainerRef, contentContainerDim] = getDimensions();

  // Run Pendo snippet to install agent
  React.useEffect(() => {
    runSnippet(props.pendoConfig, setPendoMetadata);
  }, []);

  // Create router based on drawer links
  const router = createBrowserRouter(
    props.content.routes.map((d) => ({
      path: d.route,
      element: (
        <MuiThemeProvider theme={theme}>
          <MuiBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              fontFamily: 'Sora',
              backgroundColor: '#ebecee',
              ...props.styles,
            }}
            {...props.opts}
            id={props.id}
            className={props.classes}
          >
            {/* Background Image */}
            {props.background ? (
              <MuiBox
                sx={{
                  width: '100%',
                  minHeight: '100vh',
                  position: 'absolute',
                  zIndex: '1',
                  ...props.background.styles,
                }}
              ></MuiBox>
            ) : (
              ''
            )}
            {/* Global CSS Styles */}
            <MuiCssBaseline />
            {/* Header */}
            <Header
              {...props.header}
              innerRef={headerRef}
              pendoMetadata={pendoMetadata}
            ></Header>
            {/* Content */}
            <MuiBox
              sx={{
                display: 'flex',
                backgroundColor: '#f7f8fa',
                borderRadius: '5px',
                padding: { xs: '10px', sm: '20px', md: '40px' },
                marginLeft: { xs: '10px', sm: '20px', md: '40px' },
                marginRight: { xs: '10px', sm: '20px', md: '40px' },
                zIndex: '2',
                ...props.content.styles,
              }}
              {...props.content.opts}
              id={props.content.id}
              className={props.content.classes}
              ref={contentContainerRef}
            >
              <PageContent
                title={d.name}
                contents={d.contents}
                headerHeight={headerDim.outerHeight}
                footerHeight={footerDim.outerHeight}
                containerOffset={
                  contentContainerDim.padding.vert +
                  contentContainerDim.margin.vert
                }
              ></PageContent>
            </MuiBox>
            {/* Footer */}
            <Footer innerRef={footerRef} {...props.footer}></Footer>
          </MuiBox>
        </MuiThemeProvider>
      ),
    }))
  );

  // Set favicon based on prop
  React.useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = props.favicon;
  }, []);

  return <RouterProvider router={router} />;
};

App.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  favicon: PropTypes.string.isRequired,
  pendoConfig: PropTypes.shape({
    apiKey: PropTypes.string.isRequired,
    additionalApiKeys: PropTypes.arrayOf(PropTypes.string),
    snippetCallback: PropTypes.func,
    visitor: PropTypes.object,
    account: PropTypes.object,
    location: PropTypes.object,
  }).isRequired,
  background: PropTypes.shape({
    styles: PropTypes.object,
    opts: PropTypes.object,
    id: PropTypes.string,
    classes: PropTypes.string,
  }),
  header: PropTypes.object.isRequired,
  content: PropTypes.shape({
    styles: PropTypes.object,
    opts: PropTypes.object,
    id: PropTypes.string,
    classes: PropTypes.string,
    routes: PropTypes.array.isRequired,
  }).isRequired,
  footer: PropTypes.object.isRequired,
};

export default App;
