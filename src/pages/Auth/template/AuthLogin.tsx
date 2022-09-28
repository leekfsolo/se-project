import React from "react";

import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import InputAdornment from "@mui/material/InputAdornment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { IFormSignin } from "./interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { handleLoading } from "../../../app/globalSlice";
import { authenticate } from "../authSlice";
import { useAppDispatch } from "../../../app/hooks";
import { PageUrl } from "../../../configuration/enum";
import "react-toastify/dist/ReactToastify.css";
import customToast, {
  ToastType,
} from "../../../components/CustomToast/customToast";
import AuthLoginOptions from "./AuthLoginOptions";
import PreloadingWrapper from "../../../components/PreloadingWrapper/PreloadingWrapper";
import useLoading from "../../../utils/hooks/useLoading";

const AuthLogin = () => {
  const { handleSubmit, control } = useForm<IFormSignin>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    dispatch(handleLoading(true));
    navigate(path, { replace: false });
  };
  const submitFormHandler: SubmitHandler<IFormSignin> = async (data) => {
    try {
      dispatch(handleLoading(true));
      const loginResponse: any = await dispatch(authenticate(data)).unwrap();
      const { success, message } = loginResponse;
      const msgValue = t(`${message}`);
      if (success) {
        customToast(ToastType.SUCCESS, msgValue);
        navigateTo(PageUrl.HOME);
      } else {
        customToast(ToastType.ERROR, msgValue);
      }
    } catch (error) {
      alert("server is not working");
    }
    dispatch(handleLoading(false));
  };

  useLoading();

  return (
    <PreloadingWrapper>
      <div className="authpage-left__signin">
        <h2 className="text-center">{t("auth.signin")}</h2>
        <p className="text-center">{t("auth.signin.description")}</p>

        <form
          onSubmit={handleSubmit(submitFormHandler)}
          method="POST"
          action="#"
          noValidate
        >
          <FormControl variant="standard" className="w-100 mt-4 mb-2">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  className="mb-4"
                  label={t("field.username")}
                  variant="outlined"
                  placeholder="example@gmail.com"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                  value={field.value || ""}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  className="mb-4"
                  label={t("field.password")}
                  type="password"
                  variant="outlined"
                  placeholder={t("auth.signin.password.placeholder")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                  value={field.value || ""}
                />
              )}
            />

            <Button className="py-3" variant="contained" type="submit">
              {t("auth.signin")}
            </Button>
          </FormControl>
        </form>

        <div className="d-flex justify-content-between">
          <p className="text-variant">{t("auth.signin.forgot.password")}</p>
          <p className="text-variant" onClick={() => navigateTo("../signup")}>
            {t("auth.signup.create")}
          </p>
        </div>

        <AuthLoginOptions />
      </div>
    </PreloadingWrapper>
  );
};

export default AuthLogin;
