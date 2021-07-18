
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { setActiveWindow } from '../main-window/mainWindowSlice';
import { setSqlQuery } from '../query-window/queryWindowSlice';
import { setDbConnectionError } from '../db-credentials-dialog/dbCredentialsSlice';
import { getTablesState, queryTablesAsync } from './tablesListSlice';

import { ErrorList } from '../error-list/ErrorList';

import { setAppStatus } from '../../app/store';

function TableItems(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const ItemDiv = styled.div(theme.tableItem);
  if (props.data == null) return null;

  const onClickTable = (tableName) => {
    dispatch(setSqlQuery(`SELECT * FROM ${tableName};`));
  };

  return props.data.map((obj) =>
  (<ItemDiv key={obj.table_name} onClick={() => onClickTable(obj.table_name)}>
    {obj.table_name}
  </ItemDiv>)
  );
}

export function TablesList(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const state = useSelector(getTablesState);

  // styles
  const TableHeader = styled.div(theme.tableHeader);

  // Effects
  useEffect(() => {
    if (state.error == null && state.data == null && state.status === 'idle') {
      dispatch(queryTablesAsync());
    } else if (state.error != null && state.status === 'idle') {
      dispatch(setDbConnectionError('Query Tables Failed!'));
      dispatch(setActiveWindow('DbCredentialsDialog'));
    }
  }, [state.data, state.error]);

  //
  return (
    <>
      <TableHeader>Tables</TableHeader>
      <TableItems data={state.data} />
    </>
  );
}
