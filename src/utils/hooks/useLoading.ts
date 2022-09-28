import { useEffect } from "react";
import { handleLoading } from "../../app/globalSlice";
import { useAppDispatch } from "../../app/hooks";

export default function useLoading() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async () => {
      dispatch(handleLoading(true));

      await new Promise((r) => setTimeout(r, 1500));

      dispatch(handleLoading(false));
    };

    loadData();
  }, []);
}
