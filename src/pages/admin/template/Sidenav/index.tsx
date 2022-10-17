import React from "react";
import { Paper, Box } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";

import { AdminSidenavOption } from "../../model";

type Props = {
  sidenavOptions: Array<AdminSidenavOption>;
  changeActiveNavOption: (option: AdminSidenavOption) => void;
};

const Sidenav = (props: Props) => {
  const { sidenavOptions, changeActiveNavOption } = props;

  return (
    <Paper
      className="admin-sidenav"
      sx={{ width: 250, margin: 2, borderRadius: 3 }}
    >
      <div className="admin-sidenav__header d-flex align-items-center justify-content-center gap-2">
        <GridViewIcon />
        <h6 className="m-0">Dashboard Admin</h6>
      </div>
      <div className="admin-sidenav__divider" />
      <Box sx={{ padding: 2 }}>
        {sidenavOptions.map((opt) => (
          <div
            className={`admin-sidenav__option d-flex align-items-center gap-3 ${
              opt.isActive ? "active" : ""
            }`}
            onClick={() => changeActiveNavOption(opt)}
            key={opt.label}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </div>
        ))}
      </Box>
    </Paper>
  );
};

export default Sidenav;
