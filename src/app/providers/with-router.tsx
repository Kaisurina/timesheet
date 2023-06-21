import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = (Component: React.ComponentType) => () =>
  (
    <BrowserRouter>
      <Suspense
      // fallback={
      //   <>
      //     <Header />
      //     <CircularProgress
      //       sx={{
      //         position: "absolute",
      //         top: "33%",
      //         left: "50%",
      //         ml: "-3rem",
      //         mt: "-3rem",
      //       }}
      //       size={"6rem"}
      //     />
      //   </>
      // }
      >
        <Component />
      </Suspense>
    </BrowserRouter>
  );
