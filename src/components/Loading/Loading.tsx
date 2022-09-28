import React, { FC } from "react";

import { animated, TransitionFn } from "react-spring";
import { ThreeDots } from "react-loader-spinner";

type Props = {
  transitions: TransitionFn<boolean, any>;
};

const Loading: FC<Props> = (props) => {
  const { transitions } = props;
  const height = document.body.scrollHeight;

  return transitions(
    (styles, item) =>
      item && (
        <animated.div className="loading" style={{ height, ...styles }}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#106eea"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </animated.div>
      )
  );
};

export default Loading;
