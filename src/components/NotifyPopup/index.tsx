import React from "react";
import { useTranslation } from "react-i18next";
import { animated, useTransition } from "react-spring";

type Props = {
  toggle: boolean;
  handleSaveFunc: (isSave?: boolean) => void;
};

const NotifyPopup = (props: Props) => {
  const { t } = useTranslation();
  const { toggle, handleSaveFunc } = props;
  const transitions = useTransition(toggle, {
    from: { opacity: 0, transform: "translate(-50%, 200%)" },
    enter: { opacity: 1, transform: "translate(-50%, 0%)" },
    leave: { opacity: 0, transform: "translate(-50%, 200%)" },
    expires: true,
  });

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          className="profile-notify align-items-center justify-content-between"
          style={styles}
        >
          <p className="m-0">{t("notify.avatar.changes")}</p>
          <div className="notify-options d-flex align-items-center gap-3">
            <span
              className="notify-options__reset"
              onClick={() => handleSaveFunc()}
            >
              {t("notify.reset")}
            </span>
            <span
              className="notify-options__save"
              onClick={() => handleSaveFunc(true)}
            >
              {t("notify.save")}
            </span>
          </div>
        </animated.div>
      )
  );
};

export default NotifyPopup;
