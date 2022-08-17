import { useEffect, useState } from "react";
import MyAccountLayout from "../../components/layout/MyAccountLayout";
import Image from "next/image";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
import Amplify, { API, withSSRContext } from "aws-amplify";

Amplify.configure({ ...awsExports, ssr: true });

const Myaccount = ({ json }) => {
  // const items = json?.isSuccessful == "true" && json.orderInsurance;
  const items = json;

  console.log("myaccount initialize: ", items);

  function Items({ currentItems }) {
    return (
      <>
        <ul>
          {items.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
        </ul>
        {/* {currentItems &&
          currentItems.map((item, index) => {
            return (
              <div key={index} className="h-[154px] bg-white rounded-lg">
                <div className="p-3 pb-5 h-full">
                  <div className="h-7 flex justify-start">
                    <div className="w-auto text-sm font-normal px-2 rounded bg-[#DEF1FF] color-[#002D75] leading-7 mr-3">
                      {moment(item.insertTime).format("MMM Do YY")}
                    </div>
                    <div className="w-auto text-sm font-normal px-2 rounded bg-[#E2FFE5] color-[#00AB53] leading-7">
                      Successful
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex">
                      <div className="mr-5 ml-2 flex">
                        <Image
                          src="/assets/images/MyAccount/hotels-icon.svg"
                          alt="Picture of the author"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-sm font-normal text-[#4F4F4F]">
                          Booking ID #{item.orderId}
                        </span>
                        <span className="text-xl font-medium text-[#4F4F4F] mt-1">
                          {item.insuranceName} x{item.quantity}
                        </span>
                        <span className="text-sm font-normal text-[#4F4F4F] mt-1">
                          27/06/2022 - 28/6/2022
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-end">
                      <div className="flex justify-end mt-3">
                        <Image
                          src="/assets/images/MyAccount/payments-icon.png"
                          alt="Picture of the author"
                          width={40}
                          height={26}
                        />
                      </div>
                      <div className="text-xl font-medium text-[#4F4F4F] mt-auto">
                        US$ {item.paymentPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })} */}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      // console.log(
      //   `User requested page number ${event.selected}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="react-paginate"
        />
      </>
    );
  }

  return (
    <div>
      <div className="h-12 w-full rounded relative bg-color-secondary"></div>
      <div className="mt-8 h-auto mb-16 mx-auto grid grid-cols-1 xl:grid-cols-2 gap-5">
        {!!items ? (
          <>
            <PaginatedItems itemsPerPage={2} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const res = await fetch("https://62fbaabfe4bcaf53518aad31.mockapi.io/player");
  const json = await res.json();

  // console.log(json);

  return { props: { json } };
}

// Myaccount.getInitialProps = async (ctx) => {
//   const res = await fetch(
//     "https://apitest.travelner.com/frontend/test/myacount",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         userId: "235",
//         type: "insurance",
//         language: "en",
//         locationCode: "gx",
//         offset: 0,
//         limit: 10,
//       }),
//     }
//   );
//   const json = await res.json();

//   console.log(json);

//   return { json };
// };

// export async function getStaticProps(context) {
//   const res = await fetch(
//     "https://apitest.travelner.com/frontend/test/myacount",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         userId: "235",
//         type: "insurance",
//         language: "en",
//         locationCode: "gx",
//         offset: 0,
//         limit: 10,
//       }),
//     }
//   );
//   const json = await res.json();

//   console.log("get static props");
//   // console.log(json);

//   return { props: { json } };
// }

export default Myaccount;

Myaccount.getLayout = (page) => {
  return <MyAccountLayout>{page}</MyAccountLayout>;
};
