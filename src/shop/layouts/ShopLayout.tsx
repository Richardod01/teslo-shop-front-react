import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";
import { CustomFooter } from "../components/CustomFooter";

function ShopLayout() {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader />
      <Outlet />
      <CustomFooter />
    </div>
  );
}

export default ShopLayout;
