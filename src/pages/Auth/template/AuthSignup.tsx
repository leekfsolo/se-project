import React, { useState } from "react";

import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IFormSignup } from "../interface";
import { handleLoading } from "../../../app/globalSlice";
import { useAppDispatch } from "../../../app/hooks";
import { PageUrl } from "../../../configuration/enum";
import customToast, {
  ToastType,
} from "../../../components/CustomToast/customToast";
import AuthLoginOptions from "./AuthLoginOptions";
import PreloadingWrapper from "../../../components/PreloadingWrapper/PreloadingWrapper";
import useLoading from "../../../utils/hooks/useLoading";
import { useLoginMutation } from "../authApiSlice";
import { useRegisterMutation } from "../../Profile/userApiSlice";

const AuthSignup = () => {
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const { handleSubmit, control, register } = useForm<IFormSignup>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [signup] = useRegisterMutation();

  const navigateTo = (path: string) => {
    dispatch(handleLoading(true));
    navigate(path, { replace: false });
  };
  const submitFormHandler: SubmitHandler<IFormSignup> = async (data) => {
    dispatch(handleLoading(true));

    const signupResponse: any = await signup(data).unwrap();
    const { success, message } = signupResponse;
    const msgValue = t(`${message}`);

    if (success) {
      customToast(ToastType.SUCCESS, msgValue);
      const { username, password } = data;

      const loginResponse = await login({ username, password }).unwrap();
      const { success } = loginResponse;

      if (success) {
        navigateTo(`../${PageUrl.ROLES}`);
      }
    } else {
      customToast(ToastType.ERROR, msgValue);
    }

    setCheckboxValue(false);
    dispatch(handleLoading(false));
  };

  useLoading();

  return (
    <PreloadingWrapper>
      <div className="authpage-left__signup">
        <h2 className="text-center mb-2">{t("auth.signup")}</h2>

        <form
          onSubmit={handleSubmit(submitFormHandler)}
          method="POST"
          action="#"
          noValidate
        >
          <FormControl className="w-100">
            <Controller
              name="fullname"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <section className="mb-1 w-100">
                  <TextField
                    className="mb-1"
                    label={t("field.fullname")}
                    placeholder={t("field.fullname")}
                    variant="standard"
                    error={error ? true : false}
                    {...register("fullname", {
                      required: "field.error.required",
                    })}
                    {...field}
                    value={field.value || ""}
                  />
                  {error && (
                    <div className="form-text-error">
                      {t(`${error.message}`)}
                    </div>
                  )}
                </section>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <section className="mb-1 w-100">
                  <TextField
                    className="mb-1"
                    label={t("field.email")}
                    placeholder={t("field.email")}
                    type="email"
                    variant="standard"
                    error={error ? true : false}
                    {...register("email", {
                      required: "field.error.required",
                      pattern: {
                        value:
                          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "field.error.email.pattern",
                      },
                    })}
                    {...field}
                    value={field.value || ""}
                  />
                  {error && (
                    <div className="form-text-error">
                      {t(`${error.message}`)}
                    </div>
                  )}
                </section>
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <section className="mb-1 w-100">
                  <TextField
                    className="mb-1"
                    label={t("field.username")}
                    placeholder={t("field.username")}
                    variant="standard"
                    error={error ? true : false}
                    {...register("username", {
                      required: "field.error.required",
                    })}
                    {...field}
                    value={field.value || ""}
                  />
                  {error && (
                    <div className="form-text-error">
                      {t(`${error.message}`)}
                    </div>
                  )}
                </section>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <section className="mb-3 w-100">
                  <TextField
                    className="mb-1"
                    label={t("field.password")}
                    placeholder={t("field.password")}
                    type="password"
                    variant="standard"
                    error={error ? true : false}
                    {...register("password", {
                      required: "field.error.required",
                    })}
                    {...field}
                    value={field.value || ""}
                  />
                  {error && (
                    <div className="form-text-error">
                      {t(`${error.message}`)}
                    </div>
                  )}
                </section>
              )}
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setCheckboxValue(!checkboxValue)}
                  value={checkboxValue}
                />
              }
              className="mb-2"
              label={
                <span>
                  <span>{t("auth.signup.agree")} </span>
                  <span className="text-variant">{t("auth.signup.terms")}</span>
                </span>
              }
            />

            <Button
              className="py-3"
              variant="contained"
              type="submit"
              disabled={!checkboxValue}
            >
              {t("auth.signup.create")}
            </Button>
          </FormControl>
        </form>

        <AuthLoginOptions />

        <div className="signup-forgot text-center">
          <span>{t("auth.signup.already")} </span>
          <span
            className="text-variant"
            onClick={() => navigateTo("../signin")}
          >
            {t("auth.signin")}
          </span>
        </div>
      </div>
    </PreloadingWrapper>
  );
};

export default AuthSignup;
