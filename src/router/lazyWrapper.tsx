import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const lazyWrapper = (Component: any) => {
  return (
    <Suspense
      fallback={
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            zIndex: 9999
          }}
        />
      }
    >
      <Component />
    </Suspense>
  );
};

export default lazyWrapper;
