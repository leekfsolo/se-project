import React, { useState } from "react";

import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IFormInfo, PersonalInfo } from "../../Auth/template/interface";
import { useAppDispatch } from "../../../app/hooks";
import { handleLoading } from "../../../app/globalSlice";
import { useTranslation } from "react-i18next";
import customToast, {
  ToastType,
} from "../../../components/CustomToast/customToast";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { updateInfo } from "../userSlice";

type Props = {
  data: IFormInfo;
};

const ProfileDetail = (props: Props) => {
  const { data } = props;
  const { address, birthDate, email, fullname, gender, phone, username } = data;
  const { t } = useTranslation();
  const { control, handleSubmit, register } = useForm<IFormInfo>({
    defaultValues: {
      fullname,
      email,
      phone,
      gender,
      address,
      birthDate,
      username,
    },
  });
  const [initBirthDate, setInitBirthDate] = useState<Dayjs | null>(dayjs());
  const dispatch = useAppDispatch();

  const personalInfo: Array<PersonalInfo> = [
    {
      label: "field.fullname",
      id: "fullname",
    },
    {
      label: "field.username",
      id: "username",
    },
    { label: "field.email", id: "email" },
    { label: "field.phone", id: "phone" },
    { label: "field.gender", id: "gender" },
    {
      label: "field.birthdate",
      id: "birthDate",
    },
    { label: "field.address", id: "address" },
  ];

  const submitFormHandler: SubmitHandler<IFormInfo> = async (data) => {
    dispatch(handleLoading(true));
    const updateResponse: any = await dispatch(updateInfo(data)).unwrap();
    const { success, message } = updateResponse;
    const msgValue = t(`${message}`);

    if (success) customToast(ToastType.SUCCESS, msgValue);
    else customToast(ToastType.ERROR, msgValue);

    dispatch(handleLoading(false));
  };

  return (
    <div className="profile-detail h-100">
      <h1 className="profile-detail__title m-0">{t("information.account")}</h1>

      <div className="container-fluid profile-detail__description">
        <form
          onSubmit={handleSubmit(submitFormHandler)}
          method="POST"
          action="#"
          noValidate
        >
          <FormControl className="w-100">
            {personalInfo.map((item) => (
              <div
                className="row mx-0 p-0 detail-item align-items-center"
                key={item.id}
              >
                <div className="col-3 d-flex flex-column">
                  <label
                    htmlFor={`${
                      item.id === "gender" ? "genderGroup" : item.id
                    }`}
                    className="d-block"
                  >
                    {t(item.label)}
                  </label>
                </div>
                <div className="col">
                  <Controller
                    name={item.id}
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <>
                          {item.id === "birthDate" ? (
                            <DatePicker
                              openTo="year"
                              disableFuture
                              onChange={(value) => setInitBirthDate(value)}
                              value={initBirthDate}
                              className="w-100 mb-1"
                              renderInput={(params) => (
                                <TextField
                                  variant="filled"
                                  className="mb-1 w-100"
                                  {...params}
                                />
                              )}
                            />
                          ) : item.id === "gender" ? (
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              className="flex-row gap-2"
                              {...field}
                              value={field.value}
                            >
                              <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label={t("field.gender.male")}
                              />
                              <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label={t("field.gender.female")}
                              />
                              <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label={t("field.gender.other")}
                              />
                            </RadioGroup>
                          ) : (
                            <section className="w-100">
                              <TextField
                                className="mb-1 w-100"
                                placeholder={t(`${item.label}`)}
                                variant="filled"
                                error={error ? true : false}
                                {...register(item.id, {
                                  required: "field.error.required",
                                })}
                                {...field}
                                value={field.value}
                              />
                              {error && (
                                <div className="form-text-error">
                                  {t(`${error.message}`)}
                                </div>
                              )}
                            </section>
                          )}
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          </FormControl>
          <div className="row mx-0 p-0">
            <div className="col-3"></div>
            <div className="col">
              <Button variant="contained" type="submit">
                {t("update")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetail;
