
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { appIsLoading, getActiveWindow } from './mainWindowSlice';

// Components
import { DbCredentialsDialog } from './../db-credentials-dialog/DbCredentialsDialog';
import { QueryWindow } from './../query-window/QueryWindow';

function WindowSelector(props) {
  switch (props.window) {
    case 'DbCredentialsDialog': return <DbCredentialsDialog />;
    case 'QueryWindow': return <QueryWindow />;
    default:
      console.log('logic error, unknown active window: ' + props.window);
      return <DbCredentialsDialog />;
  }
};

export function MainWindow(props) {
  const theme = useTheme();

  const credentialsPacket = useSelector((state) => state.dbCredentials);
  const isLoading = useSelector(appIsLoading);
  const activeWindow = useSelector(getActiveWindow);
  const StyledLoadingOverlay = styled(LoadingOverlay)`width:100%`;
  const status = credentialsPacket.status;

  return (
    <StyledLoadingOverlay
      active={isLoading}
      spinner={<ScaleLoader />}
    >
      <div className="App">
        <header className="App-header">
          <WindowSelector window={activeWindow} />
        </header>
      </div>
    </StyledLoadingOverlay>
  );
}

