import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../app/hooks";
import { handleLoading } from "../../../app/globalSlice";
import customToast, {
  ToastType,
} from "../../../components/CustomToast/customToast";
import { useNavigate } from "react-router-dom";
import { PageUrl } from "../../../configuration/enum";
import PreloadingWrapper from "../../../components/PreloadingWrapper/PreloadingWrapper";
import { getRoles, updateUserRole } from "../../Profile/userSlice";
import { UserRole } from "./interface";
import { useSelector } from "react-redux";
import { authSelector } from "../../../app/selector";

const AuthRoles = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector(authSelector).auth;
  const { id: userId } = auth;

  const iconRoles = [
    <ShoppingCartOutlinedIcon fontSize="large" />,
    <CleaningServicesOutlinedIcon fontSize="large" />,
    <DvrOutlinedIcon fontSize="large" />,
  ];

  const [activeRole, setActiveRole] = useState<number>(0);
  const [userRoles, setUserRoles] = useState<UserRole[] | null>(null);

  const navigateTo = (path: string) => {
    dispatch(handleLoading(true));
    navigate(path, { replace: false });
  };

  const handleClickRole = async (roleId: string) => {
    dispatch(handleLoading(true));
    const updateRoleResponse: any = await dispatch(
      updateUserRole({ userId, roleId })
    ).unwrap();
    const { success, message } = updateRoleResponse;
    const msgValue = t(`${message}`);

    if (success) {
      customToast(ToastType.SUCCESS, msgValue);

      navigateTo(`../../${PageUrl.HOME}`);
    } else {
      customToast(ToastType.ERROR, msgValue);
    }

    dispatch(handleLoading(false));
  };

  useEffect(() => {
    dispatch(handleLoading(true));
    const fetchData = async () => {
      const dataResult: any = await dispatch(getRoles()).unwrap();
      const { success, data } = dataResult;

      if (success) {
        const newUserRoles = iconRoles.map((icon, idx) => {
          const { roleId, name, description } = data[idx];
          return {
            icon,
            id: roleId,
            label: name,
            description,
          };
        });
        setUserRoles(newUserRoles);
      }
      dispatch(handleLoading(false));
    };

    fetchData();
  }, []);

  return (
    <PreloadingWrapper>
      {userRoles ? (
        <div className="authpage-left__roles">
          <h2 className="text-center">{t("auth.roles.title")}</h2>
          <div className="roles-container container-fluid">
            <div className="row m-0 gap-4">
              {userRoles.map((role, idx) => (
                <div key={`role-${idx}`} className="col p-0">
                  <div
                    className={`roles-card d-flex flex-column align-items-center justify-content-center p-4 ${
                      idx === activeRole ? "roles-card--active" : ""
                    }`}
                    onClick={() => setActiveRole(idx)}
                  >
                    <div className="roles-card__img mb-3">{role.icon}</div>
                    <div className="roles-card__label text-center">
                      <p className="m-0">{t(`${role.label}`)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-12 px-0 px-lg-5 mt-4">
                <p className="text-center fw-semibold m-0">
                  {t(`${userRoles[activeRole].description}`)}
                </p>
              </div>
            </div>
          </div>

          <div className="roles-button d-flex justify-content-center">
            <Button
              variant="contained"
              sx={{ borderRadius: "20px" }}
              fullWidth
              onClick={() => handleClickRole(userRoles[activeRole].id)}
            >
              {t("auth.roles.continue")}
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </PreloadingWrapper>
  );
};

export default AuthRoles;
