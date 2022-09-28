import React, { useState, Fragment } from "react";

import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { LocaleCode } from "../../configuration/enum";
import { UK_Flag, VN_Flag } from "../../assets";
import { useTranslation } from "react-i18next";
import { swapLanguage } from "../../utils/helpers/swapLanguage";
import { useDispatch, useSelector } from "react-redux";
import { globalSelector } from "../../app/selector";
import { changeLocale } from "../../app/globalSlice";

type Props = {
  CStyle?: object;
};

const Globe = (props: Props) => {
  const { CStyle } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLocale = useSelector(globalSelector).locale;
  const [open, setOpen] = useState<boolean>(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltiptoggle = () => {
    setOpen(!open);
  };
  const handleLanguageChange = (code: LocaleCode) => {
    dispatch(changeLocale(code));
    swapLanguage(code);
  };

  const localeList = [
    {
      locale: "locale.vietnamese",
      code: LocaleCode.VIE,
      flag: VN_Flag,
    },
    {
      locale: "locale.english",
      code: LocaleCode.ENG,
      flag: UK_Flag,
    },
  ];

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
        open={open}
        classes={{
          tooltip: "authpage-right__language-tooltip",
        }}
        title={
          <Fragment>
            {localeList.map((item) => (
              <div
                className="d-flex align-items-center justify-content-between locale-item"
                onClick={() => handleLanguageChange(item.code)}
                key={item.code}
              >
                <div
                  className={`d-flex align-items-center gap-2 ${
                    item.code === currentLocale ? "locale-item--active" : ""
                  }`}
                >
                  {item.flag && (
                    <img
                      src={item.flag}
                      alt="flag"
                      className="img-fluid"
                      width={24}
                    />
                  )}
                  <p className="m-0" key={`locale-${item.code}`}>
                    {t(`${item.locale}`)}
                  </p>
                </div>
                {item.code === currentLocale && <DoneIcon fontSize="small" />}
              </div>
            ))}
          </Fragment>
        }
      >
        <LanguageOutlinedIcon
          sx={{ fill: "#fff", cursor: "pointer", ...CStyle }}
          onClick={handleTooltiptoggle}
        />
      </Tooltip>
    </ClickAwayListener>
  );
};

export default Globe;
