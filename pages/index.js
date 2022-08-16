import tw from "twin.macro";
import styled from "styled-components";
import MainLayout from "../components/layout/MainLayout";
import Link from "next/link";

const Button = tw.button`
  px-5 py-2 border border-color-primary text-color-primary hover:bg-color-primary hover:text-color-white rounded mt-2 transition-all
`;

const Button2 = tw(Button)`
border-color-secondary text-color-secondary hover:bg-color-secondary transition-all
`;

export default function Home() {
  return (
    <div className="bg-color-background px-2 min-h-screen">
      <div className="container mx-auto">
        <h2 className="pt-10 text-center">Hello. This is HomePage</h2>
        <h2 className="pt-10 text-center">TEST ABC</h2>
        <Link href="/testmyaccount">Go</Link>
        {/* <Button>Demo twin.macro</Button>
        <br></br>
        <Button2>Demo twin.macro 2</Button2> */}
        {/* <StyledForm>
          <form>
            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <button>Sign In</button>
          </form>
        </StyledForm> */}
      </div>
    </div>
  );
}

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
