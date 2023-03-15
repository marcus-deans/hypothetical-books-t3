import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import type { NextPage } from "next";
// import SwaggerUI from "swagger-ui-react";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

const Docs: NextPage = () => {
  return (
    <div className="bg-white">
      <SwaggerUI url="/api/docs/openapi.json" />;
    </div>
  );
};

export default Docs;
