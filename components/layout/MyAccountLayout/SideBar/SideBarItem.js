import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";

const SideBarItemStyle = tw.div`
    mb-1 h-10 pl-9 border-l-4 border-transparent hover:border-color-secondary hover:text-color-secondary
    cursor-pointer transition-all text-color-grey font-normal text-base
    flex items-center
    `;

const SideBarItem = (props) => {
  return (
    <SideBarItemStyle className="sidebar-item">
      <Link href="/myaccount">
        <a className="flex items-center hover-svg">
          <svg
            className="mr-4 sidebar-icon"
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path
              d="M12 11.572a2.857 2.857 0 1 0 0-5.715 2.857 2.857 0 0 0 0 5.715Z"
              stroke="#828282"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.273 6.337h1.539v-1.43c0-.757.324-1.484.901-2.02a3.201 3.201 0 0 1 2.176-.836h12.308a3.2 3.2 0 0 1 2.175.837c.577.535.901 1.262.901 2.02v14.286c0 .757-.324 1.484-.9 2.02a3.2 3.2 0 0 1-2.177.837H5.89a3.2 3.2 0 0 1-2.176-.837 2.758 2.758 0 0 1-.901-2.02v-1.429H1.273M1 11.572h1.429M1 8.715h1.429M1 14.43h1.429"
              stroke="#828282"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M16.286 15.858v-1.429a2.857 2.857 0 0 0-2.857-2.857h-2.857a2.857 2.857 0 0 0-2.857 2.857v1.429a1.428 1.428 0 0 0 1.428 1.429h5.715a1.429 1.429 0 0 0 1.428-1.429Z"
              stroke="#828282"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* <div className="mr-4">
            <Image
              className="sidebar-icon"
              src={props.icon}
              alt="Picture of the author"
              width={24}
              height={24}
            />
          </div> */}
          <p>{props.title}</p>
        </a>
      </Link>
    </SideBarItemStyle>
  );
};

export default SideBarItem;
