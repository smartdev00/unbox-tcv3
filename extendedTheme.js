const colors = {
  tabBarColor: "#5C00D3",
  primary: {
    400: "#5C00D3",
    500: "#004400",
    600: "#eb1878",
  },
  secondary: {
    400: "#333333",
    500: "4444444",
    600: "#555555",
    700: "#B3B3B3",
  },
  highlight: {
    50: "#FFF0DA",
    300: "#FFC574",
    500: "#ff9600",
    600: "#2AD100",
  },
  success: "#4DC01D",
  danger: {
    600: "#D10000",
  },
  warning: "#FFD53F",
  information: "#199FFF",
  cleanlinessDirty: '#D10000',
  cleanlinessOkay: '#FFD53F', 
  cleanlinessClean: '#0CCA6F',
};

const extendedTheme = {
  colors,
  letterSpacings: {
    xs: "-0.05em",
    sm: "-0.025em",
    md: 0,
    lg: "0.025em",
    xl: "0.05em",
    "2xl": "0.1em",
  },
  lineHeights: {
    "2xs": "1em",
    xs: "1.125em",
    sm: "1.25em",
    md: "1.375em",
    lg: "1.5em",
    xl: "1.75em",
    "2xl": "2em",
    "3xl": "2.5em",
    "4xl": "3em",
    "5xl": "4em",
  },
  fontConfig: {
    Ubuntu: {
      100: {
        normal: "Ubuntu-Light",
        italic: "Ubuntu-LightItalic",
      },
      200: {
        normal: "Ubuntu-Light",
        italic: "Ubuntu-LightItalic",
      },
      300: {
        normal: "Ubuntu-Light",
        italic: "Ubuntu-LightItalic",
      },
      400: {
        normal: "Ubuntu-Regular",
        italic: "Ubuntu-Italic",
      },
      500: {
        normal: "Ubuntu-Medium",
      },
      600: {
        normal: "Ubuntu-Medium",
        italic: "Ubuntu-MediumItalic",
      },
      // Add more variants
         700: {
           normal: 'Ubuntu-Bold',
         },
         800: {
           normal: 'Ubuntu-Bold',
           italic: 'Ubuntu-BoldItalic',
         },
         900: {
           normal: 'Ubuntu-Bold',
           italic: 'Ubuntu-BoldItalic',
         },
    },
  },    
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    extraBlack: 950,
  },
  fonts: {
    heading: "Ubuntu",
    body: "Ubuntu",
    mono: "Ubuntu",
  },
  fontSizes: {
    "2xs": 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128,
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "33px",
      },
      primary: {
        bgColor: "primary.500",
      },
      secondary: {
        bgColor: "secondary.500",
      },
      variants: {
        main: ({ colorScheme }) => ({
          borderColor: `${colorScheme}.600`,
          borderWidth: '1px',
          borderStyle: 'solid',
          _pressed: {
            bgColor: `${colorScheme}.600`,
            _text: {
              color: "white",
            }
          },
          _text: {
            color: `${colorScheme}.600`,
          }
        }),
        ghost: {
          backgroundColor: "#000",
        }        
      }
    },
    Text: {
      variants: {
        heading1: ({ colorScheme }) => {
          return {
            fontSize: 25,
            fontWeight: 700,
            lineHeight: 30,
            color: `${colorScheme}.600`,
          };
        },
        heading2: ({ colorScheme }) => {
          return {
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 22,
            color: `${colorScheme}.600`,
          };
        },
        heading3: ({ colorScheme }) => {
          return {
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 20,
            color: `${colorScheme}.600`,
          };
        },
        productLabel: ({ colorScheme }) => {
          return {
            fontSize: 20,
            lineHeight: 11,
            color: `${colorScheme}.600`
          }
        },
        walletAmount: {
          fontSize: 59,
          lineHeight: 89,
          fontWeight: 700,
        },
        body1: ({ colorScheme }) => {
          return {
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 20,
            color: `${colorScheme}.600`,
          };
        },
        body2: ({ colorScheme }) => {
          return {
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 18,
            color: `${colorScheme}.600`,
          };
        },
        body3: ({ colorScheme }) => {
          return {
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 16,
            color: `${colorScheme}.600`,
          };
        },
        paragraph1: ({ colorScheme }) => {
          return {
            fontSize: 14,
            lineHeight: 23.5,
            fontWeight: 400,
            color: `${colorScheme}.600`,
          };
        },
        paragraph2: ({ colorScheme }) => {
          return {
            fontSize: 12,
            lineHeight: 18,
            fontWeight: 400,
            color: `${colorScheme}.600`,
          };
        },
        paragraph3: ({ colorScheme }) => {
          return {
            fontSize: 10,
            lineHeight: 13,
            fontWeight: 400,
            color: `${colorScheme}.600`,
          };
        },
        languages: {
          fontSize: 20,
          lineHeight: 25,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#006700',
          marginLeft: '5px',
          marginRight: '5px',
        },
        divider: {
          borderBottomWidth: 1,
          borderBottomColor: '#AAB8C2',
          borderBottomStyle: 'solid'
        },
      },
    },
  },
};

export default extendedTheme;
