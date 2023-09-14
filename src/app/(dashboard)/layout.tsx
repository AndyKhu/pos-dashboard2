import Sidebar from "@/components/layout/sidebar";
import LayoutWrapper from "@/components/layout/wrapper";

const DashboardLayout = ({children}:React.PropsWithChildren) => {
  return (
    <LayoutWrapper>
      <Sidebar/>
      {children}
    </LayoutWrapper>
  );
}

export default DashboardLayout;