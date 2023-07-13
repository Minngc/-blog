const Line = (props: {
  width?: string;
  height?: string;
  color?: string;
  marginTop?: string;
}) => {
  const {
    width = "100%",
    height = "1px",
    color = "#BABABA",
    marginTop = "0px",
  } = props;

  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        marginTop: marginTop,
      }}
    />
  );
};

export { Line };
