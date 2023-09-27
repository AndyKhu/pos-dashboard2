import PageContainerLists from "@/components/page-container/page-container-lists";
import SalesLists from "./lists";
import { THeaderOption } from "@/components/page-container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { TMenuPermission } from "@/lib/type/tmenu";
import { getMenuPermission } from "@/services/authServices";
import { getSales } from "@/services/saleServices";

const SalesPage = async() => {
  const headerOption:THeaderOption = {
    icon: "ShoppingBag",
    title: "Sales"
  }
  const session = await getServerSession(authOptions)
  const token = session?.user.token.accessToken || ""
  const permission:TMenuPermission =  await getMenuPermission("Sales",token)
  const data = (await (await getSales(token)).json())
  return (
    <PageContainerLists headerOption={headerOption} permission={permission}>
      <SalesLists data={data} permission={permission}/>
    </PageContainerLists>
  );
}

export default SalesPage;