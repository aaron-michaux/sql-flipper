
const themeColors = {
  primary: 'hotpink',
  niceGrey: 'WhiteSmoke',
  mediumGrey: 'Gainsboro',
};


export const theme = {
  colors: themeColors,

  redButton: {
    border: 'none',
    width: '152px',
    height: '40px',
    margin: 'auto',
    marginTop: '29px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    justifyContent: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontFamily: 'muli-semibold',
    borderRadius: '20px',
    background: '#ae3c33',
    overflow: 'hidden',
    boxShadow: '0 0 1px transparent',
    transform: 'perspective(1px) translateZ(0)',
    position: 'relative',
  },

  formStyle: {
    backgroundColor: themeColors.niceGrey,
    border: '1px solid black',
    width: '50%',
    minWidth: '250px',
    padding: '30px',
  },

  formLabel: {
    marginBottom: '5px',
    display: 'block',
    textAlign: 'left',
  },

  formTextInput: {
    fontSize: '13px',
    color: '#333',
    fontFamily: 'muli-bold',
    background: '0 0',
    borderRadius: '20px',
    display: 'block',
    width: '100%',
    height: '40px',
    padding: '0 20px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
  },

  formDivWrapper: {
    color: '#666',
    fontSize: '13px',
    width: '100%',
    marginBottom: '17px',
    boxSizing: 'border-box',
    fontFamily: 'muli-regular',
  },

  errorDiv: {
    color: 'white',
    background: 'red',
    borderRadius: '20px',
    padding: '10px 20px',
  },

  resizableColumn: {
    background: themeColors.mediumGrey,
    width: '8px',
    cursor: 'col-resize',
    margin: '0px 5px',
    height: '100%',
  },

  queryWindow: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    background: '#fff',
  },

  tableHeader: {
    width: '100%',
    fontFamily: 'muli-semibold',
    fontSize: '24px',
    color: '#333',
    marginTop: '6px',
  },

  tableItem: {
    textAlign: 'left',
    fontFamily: 'muli-regular',
    fontSize: '16px',
    margin: '5px 5px',
    color: '#333',
    cursor: 'pointer',
  },

  mainToolbar: {
    textAlign: 'center',
    fontSize: '28px',
    fontFamily: 'muli-regular',
    padding: '9px',
    height: '55px',
    width: '100%',
    backgroundColor: themeColors.niceGrey,
    borderBottom: '1px #ddd solid',
  },

  exitButton: {
    float: 'right',
    display: 'inline-block',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    border: 'none',
    color: 'pink',
    cursor: 'pointer',
    width: '48px',
    height: '48px',
    margin: 'auto 2px',
    marginTop: '-52px',
    backgroundColor: themeColors.niceGrey,
  },
};


