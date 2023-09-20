import { useRef } from "react";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { Route, Routes } from "react-router-dom";

import { AppLayout } from "layout/AppLayout";
import { AppPage } from "pages/AppPage";

export function RootPage() {
  const notistackRef = useRef<SnackbarProvider | null>(null);
  function onClickDismiss(key: SnackbarKey) {
    if (notistackRef !== null && notistackRef.current !== null) {
      notistackRef.current.closeSnackbar(key);
    }
  }

  return (
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      autoHideDuration={5000}
      action={(key: SnackbarKey) => (
        <IconButton onClick={() => onClickDismiss(key)} color="inherit">
          <Close />
        </IconButton>
      )}
    >
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AppPage />} />
        </Route>
      </Routes>
    </SnackbarProvider>
  );
}
