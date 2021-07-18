
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { ErrorList } from '../error-list/ErrorList';

export function QueryWindow(props) {
  const theme = useTheme();

  return (
    <div>Hello World!</div>
  );
}

