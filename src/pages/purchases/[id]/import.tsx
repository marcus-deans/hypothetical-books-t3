import type {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
  } from "next";
  import { prisma } from "../../../server/db";
  import { createProxySSGHelpers } from "@trpc/react-query/ssg";
  import { appRouter } from "../../../server/api/root";
  import { createInnerTRPCContext } from "../../../server/api/trpc";
  import superjson from "superjson";
  import { useRouter } from "next/router";
  import type { ChangeEvent} from "react";
  import React, { useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import { api } from "../../../utils/api";
  import Papa from "papaparse";
  import { purchaseOrdersInput, purchaseOrdersInputUnknown } from "../../../schema/imports.schema";
  
  export default function ImportPurchase(
    props: InferGetStaticPropsType<typeof getStaticProps>
  ) {
    const { id } = props;
    const router = useRouter();
    const [parsedHeaders, setParsedHeaders] = useState<string[]>();
    const [parsedCsvData, setParsedCsvData] = useState<purchaseOrdersInput[]>();
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const headersVerified = api.csvPorts.verifyPurchaseHeaders.useQuery({
      headers: parsedHeaders
    }, {enabled: !!parsedHeaders});
    const importVerified =
    api.csvPorts.verifyPurchaseCSV.useQuery(
      parsedCsvData,
      { enabled: headersVerified.data?.verified });
    const mutatedImport = 
    api.csvPorts.addPurchaseImport.useMutation();
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    };
  
    const handleUpload = (event: React.MouseEvent<HTMLElement>) =>{
      event.preventDefault()
      if(!file){
        toast.error("No file Selected. Please Select a File")
        return;
      }
      if(file.type !== "text/csv"){
        toast.error("Input file is not an a Comma Separated Values File. Please select a file with type .csv .");
        return;
      }

      //now actually process the upload
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          console.log(results);
          setParsedHeaders(results.meta.fields);
          const parsedData: purchaseOrdersInput[] = [];
          results.data.forEach(function (value){
            parsedData.push(value as purchaseOrdersInput);
          })
          setParsedCsvData(parsedData);
        }
      });

      /* Get rid of this when completed
      setTimeout(() => {
        void router.push(`/purchases/${encodeURIComponent(id)}/detail`);
      }, 500);

      */
    }
    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
      setIsSubmitting(true);
      try{
        const parsedData = importVerified.data?.parsedData;
        if(parsedData === undefined){
          toast.error("You must upload a file first")
          setIsSubmitting(false);
          return;
        }
        mutatedImport.mutate({
          data: parsedData,
          purchaseOrderId: id,
        })
        setTimeout(() => {
          void router.push(`/purchases/${encodeURIComponent(id)}/detail`);
        }, 500);
      }
      catch (error){
        console.log(error);
        setIsSubmitting(false);
      }
    }
  
    return (
      <>
      <div>
      </div>
      <div className="flex w-full items-center ">
        <form className="mb-4 w-3/4 items-center rounded bg-white px-8 pt-6 pb-8 shadow-md">
          <div className="mb-4 items-center space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Import Purchase Order CSV
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div>
                  <input type="file" onChange={handleFileChange} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
                  <div>{file && `${file.name}`}</div>
                  <button onClick = {handleUpload} className="padding-top:10px bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
                    <ToastContainer></ToastContainer>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
                <button
                  className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="button"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              <div></div>
          </div>
        </form>
      </div>
      </>
    );
  }


  
  export const getStaticPaths: GetStaticPaths = async () => {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      select: {
        id: true,
      },
    });
  
    const paths = purchaseOrders.map((purchaseOrder) => ({
      params: { id: purchaseOrder.id },
    }));
  
    console.log(paths);
  
    return { paths, fallback: true };
  };

  export function getStaticProps(
    context: GetStaticPropsContext<{ id: string }>
  ) {

    const id = context.params?.id as string;

  
    return {
      props: {
        id,
      },
      revalidate: 1,
    };
  }
  