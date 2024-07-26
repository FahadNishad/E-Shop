import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./productDetails";
import ListRating from "@/app/components/products/ListRating";
import moment from "moment";
import { Rating } from "@mui/material";
import { products } from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";

interface IParams {
  productId?: string;
}
const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product) {
    return <NullData title="Opps! Product with given id does not exist" />;
  }



  return (
    <div className="mt-5">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
