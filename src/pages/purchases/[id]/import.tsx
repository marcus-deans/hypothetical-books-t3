import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { prisma } from "../../../server/db";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../../utils/api";
import Papa from "papaparse";
import type {
  CSVInput,
  CSVInputId
} from "../../../schema/imports.schema";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button } from "@mui/material";
import type { GridColDef, GridRowModel } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";


export default function ImportPurchase(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const router = useRouter();
  const [parsedHeaders, setParsedHeaders] = useState<string[]>([]);
  const [parsedCsvData, setParsedCsvData] = useState<CSVInput[]>([]);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const headersVerified = api.csvPorts.verifyImportHeaders.useQuery(
    {
      headers: parsedHeaders,
    },
    { enabled: parsedHeaders.length !== 0 }
  );
  const importVerified = api.csvPorts.verifyCSV.useQuery(
    parsedCsvData,
    { enabled: headersVerified.isSuccess && headersVerified.data?.verified }
  );
  const mutatedImport = api.csvPorts.addPurchaseImport.useMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null){
      toast.error(
        "File Corrupted"
      );
      return;
    }
    if (e.target.files[0] === undefined){
      toast.error(
        "File Corrupted"
      );
      return;
    }
    const file = e.target.files[0];
    if (file.type !== "text/csv") {
      toast.error(
        "Input file is not an a Comma Separated Values File. Please select a file with type .csv ."
      );
      return;
    }
    setFile(file);
    Papa.parse(file, {
      header: true,
      dynamicTyping: false,
      complete: function (results) {
        setParsedHeaders(!!results.meta.fields ? results.meta.fields : []);
      },
    });
  };

  const handleUpload = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!file) {
      toast.error("No file Selected. Please Select a File");
      return;
    }
    if (file.type !== "text/csv") {
      toast.error(
        "Input file is not an a Comma Separated Values File. Please select a file with type .csv ."
      );
      return;
    }
    if(headersVerified.data === undefined){
      toast.error("Header Verification Error due to file corruption.");
      setIsSubmitting(false);
      return;
    }
    if(headersVerified.data.verified == false){
      toast.error("Header Error: " + headersVerified.data.message);
      setIsSubmitting(false);
      return;
    }

    //now actually process the upload
    Papa.parse(file, {
      header: true,
      dynamicTyping: false,
      complete: function (results) {
        console.log(results);
        const parsedData: CSVInput[] = [];
        results.data.forEach(function (value) {
          parsedData.push(value as CSVInput);
        });
        setParsedCsvData(parsedData);
      },
    });

    console.log("Parsed Data: ");
    console.log(parsedCsvData);
  };
  const rows = importVerified.isSuccess && !!importVerified.data ? importVerified.data.parsedData : [];
  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    console.log("New row: ", newRow);
    if (!importVerified.data) {
      return newRow;
    }
    const newParsedData: CSVInput[] = importVerified.data.parsedData.map((displayedRow, index) => {
      const newRowTypedwithExtras = newRow as CSVInputId;
      if (index === newRow.id) {
        // Increment the clicked counter
        const newRowTyped: CSVInput = {
          isbn: newRowTypedwithExtras.isbn,
          quantity: newRowTypedwithExtras.quantity.toString(),
          unit_price: newRowTypedwithExtras.unit_price.toString(),
        }
        return newRowTyped;
      } else {
        // The rest haven't changed
        const displayedRowTyped: CSVInput = {
          isbn: displayedRow.isbn,
          quantity: displayedRow.quantity.toString(),
          unit_price: displayedRow.unit_price.toString(),
        }
        return displayedRowTyped;
      }
    });
    console.log("New import list: ", newParsedData);
    setParsedCsvData(newParsedData);
    return newRow;
  };

  const handleProcessRowUpdateError = (error: Error) => {
    toast.error(error.message);
  };
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-theme",
      width: 125,
      editable: true,
    },
    {
      field: "isbn",
      headerName: "ISBN",
      headerClassName: "header-theme",
      width: 125,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerClassName: "header-theme",
      width: 125,
      editable: true,
    },
    {
      field: "unit_price",
      headerName: "Unit Wholesale Price",
      headerClassName: "header-theme",
      width: 125,
      editable: true,
    },
    {
      field: "verified",
      headerName: "Verified?",
      headerClassName: "header-theme",
      width: 125,
    },
    {
      field: "reason",
      headerName: "Reason for Verification Failure",
      headerClassName: "header-theme",
      width: 800,
    }
  ];
  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    setIsSubmitting(true)
    try {
      if(importVerified.data === undefined){
        toast.error("The data was never parsed through in the database. This Error should not be possible due to the submit button only being enabled if the data was parsed");
        setIsSubmitting(false);
        return;
      }
      if(!importVerified.data.verified){
        toast.error("Data Not Verified. This Error should not be possible due to the submit button only being enabled if the data was verified");
        setIsSubmitting(false);
        return;
      }
      const parsedDataTyped: CSVInputId[] = importVerified.data.parsedData;
      mutatedImport.mutate({
        data: parsedDataTyped,
        purchaseOrderId: id,
      });
      toast.success("Successfully Imported File");
      setTimeout(() => {
        void router.push(`/purchases/${encodeURIComponent(id)}/detail`);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  if (rows.length > 0) {
    return (
      <>
        <Head>
          <title>Import CSV</title>
        </Head>
        <div className="pt-6"></div>
        <div className="rounded-lg bg-white px-6 pt-6">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Import CSV
          </div>
          <Box
            sx={{
              height: "auto",
              width: "100%",
              "& .header-theme": {
                backgroundColor: "rgba(56, 116, 203, 0.35)",
              },
            }}
          >
            <StripedDataGrid
              rows={rows}
              columns={columns}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                Toolbar: GridToolbar,
              }}
              pageSize={6}
              rowsPerPageOptions={[6]}
              autoHeight={true}
              getRowHeight={() => "auto"}
              checkboxSelection
              disableSelectionOnClick
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              experimentalFeatures={{ newEditingApi: true }}
              getRowClassName={(params) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
            />
          </Box>
          <div className="space flex py-3">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!importVerified.data?.verified}>
              {importVerified.data?.verified ? (isSubmitting ? "Submitting..." : "Submit") : "Data Must Be Verified Before Submit"}
            </Button>
          </div>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <Head>
          <title>Import Purchase Order</title>
        </Head>
        <div className="pt-6">
          <form className="inline-block rounded bg-white px-6 py-6">
            <div className="space-y-5">
              <div className="mb-2 block text-lg font-bold text-gray-700">
                Import Purchase Order CSV
              </div>
              <div className="relative space-y-3">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                <div className="col-span-4">
                  <div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="rounded bg-blue-500 py-2 px-4 font-bold text-white"
                    />
                    <div className="pt-3" />
                    <button
                      onClick={handleUpload}
                      className="padding-top:10px rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    >
                      Upload
                    </button>
                    <ToastContainer></ToastContainer>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </form>
        </div>
      </>
    );
  }
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

export function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  const id = context.params?.id as string;

  return {
    props: {
      id,
    },
    revalidate: 1,
  };
}
