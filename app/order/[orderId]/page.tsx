import Container from "@/app/components/Container";
import React from "react";
import moment from "moment";
import { Rating } from "@mui/material";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}
const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);

  if(!order) return <NullData title="No Orders"/>
  return (
    <div className="mt-5">
      <Container>
        <OrderDetails order={order} />
        <div className="flex flex-col mt-20 gap-4"></div>
      </Container>
    </div>
  );
};

export default Order;
