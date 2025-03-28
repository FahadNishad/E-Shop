import Container from "@/app/components/Container";
import React from "react";
import ManageProductsClient from "./ManageProducts";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts =  async() => {

  const products = await getProducts({category:null})
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role != "ADMIN") {
    return <NullData title="Opps! Access denied" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
