import React from "react";
import Lottie from "react-lottie";
// EXTERNAL IMAGES
import Waiting from "../../images/JSON/waiting.json";
// EXTERNAL STYLES
import "./styles.css";

const WaitAction = () => {
  return (
    <div className="dv-waiting">
      <h2>Use as opções para buscar o que deseja</h2>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: Waiting,
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

export default WaitAction;
