import { Outlet } from "react-router-dom";

import { Header } from "components/layout/Header";

export function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
