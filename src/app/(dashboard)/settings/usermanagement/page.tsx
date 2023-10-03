import { THeaderOption } from "@/components/page-container"
import { authOptions } from "@/lib/authOptions"
import { TMenuPermission } from "@/lib/type/tmenu"
import { getMenuPermission } from "@/services/authServices"
import { getServerSession } from "next-auth"
import ClientUserPage from "./clientPage"
import { getRoleLists } from "@/services/roleServices"
import { getUserLists } from "@/services/userServices"

const UsermanagementPage = async() => {
  const headerOption:THeaderOption = {
    icon: "User",
    title: "User"
  }
  const session = await getServerSession(authOptions)
  const accessToken = session?.user.token.accessToken || ""
  const permission:TMenuPermission =  await getMenuPermission("User management",accessToken)
  const roleLists = await getRoleLists(accessToken)
  const userLists = await getUserLists(accessToken)
  return (
    <ClientUserPage 
      headerOption={headerOption}
      permission={permission}
      accessToken={accessToken}
      roleLists={roleLists}
      Lists={userLists}/>
  );
}

export default UsermanagementPage