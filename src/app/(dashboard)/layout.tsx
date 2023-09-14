import LayoutWrapper from "@/components/layout/wrapper";

const DashboardLayout = ({children}:React.PropsWithChildren) => {
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  );
}

export default DashboardLayout;