
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
import SplitPane from 'react-split-pane';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { ErrorList } from '../error-list/ErrorList';
import { TablesList } from '../tables-list/TablesList';

import { disconnectDatabaseAsync } from '../db-credentials-dialog/dbCredentialsSlice';
import { setActiveWindow } from '../main-window/mainWindowSlice';

function Toolbar(props) {
  const o = useSelector((state) => state.dbCredentials.credentials);
  const connName = `${o.user}@${o.host}:${o.port}/${o.database}`;

  const theme = useTheme();
  const ToolbarDiv = styled.div(theme.mainToolbar);

  return (
    <ToolbarDiv>{connName}</ToolbarDiv>
  );
}

export function QueryWindow(props) {
  const dispatch = useDispatch();
  const dbState = useSelector((state) => state.dbCredentials);
  const queryState = useSelector((state) => state.queryWindow);

  // Styles
  const theme = useTheme();
  const QueryWindowDiv = styled.div(theme.queryWindow);
  const TableColumnDiv = styled.div(theme.tableColumn);
  const DisconnectButton = styled.button(theme.exitButton);
  const tableColumnMinWidth = 200;

  // Events
  const onClickDisconnect = () => {
    if (dbState.status == 'idle') {
      dispatch(disconnectDatabaseAsync());
      dispatch(setActiveWindow('DbCredentialsDialog'));
    }
  };

  console.log(queryState.currentQuery);

  return (
    <QueryWindowDiv>
      <Toolbar />
      <DisconnectButton className="exitIcon"
        title="Disconnect"
        onClick={onClickDisconnect}
      />
      <SplitPane
        split="vertical"
        minSize={200}
        defaultSize={200}
        resizerStyle={theme.resizableColumn}
        overflow="hidden"
        height="100vh"
      >
        <TableColumnDiv>
          <TablesList />
        </TableColumnDiv>
        <div>
          {queryState.currentQuery}
        </div>
      </SplitPane>
    </QueryWindowDiv>
  );
}

