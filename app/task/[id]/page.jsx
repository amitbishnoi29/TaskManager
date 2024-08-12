import EditWrapper from "@/components/EditWrapper";
import React from "react";

export const dynamic = "force-dynamic";

const page = ({ params }) => {
  const { id } = params;

  return <EditWrapper id={id} />;
};

export default page;
