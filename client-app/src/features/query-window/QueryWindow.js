
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

export function QueryWindow(props) {
  const theme = useTheme();

  // Styles
  const TableColumnDiv = styled.div(theme.tableColumn);

  const tableColumnMinWidth = 200;

  return (
    <SplitPane
      split="vertical"
      minSize={200}
      defaultSize={200}
      resizerStyle={theme.resizableColumn}
    >
      <TableColumnDiv>
        <TablesList />
      </TableColumnDiv>
      <div>
        <h1>Some Content</h1>
      </div>
    </SplitPane>
  );
}

