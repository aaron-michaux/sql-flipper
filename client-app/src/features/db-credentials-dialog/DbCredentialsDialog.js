
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { connectDatabaseAsync, hasDatabaseConnection, setCredentials } from './dbCredentialsSlice';
import { setActiveWindow } from '../main-window/mainWindowSlice';

import { ErrorList } from '../error-list/ErrorList';

import { setAppStatus } from '../../app/store';

export function DbCredentialsDialog(props) {

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const credentialsPacket = useSelector((state) => state.dbCredentials);
  const credentials = credentialsPacket.credentials;
  const isConnected = useSelector(hasDatabaseConnection);

  // Styles
  const theme = useTheme();
  const StyledForm = styled.form(theme.formStyle);
  const FormDiv = styled.div(theme.formDivWrapper);
  const StyledLabel = styled.label(theme.formLabel);
  const StyledInput = styled.input(theme.formTextInput);

  // Effects
  useEffect(() => {
    if (isConnected)
      dispatch(setActiveWindow('QueryWindow'));
  }, [isConnected]);

  // Events
  const onSubmit = (data) => {
    if (credentialsPacket.status === 'idle') {
      // Don't "double-connect"
      dispatch(setCredentials(data));
      dispatch(connectDatabaseAsync(data));
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <ErrorList errors={credentialsPacket.error} />
      <h3>Database</h3>
      <FormDiv>
        <StyledLabel>Host</StyledLabel>
        <StyledInput type="text" name="host" defaultValue={credentials.host} {...register('host')} />
      </FormDiv>
      <FormDiv>
        <StyledLabel>Port</StyledLabel>
        <StyledInput type="text" name="port" defaultValue={credentials.port} {...register('port')} />
      </FormDiv>
      <FormDiv>
        <StyledLabel>User</StyledLabel>
        <StyledInput type="text" name="user" defaultValue={credentials.user} {...register('user')} />
      </FormDiv>
      <FormDiv>
        <StyledLabel>Password</StyledLabel>
        <StyledInput type="password" name="password" defaultValue={credentials.password} {...register('password')} />
      </FormDiv>
      <FormDiv>
        <StyledLabel>Database</StyledLabel>
        <StyledInput type="text" name="database" defaultValue={credentials.database} {...register('database')} />
      </FormDiv>
      <input css={{ ...theme.redButton }} type="submit" value="Connect" />
    </StyledForm>
  );
}
