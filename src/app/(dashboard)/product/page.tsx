
import { THeaderOption } from "@/components/page-container";
import PageContainerLists from "@/components/page-container/page-container-lists";
import { authOptions } from "@/lib/authOptions";
import { TMenuPermission } from "@/lib/type/tmenu";
import { getMenuPermission } from "@/services/authServices";
import { getProducts } from "@/services/productServices";
import { getServerSession } from "next-auth";
import ProductLists from "./lists";

const ProductPage = async() => {
  const headerOption:THeaderOption = {
    icon: "Package",
    title: "Product"
  }
  const session = await getServerSession(authOptions)
  const token = session?.user.token.accessToken || ""
  const permission:TMenuPermission =  await getMenuPermission("Product",token)
  const data = (await (await getProducts(token)).json())
  return (
    <PageContainerLists headerOption={headerOption} permission={permission}>
      <ProductLists data={data} permission={permission}/>
    </PageContainerLists>
  );
}

export default ProductPage;