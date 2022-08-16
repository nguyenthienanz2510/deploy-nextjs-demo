import Link from "next/link";
import React from "react";

const test = ({ json }) => {
  const items = json;
  console.log("TEST: ", items);

  return (
    <div>
      <div className="h-12 w-full rounded relative bg-color-secondary"></div>
      <Link href="/myaccountInitial">Return</Link>
      <div>
        {items.data.map((item, index) => {
          return <div key={index}>{item.type}</div>;
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    "https://apitest.travelner.com/frontend/test/product"
  );
  const json = await res.json();

  // console.log(json);

  // console.log(ctx);
  return { props: { json } };
}

export default test;
