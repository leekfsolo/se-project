import React from "react";
import { useTranslation } from "react-i18next";
import { LoginScreenBg } from "../../../assets";
import Globe from "../../../components/Globe/Globe";

const HomeSreenRight = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column align-items-center justify-content-around h-100">
      <div className="authpage-right__language">
        <Globe />
      </div>
      <div className="authpage-right__heading text-center">
        <h1>{t("auth.welcome")}</h1>
        <p>{t("auth.description")}</p>
      </div>
      <div className="authpage-right__img">
        <img src={LoginScreenBg} alt="" className="img-fluid" />
      </div>
    </div>
  );
};

export default HomeSreenRight;
