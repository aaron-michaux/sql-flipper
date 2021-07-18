
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { MainWindow } from './features/main-window/MainWindow';

// Data
import { theme } from './theme';

import './App.css';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainWindow />
    </ThemeProvider>
  );
}

export default App;


