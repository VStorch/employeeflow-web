import NavBar from "../shared/components/NavBar";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <>
      <NavBar />

      <main className="container mt-4">{children}</main>
    </>
  );
}

export default MainLayout;
