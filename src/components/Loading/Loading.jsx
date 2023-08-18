import loading from "../../assets/loading.gif";

const Loading = () => {
  return (
    <div
      className="h-screen d-flex justify-content-center align-items-center"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: "1000",
      }}
    >
      <img src={loading} alt="" />
    </div>
  );
};

export default Loading;
