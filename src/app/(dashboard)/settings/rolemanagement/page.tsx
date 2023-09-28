import { THeaderOption } from "@/components/page-container";
import ClientRolePage from "./clientPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getMenuPermission } from "@/services/authServices";
import { TMenuPermission } from "@/lib/type/tmenu";
import { getMenuAccessForm, getRoleLists } from "@/services/roleServices";

const RolePage = async() => {
  const headerOption:THeaderOption = {
    icon: "User",
    title: "Role"
  }
  const session = await getServerSession(authOptions)
  const accessToken = session?.user.token.accessToken || ""
  const permission:TMenuPermission =  await getMenuPermission("Role management",accessToken)
  const Lists = await getRoleLists(accessToken)
  const menuAccessFormD:TMenuPermission[] = await getMenuAccessForm(accessToken)
  return (
    <ClientRolePage Lists={Lists} accessToken={accessToken} headerOption={headerOption} permission={permission} menuAccessFormD={menuAccessFormD}/>
  );
}

export default RolePage;