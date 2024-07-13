
import { Outlet } from "react-router-dom";

export default function MemberLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
