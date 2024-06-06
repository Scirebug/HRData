import gif from "../images/Spinner-3.gif"

export const Loader = ({ width }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={gif}
        alt="loading..."
        style={{ width: width, height: width }}
      ></img>
    </div>
  );
};
