import React, { ReactElement } from "react";
import { useAppSelector } from "../../app/hooks";
import { globalSelector } from "../../app/selector";

type Props = {
  children: ReactElement;
};

const PreloadingWrapper = (props: Props) => {
  const { children } = props;
  const { isLoading } = useAppSelector(globalSelector);

  return <>{isLoading ? <div></div> : <>{children}</>}</>;
};

export default PreloadingWrapper;
