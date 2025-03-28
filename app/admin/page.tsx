import React from "react";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGrapghData";
import NullData from "../components/NullData";

const Admin = async () => {
  const products = await getProducts({ category: null });
  // const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  // if (orders.length === 0) {
  //   return <NullData title="Opps! No Order yet" />;
  // }
  return (
    <div className="pt-6">
      <Container>
        {/* <Summary products={products} orders={orders} users={users} /> */}
        <div className="mt-4 mx-auto max-w-[1150px]:">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default Admin;
