
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import SplitPane from 'react-split-pane';
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';
import SortIcon from '@material-ui/icons/ArrowDownward';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { ErrorList } from '../error-list/ErrorList';
import { TablesList } from '../tables-list/TablesList';

import { disconnectDatabaseAsync } from '../db-credentials-dialog/dbCredentialsSlice';
import { setActiveWindow } from '../main-window/mainWindowSlice';
import { setSqlQuery, executeQueryAsync } from './queryWindowSlice';

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
        // Don't "double-connect"
        if (queryState.status === 'idle') {
            dispatch(setSqlQuery(data.sqlText));
            dispatch(executeQueryAsync(data.sqlText));
        }
    };

    const theme = useTheme();
    const StyledForm = styled.form(theme.sqlForm);
    const ThemedTextarea = styled.textarea(theme.sqlTextarea);
    
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

function QueryFeedback(props) {
    const theme = useTheme();
    if(props.data == null) return null;
    if(props.data?.command == null) return null;

    const rowCount = props.data?.rowCount;
    
    const plural = (count) => {
        return `${count === 1 ? '' : 's'}`;
    };
    
    var message = null;
    switch(props.data.command) {
    case 'SELECT':
        message = null;
        break;
    case 'DELETE':
        message = `Deleted ${rowCount} row${plural(rowCount)}`;
        break;
    case 'UPDATE':
        message = `Updated ${rowCount} row${plural(rowCount)}`;
        break;
    case 'INSERT':
        message = `Inserted ${rowCount} row${plural(rowCount)}`;
        break;        
    default:
        message = `Report not supported for SQL query type: ${props.data?.command}`;
        break;
    }
    if(message == null) return null;
    
    return (
        <div css={{ ...theme.resultFeedback }}>{message}</div>
    );
};

function DataGrid(props) {
    const theme = useTheme();
    
    // Don't render anything if there's no data
    if(props.data == null) return null;
    if(props.data?.fields == null) return null;
    if(props.data?.rows == null) return null;
    
    const columns = props.data.fields.map((field) => {
        return { name: field, selector: field, sortable: true };
    });
    
    return (
        <Card css={{ ...theme.dataGridCard }}>
          <DataTable
            css={{ ...theme.dataGrid }}
            noHeader={true}
            columns={columns}
            compact={true}
            data={props.data.rows}
            defaultSortFieldId={1}
            sortIcon={<SortIcon />}
            pagination
          />
        </Card>
    );
};

function ResultDisplay(props) {
    const theme = useTheme();
    const state = props.queryState;
    const error = (state.error == null) ? null : `ERROR: ${state.error}`;
    
    return (
        <div css={{ ...theme.resultDisplayDiv }}>
          <ErrorList styleName="resultErrorList" errors={error} />
          <QueryFeedback data={state.data} />
          <DataGrid data={state.data} />
        </div>              
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

    // Events
    const onClickDisconnect = () => {
        if (dbState.status === 'idle') {
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
                       minSize={100}
                       defaultSize={vertSplitSize}
                       onDragFinished={(size) => setVertSplitSize(size)}
                       resizerStyle={theme.resizableRow}>
              <SqlTextarea/>
              <ResultDisplay queryState={queryState} />
            </SplitPane>
          </SplitPane>
        </QueryWindowDiv>
    );
}

