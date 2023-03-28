import { Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

const index = () => {
  return (
    <>
      <Head>
        <title>Case Designer</title>
      </Head>
      <div className="pt-6">
        <div className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Welcome to Case Designer
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex justify-center space-x-10"></div>
                  <Link href="/designer/design" passHref>
                    <button className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
                      Add a New Case
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Select an Existing Case
            </div>
            <div className="relative space-y-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
