import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { THeaderOption } from "@/components/page-container";
import { Menuicon } from "@/components/ui/menuIcon";
import { getEnumLists } from "@/services/enumServices";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ProductForm from "./form";
import { getProduct } from "@/services/productServices";
import { getMenuPermission } from "@/services/authServices";
import { TMenuPermission } from "@/lib/type/tmenu";

const ProductFormPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  const token = session?.user.token.accessToken || ""
  const permission:TMenuPermission =  (await (await getMenuPermission("Product",token)).json()).permission

  const headerOption:THeaderOption = {
    icon: "Package",
    title: "Product Form"
  }
  const product = (await (await getProduct(params.id,token)).json()).data
  if(!product && params.id !== "add")
    notFound()
  const unitLists = (await (await getEnumLists("UNIT",token)).json()).data
  const categoryLists = (await (await getEnumLists("CATEGORY",token)).json()).data
  const brandLists = (await (await getEnumLists("BRAND",token)).json()).data
  if(!permission.view)
    return (<div>You got no access here.</div>)
  return (
    <div className="max-w-5xl mx-auto p-2 space-y-2">
      <Card>
        <div className="flex items-center px-5 h-14 md:h-20 justify-between">
          <span className="flex items-center space-x-3">
            <Menuicon name={headerOption.icon}/>
            <h2 className="font-semibold text-lg md:text-xl capitalize">{headerOption.title}</h2>
          </span>
        </div>
      </Card>
      <Card>
        <ProductForm product={product} lists={{unitLists,categoryLists,brandLists}} permission={permission}/> 
      </Card>
    </div>
  );
}

export default ProductFormPage;