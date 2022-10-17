import React from "react";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

type Props = {
  title: string;
};

const AdminBreadCrumb = (props: Props) => {
  const { title } = props;

  return (
    <div className="py-2 admin-breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="">
          <HomeIcon />
        </Link>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
      <p className="title">{title}</p>
    </div>
  );
};

export default AdminBreadCrumb;
