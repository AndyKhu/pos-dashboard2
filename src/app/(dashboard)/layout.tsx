import Sidebar from "@/components/layout/sidebar";
import LayoutWrapper from "@/components/layout/wrapper";
import { Toaster } from "@/components/ui/toaster"

const DashboardLayout = ({children}:React.PropsWithChildren) => {
  return (
    <LayoutWrapper>
      <Sidebar/>
      {children}
      <Toaster />
    </LayoutWrapper>
  );
}

export default DashboardLayout;