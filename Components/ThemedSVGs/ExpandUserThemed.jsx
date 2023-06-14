import { useTheme } from "native-base";

const ExpandUserThemed = () => {
  const { colors } = useTheme();

  return (
    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.72363 6.31738L14.2754 11.8691L8.72363 17.4208" stroke={colors.primary["600"]} strokeWidth="1.38793"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx="11.5" cy="11.8684" r="10.6786" transform="rotate(-90 11.5 11.8684)" stroke={colors.primary["600"]}
        strokeWidth="1.64286" />
    </svg>
  );
};

export default ExpandUserThemed;
