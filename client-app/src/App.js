
import React from 'react';
import { ThemeProvider } from '@emotion/react';

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


