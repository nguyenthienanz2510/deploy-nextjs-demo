import { useEffect, useState } from "react";
import MyAccountLayout from "../../components/layout/MyAccountLayout";
import Image from "next/image";
import moment from "moment";
import ReactPaginate from "react-paginate";
import tw from "twin.macro";

const Myaccount = () => {
  const [dataApi, setDataApi] = useState(null);

  console.log(dataApi);

  const items = dataApi?.isSuccessful == "true" && dataApi.orderInsurance;

  function Items({ currentItems }) {
    const TicketItemStyle = tw.div`
    h-[154px] bg-white rounded-lg
    `;

    const TicketItemWrapperStyle = tw.div`
    p-3 pb-5 h-full
    `;

    const TicketItemHeaderStyle = tw.div`
    h-7 flex justify-start
    `;

    const TicketItemBodyStyle = tw.div`
    flex justify-between mt-4
    `;

    const TicketItemImageStyle = tw.div`
    mr-5 ml-2 flex
    `;

    const TicketItemContent = tw.div`
    flex flex-col 
    `;

    const TextSm = tw.p`
    text-sm font-normal text-[#4F4F4F]`;

    const TextMd = tw.p`
    text-xl font-medium text-[#4F4F4F]`;

    const PriceWrapper = tw.div`
    flex flex-col`;

    const PriceStyle = tw.p`text-xl font-medium text-[#4F4F4F] mt-auto`;

    const PaymentImageStyle = tw.div`flex justify-end mt-3`;

    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => {
            return (
              <TicketItemStyle key={index}>
                <TicketItemWrapperStyle>
                  <TicketItemHeaderStyle>
                    <div className="w-auto text-sm font-normal px-2 rounded bg-[#DEF1FF] text-[#002D75] leading-7 mr-3">
                      {moment(item.insertTime).format("MMM Do YY")}
                    </div>
                    <div className="w-auto text-sm font-normal px-2 rounded bg-[#E2FFE5] text-[#00AB53] leading-7">
                      Successful
                    </div>
                  </TicketItemHeaderStyle>
                  <TicketItemBodyStyle>
                    <div className="flex">
                      <TicketItemImageStyle>
                        <Image
                          src="/assets/images/MyAccount/hotels-icon.svg"
                          alt="Picture of the author"
                          width={40}
                          height={40}
                        />
                      </TicketItemImageStyle>
                      <TicketItemContent>
                        <TextSm>Booking ID #{item.orderId}</TextSm>
                        <TextMd className="mt-1">
                          {item.insuranceName} x{item.quantity}
                        </TextMd>
                        <TextSm className="mt-1">27/06/2022 - 28/6/2022</TextSm>
                      </TicketItemContent>
                    </div>
                    <PriceWrapper>
                      <PaymentImageStyle className="flex justify-end mt-3">
                        <Image
                          src="/assets/images/MyAccount/payments-icon.png"
                          alt="Picture of the author"
                          width={40}
                          height={26}
                        />
                      </PaymentImageStyle>
                      <PriceStyle>US$ {item.paymentPrice}</PriceStyle>
                    </PriceWrapper>
                  </TicketItemBodyStyle>
                </TicketItemWrapperStyle>
              </TicketItemStyle>
            );
          })}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
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

  useEffect(() => {
    fetch("https://apitest.travelner.com/frontend/test/myacount", {
      method: "POST",
      body: JSON.stringify({
        userId: "235",
        type: "insurance",
        language: "en",
        locationCode: "gx",
        offset: 0,
        limit: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setDataApi(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const SearchStyle = tw.div`
  h-12 w-full rounded relative bg-color-secondary`;

  const TicketContainer = tw.div`
  mt-8 h-auto mb-16 mx-auto grid grid-cols-1 xl:grid-cols-2 gap-5
  `;

  return (
    <>
      <SearchStyle>
        {/* <input
          type="text"
          className=" h-12 w-96 rounded border border-color-primary pl-4"
        ></input>
        <span className="absolute h-12 w-12 right-0 text-center leading-[48px] cursor-pointer hover:bg-red-500 rounded">
          XXX
        </span> */}
      </SearchStyle>
      <TicketContainer>
        {!!items ? (
          <>
            <PaginatedItems itemsPerPage={2} />
          </>
        ) : (
          <></>
        )}
      </TicketContainer>
    </>
  );
};

export default Myaccount;

Myaccount.getLayout = (page) => {
  return <MyAccountLayout>{page}</MyAccountLayout>;
};
