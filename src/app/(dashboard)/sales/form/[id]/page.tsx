import { getServerSession } from "next-auth";
import SalesForm from "./form";
import { authOptions } from "@/lib/authOptions";
import { getSale } from "@/services/saleServices";
import { notFound } from "next/navigation";
import { getMenuPermission } from "@/services/authServices";
import { TMenuPermission } from "@/lib/type/tmenu";

const SaleForm = async({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  const accessToken = session?.user.token.accessToken || ""
  const sale = await getSale(params.id,accessToken)
  const permission:TMenuPermission =  await getMenuPermission("Sales",accessToken)

  if(!sale && params.id !== "add")
    notFound()
  return (
    <div className="max-w-5xl mx-auto p-2 space-y-2">
      <SalesForm sale={sale} permission={permission}/>
    </div>
  );
}

export default SaleForm;