import type { ReactNode } from "react";

import Sidebar from "../shared/components/Sidebar";

type Props = {
  children: ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="d-flex">
      <Sidebar />

      <main
        className="flex-grow-1"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="container-fluid p-4 p-lg-5">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout;
