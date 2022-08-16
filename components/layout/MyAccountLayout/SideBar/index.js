import tw from "twin.macro";
import SideBarItem from "./SideBarItem";

const SideBarCss = tw.div`
    w-[260px] mr-10 pt-4 pb-3 bg-white rounded h-auto
`;

let data = [
  {
    link: "/myaccount",
    title: "My bookings",
    icon: "/assets/images/MyAccount/my-promotions-icon.svg",
  },
  {
    link: "/myaccount",
    title: "My Promotions",
    icon: "/assets/images/MyAccount/my-promotions-icon.svg",
  },
  {
    link: "/myaccount",
    title: "My Profile Details",
    icon: "/assets/images/MyAccount/my-profile-details-icon.svg",
  },
  {
    link: "/myaccount",
    title: "Make Payment",
    icon: "/assets/images/MyAccount/make-payment-icon.svg",
  },
  {
    link: "/myaccount",
    title: "Payment History",
    icon: "/assets/images/MyAccount/payment-history-icon.svg",
  },
  {
    link: "/myaccount",
    title: "My Review",
    icon: "/assets/images/MyAccount/my-review-icon.svg",
  },
  {
    link: "/myaccount",
    title: "My Settings",
    icon: "/assets/images/MyAccount/my-setting-icon.svg",
  },
];

const SideBar = () => {
  return (
    <SideBarCss>
      {data.map((item, index) => {
        return (
          <SideBarItem
            key={index}
            link={item.link}
            title={item.title}
            icon={item.icon}
          />
        );
      })}
    </SideBarCss>
  );
};

export default SideBar;
