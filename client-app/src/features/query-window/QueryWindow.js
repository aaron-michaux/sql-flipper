
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
import { setSqlQuery } from './queryWindowSlice';

function Toolbar(props) {
  const o = useSelector((state) => state.dbCredentials.credentials);
  const connName = `${o.user}@${o.host}:${o.port}/${o.database}`;

  const theme = useTheme();
  const ToolbarDiv = styled.div(theme.mainToolbar);

  return (
    <ToolbarDiv>{connName}</ToolbarDiv>
  );
}

function SqlTextarea(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const queryState = useSelector((state) => state.queryWindow);

    // Events
    const onSubmit = (data) => {
        console.log(data);
        // Don't "double-connect"
        // if (credentialsPacket.status === 'idle') {
        //     dispatch(setCredentials(data));
        //     dispatch(connectDatabaseAsync(data));
        // }
    };

    const theme = useTheme();
    const StyledForm = styled.form(theme.sqlForm);
    const ThemedTextarea = styled.textarea(theme.sqlTextarea);
    const FormDiv = styled.div(theme.formDivWrapper);

    //const optimisedHandleChange = debounce(handleChange,500);
    
    return (        
        <StyledForm onSubmit={handleSubmit(onSubmit)}>          
          <ThemedTextarea key="SqlText"
                          name="sqlText"
                          defaultValue={queryState.currentQuery}
                          {...register('sqlText')} />
          <input className="goIcon"
                 css={{ ...theme.sqlSubmitButton }}
                 type="submit"
                 value=""/>
        </StyledForm>
    );
}

export function QueryWindow(props) {
    const dispatch = useDispatch();
    const dbState = useSelector((state) => state.dbCredentials);
    const queryState = useSelector((state) => state.queryWindow);

    const [horSplitSize, setHorSplitSize] = useState(200);
    const [vertSplitSize, setVertSplitSize] = useState(100);
    
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
    
    return (
        <QueryWindowDiv>
          <Toolbar />
          <DisconnectButton className="exitIcon"
                            title="Disconnect"
                            onClick={onClickDisconnect}
          />
          <SplitPane
            split="vertical"
            minSize={100}
            defaultSize={horSplitSize}
            onDragFinished={(size) => setHorSplitSize(size)}
            resizerStyle={theme.resizableColumn}
            overflow="hidden"
            height="100vh"
          >
            <TableColumnDiv>
              <TablesList />
            </TableColumnDiv>
            <SplitPane split="horizontal"
                       minSize={200}
                       defaultSize={vertSplitSize}
                       onDragFinished={(size) => setVertSplitSize(size)}
                       resizerStyle={theme.resizableRow}>
              <SqlTextarea/>
              <div>Hello</div>
            </SplitPane>
          </SplitPane>
        </QueryWindowDiv>
    );
}

