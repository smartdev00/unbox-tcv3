import { useTheme } from "native-base";

const FlagThemed = () => {
  const { colors } = useTheme();

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 20.5V9.5C8 9.5 10 8 12 8C14 8 14.5 9.5 16.5 9.5C18.5 9.5 20.5 8 20.5 8V15C20.5 15 18.5 16.5 16.5 16.5C14.5 16.5 14 15 12 15C10 15 8 16.5 8 16.5"
        stroke={colors.primary["600"]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="14" r="13" stroke={colors.primary["600"]} strokeWidth="2" />
    </svg>
  );
};

export default FlagThemed;
