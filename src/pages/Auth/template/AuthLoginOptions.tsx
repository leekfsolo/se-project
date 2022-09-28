import React from "react";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { GoogleSVG } from "../../../assets";
import { fbAuth } from "../../../firebase";

const AuthLoginOptions = () => {
  const { t } = useTranslation();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const signInResult = await signInWithPopup(fbAuth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(signInResult);
    const token = credential?.accessToken;
    const user = signInResult.user;

    console.log(token, user);
  };

  return (
    <div className="signup-option mt-4 mb-3">
      <div className="signup-option__or text-center mb-3">
        <span className="px-3 fw-semibold">{t("auth.signin.signin.with")}</span>
      </div>
      <div className="social-options row m-0 justify-content-center">
        <div className="option col-6" onClick={signInWithGoogle}>
          <GoogleSVG className="option-google" />
          <span>Google</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginOptions;
