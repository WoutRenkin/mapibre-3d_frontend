import React, { Suspense } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { bootstrap } from "config/bootstrap";
import { theme } from "config/theme";
import { AppGlobalStyles } from "config/AppGlobalStyles";

import { RootPage } from "pages/RootPage";
import { GlobalErrorFallBack } from "components/boundary/GlobalErrorFallBack";
import { FullScreenLoader } from "components/loader/FullScreenLoader";

bootstrap();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Suspense fallback={<FullScreenLoader />}>
        <CssBaseline />
        <AppGlobalStyles />
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={GlobalErrorFallBack}>
            <BrowserRouter>
              <RootPage />
            </BrowserRouter>
          </ErrorBoundary>
        </QueryClientProvider>
      </Suspense>
    </MuiThemeProvider>
  </React.StrictMode>
);
