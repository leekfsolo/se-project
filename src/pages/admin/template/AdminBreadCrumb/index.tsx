import React, { MutableRefObject } from "react";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import useScrollTop from "../../../../utils/hooks/useScrollTop";

type Props = {
  title: string;
  iref: MutableRefObject<any>;
};

const AdminBreadCrumb = (props: Props) => {
  const { title, iref } = props;
  const scrollTop = useScrollTop(iref);

  return (
    <div
      className={`p-3 admin-breadcrumb ${
        scrollTop > 10 ? "admin-breadcrumb--scrolled" : ""
      }`}
    >
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
