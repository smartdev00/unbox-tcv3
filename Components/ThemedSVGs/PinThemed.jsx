import { useTheme } from "native-base";

const PinThemed = () => {
  const { colors } = useTheme();

  return (
    <svg width="19" height="27" viewBox="0 0 19 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="9.99809" cy="8.98466" rx="4.74541" ry="4.74541" fill="#DBF2D2" />
      <ellipse cx="10.2678" cy="9.19283" rx="4.84615" ry="4.84615" fill="white" />
      <path
        d="M9.71382 26.0679C9.29361 26.0702 8.88037 25.9604 8.51669 25.7499C8.15302 25.5394 7.85206 25.2357 7.64483 24.8701L7.62681 24.8378L1.66279 13.9234C0.884865 12.5121 0.486994 10.9229 0.508124 9.31155C0.529254 7.70019 0.968673 6.12197 1.78334 4.73155C2.56392 3.36374 3.68639 2.22214 5.04082 1.41856C6.39526 0.614984 7.9352 0.176997 9.5098 0.147497C9.64552 0.147497 9.78313 0.147497 9.9179 0.147497C11.4927 0.176834 13.0328 0.614744 14.3874 1.41833C15.742 2.22191 16.8646 3.3636 17.6453 4.73155C18.4599 6.12197 18.8994 7.70019 18.9206 9.31155C18.9417 10.9229 18.5438 12.5121 17.7658 13.9234L11.781 24.8758C11.5733 25.2402 11.2723 25.5426 10.909 25.7521C10.5457 25.9616 10.1332 26.0706 9.71382 26.0679ZM9.71382 6.14854C9.23009 6.14854 8.75723 6.29198 8.35502 6.56073C7.95281 6.82947 7.63936 7.21145 7.45425 7.65835C7.26913 8.10526 7.22068 8.59703 7.31505 9.07146C7.40942 9.5459 7.64235 9.9817 7.9844 10.3237C8.32645 10.6658 8.76224 10.8987 9.23667 10.9931C9.71111 11.0875 10.2029 11.039 10.6498 10.8539C11.0967 10.6688 11.4787 10.3553 11.7474 9.95312C12.0162 9.55092 12.1596 9.07804 12.1596 8.59431C12.1584 7.94621 11.9002 7.32504 11.4418 6.86694C10.9833 6.40884 10.3619 6.15119 9.71382 6.15043V6.14854Z"
        fill={colors.primary["500"]} />
    </svg>
  );
};

export default PinThemed;
