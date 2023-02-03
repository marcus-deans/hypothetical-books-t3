import React from "react";
import Head from "next/head";
import SalesLine from "../components/SalesLine";

function sales() {
  return (
    <>
      <Head>
        <title>Sales</title>
      </Head>
      <div>sales</div>
      <SalesLine quantity={40} unitWholesalePrice={3.99} />
    </>
  );
}

export default sales;
