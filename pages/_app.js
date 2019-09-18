import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ModalProvider, LinksProvider } from 'context';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'css/theme';

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>LinkLib</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ModalProvider>
            <LinksProvider>
              <Component {...pageProps} data-testid="hello" />
            </LinksProvider>
          </ModalProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}