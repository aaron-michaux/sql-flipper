
import styled from "@emotion/styled";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';


export function ErrorList(props) {
  const theme = useTheme();
  const ErrorDiv = styled.div(props.style ? theme[props.style] : theme.errorDiv);

  const convertToErrorArray = (arg) => {
    if (Array.isArray(arg)) return arg;
    if (arg == null) return [];
    return [arg];
  };
  const errors = convertToErrorArray(props.errors);

  if (!errors) return null;

  return (
    errors.map((error) => (<ErrorDiv key={error}>{error}</ErrorDiv>))
  );
};
