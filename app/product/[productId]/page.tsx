import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./productDetails";
import { product } from "@/utils/product";
import ListRating from "@/app/components/products/ListRating";
import moment from "moment";
import { Rating } from "@mui/material";

interface IParams {
  productId?: string;
}
const Product = ({ params }: { params: IParams }) => {
  console.log("params", params);
  return (
    <div className="mt-5">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Ratings</div>
          <ListRating product={product} />
          
        </div>
      </Container>
    </div>
  );
};

export default Product;
