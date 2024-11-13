"use client";

import { useParams } from "react-router-dom";

const Page = () => {
  const params = useParams();
  return (
    <div className="h-full overflow-auto p-4">
      <h1 className="text-xl">{params.id}</h1>
    </div>
  );
};

export default Page;
