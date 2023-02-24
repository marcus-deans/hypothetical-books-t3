import Nav from "./Nav";
import Footer from "./Footer";
//eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = ({ children }: any) => {
  return (
    <>
      <div className="font-sans leading-normal tracking-normal">
        <Nav />
        <div className="m-0 w-full bg-cover bg-bottom p-0">
          <div className="container mx-auto max-w-full break-normal pt-16 text-center md:pt-32"></div>
        </div>

        <div className="container mx-auto -mt-32 max-w-full px-4 md:px-0">
          <div className="mx-0 sm:mx-6">
            <div className="w-full rounded-t leading-normal">
              <center>{children}</center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
