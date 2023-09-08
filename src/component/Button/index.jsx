import { Button as ButtonMantine, useMantineTheme } from "@mantine/core";

const Button = ({
  leftIcon,
  label,
  styles,
  onClick,
  w,
  compact,
  loading,
  type,
  iconWidth = "16px",
  disabled,
  size = "md",
  variant,
  color = "pink",
  ...props
}) => {
  const theme = useMantineTheme();
  return (
    <ButtonMantine
      sx={styles}
      compact={compact}
      disabled={disabled}
      loading={loading}
      w={w}
      bg={color === "pink" ? "#ff8087" : theme.colors.primary}
      size={size}
      radius={"xl"}
      variant={variant}
      leftIcon={
        leftIcon ? (
          <img
            src={new URL(`../../assets/${leftIcon}.svg`, import.meta.url).href}
            alt="icon"
            width={iconWidth}
          />
        ) : (
          ""
        )
      }
      type={type}
      onClick={onClick}
      style={{
        border: "2px dashed white",
        boxShadow: disabled
          ? "0px 0px 0px 5px #e9ecef"
          : color === "pink"
          ? "0px 0px 0px 5px #ff8087"
          : `0px 0px 0px 5px ${theme.colors.primary[0]}`,
      }}
      {...props}
    >
      {label}
    </ButtonMantine>
  );
};
export default Button;
