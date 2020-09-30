import React from "react";
import Lottie from "react-lottie";
import NotFound from "../../images/JSON/not-found.json";
import "./styles.css";

const NothingFd = () => {
  return (
    <div className="dv-not-found">
      <h2>Nada encontrado!</h2>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: NotFound,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={250}
        width={250}
      />
    </div>
  );
};

export default NothingFd;
