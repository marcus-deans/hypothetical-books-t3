/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { MouseEventHandler } from "react";
import React, { useState } from "react";
import jsPDF from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import Head from "next/head";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { api } from "../utils/api";
import { createInnerTRPCContext } from "../server/api/trpc";
import { appRouter } from "../server/api/root";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import superjson from "superjson";
import type { purchaseOrders } from "../schema/purchases.schema";
import type { salesReconciliation } from "../schema/sales.schema";
import type { book } from "../schema/books.schema";
import GenerateReport from "../components/GenerateReport";
import { exit } from "process";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Report(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [startDateString, setStartDate] = useState(new Date());
  const [endDateString, setEndDate] = useState(new Date());
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const purchaseOrderQuery = api.purchaseOrders.getByDateWithOverallMetrics.useQuery({
      startDate: startDate,
      endDate: endDate,
      cursor: null,
      limit: 50,
    }, 
    {enabled: !!startDate && !!endDate}
  );
  const salesQuery = api.salesReconciliations.getByDateWithOverallMetrics.useQuery({
      startDate: startDate,
      endDate: endDate,
      cursor: null,
      limit: 50,
    },
     {enabled: !!startDate && !!endDate}
  );

  const purchaseOrders: purchaseOrders = purchaseOrderQuery?.data?.items ?? [];
  const salesReconciliations: salesReconciliation = salesQuery?.data?.items ?? [];

  //console.log(purchaseOrders);

  console.log("Purchases\n",purchaseOrders);
  console.log("Sales\n", salesReconciliations);

  const handleGenerate: MouseEventHandler<HTMLButtonElement> = () => {
    if (startDate.valueOf() > endDate.valueOf() + 1000 * 60) {
      alert(
        "End Date must be later than Start Date, or the same as Start Date"
      );
    } else {
      generateReport(startDate, endDate, purchaseOrders, salesReconciliations);
    }
  };

  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <div className="absolute flex-col justify-center rounded border border-blue-700 bg-blue-700 py-2 px-4 font-bold text-white">
        <div>
          <div className="text-black bg-white py-2 px-2 rounded">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/DD/YYYY"
                    value={startDate}
                    onChange={(date) => setStartDate(date ?? new Date())}
                    renderInput={(params: JSX.IntrinsicAttributes) => (
                      <TextField {...params} />
                    )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div>
          <div className="text-black bg-white py-2 px-2 rounded">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(date) => setEndDate(date ?? new Date())}
                    renderInput={(params: JSX.IntrinsicAttributes) => (
                      <TextField {...params} />
                    )}
                />
            </LocalizationProvider>
          </div>
        </div>
        <button
          className="rounded border-b-4 border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          onClick={handleGenerate}
        >
          Generate Report
        </button>
      </div>
    </>
  );
}

function generateReport(
  startDate: Date,
  endDate: Date,
  purchaseOrders: purchaseOrders,
  salesReconciliations: salesReconciliation
) {
  const daysArray = getDaysArray(startDate, endDate);

  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: "Hypothetical Books",
          styles: {
            halign: "left",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
        {
          content: "Sales Report",
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#3366ff",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Date:" + new Date().toLocaleDateString(),
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Start Date: \n" + startDate.toLocaleDateString(),
          styles: {
            halign: "left",
          },
        },
        {
          content: "End Date: \n" + endDate.toLocaleDateString(),
          styles: {
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Days for Report",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
    ],
    theme: "plain",
  });

  let runningRevenue = 0;
  let runningCosts = 0;
  //Now we do the purchase oredrs

  const periodOrders: purchaseOrders = [];

  const periodSales: salesReconciliation = [];

  //forEach calculates total cost
  purchaseOrders.forEach(function (value) {
    //determine if date is in period
    if (!daysArray.includes(value.purchaseOrder.date.toLocaleDateString())) {
      //not in day range
      return;
    }
    periodOrders.push(value);
    //get total cost
    runningCosts += value.totalPrice;
  });

  //forEach calculates total revenue
  salesReconciliations.forEach(function (value) {
    //determine if date is in period
    if (
      !daysArray.includes(value.salesReconciliation.date.toLocaleDateString())
    ) {
      //not in day range
      return;
    }
    periodSales.push(value);
    //get total cost
    runningRevenue += value.totalPrice;
  });

  const perDayList: RowInput[] = [];

  //per day forloop
  daysArray.forEach(function (value) {
    //get all of "x" for this day
    //aggregate cost
    //aggregate revenue
    //calculate profit
    //create input for perDayList
    const insideInput: RowInput = [];
    insideInput.push(value.toString());
    const revenue = getRevenue(value, periodSales);
    insideInput.push(revenue.toFixed(2));
    const cost = getCost(value, periodOrders);
    insideInput.push(cost.toFixed(2));
    insideInput.push((revenue - cost).toFixed(2));
    if((revenue != 0) || cost != 0){
      perDayList.push(insideInput);
    }
  });

  

  autoTable(doc, {
    head: [["Date", "Daily Revenue", "Daily Costs", "Daily Profit"]],
    body: perDayList,
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Total Revenue:",
          styles: {
            halign: "right",
          },
        },
        {
          content: (runningRevenue - 0).toFixed(2),
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total Costs:",
          styles: {
            halign: "right",
          },
        },
        {
          content: (runningCosts - 0).toFixed(2),
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total Profit:",
          styles: {
            halign: "right",
          },
        },
        {
          content: (runningRevenue - runningCosts).toFixed(2),
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  const bookIdToQuantity = new Map<book, number>();
  const bookIdToRevenue = new Map<book, number>();

  salesReconciliations.forEach(function (value) {
    value.salesReconciliation.salesLines.forEach(function (saleLine){
      const bookToAdd: book = saleLine.book;
      bookIdToQuantity.set(bookToAdd, saleLine.quantity);
      bookIdToRevenue.set(bookToAdd, saleLine.unitWholesalePrice * saleLine.quantity);
    })
  });
  const topTenBooksArray: [book: book, quantity: number][] = [...bookIdToQuantity.entries()].sort((a,b) => b[1] - a[1]);
  topTenBooksArray.length = Math.min(topTenBooksArray.length, 10);
  const topTenBooksMap = new Map<book, number>(topTenBooksArray);
  const topTenRevenue = new Map<book, number>();
  const a = topTenBooksMap.keys();
  topTenBooksArray.forEach(function (entry: [{title: string, isbn_13: string, }, number]){
    topTenRevenue.set(entry[0], bookIdToRevenue.get(entry[0])!);
  });


  const reverseOrders = purchaseOrders.slice().reverse();
  const topTenBooksToCMR = new Map<book, number>();

  //If you're debugging this, good luck
  reverseOrders.forEach(function (value){
    value.purchaseOrder.purchaseLines.forEach(function (purchaseLine){
      topTenBooksArray.forEach(function (entry){
        if(purchaseLine.book === entry[0]){
          if(!(topTenBooksToCMR.has(purchaseLine.book))){
            topTenBooksToCMR.set(purchaseLine.book, purchaseLine.unitWholesalePrice);
          }
        }
      })
    })
  })

  const topTenBooksInput: RowInput[] = [];

  topTenBooksArray.forEach(function (entry) {
    const insideInput: RowInput = [];
    insideInput.push(entry[0].title); //Book
    const quantity = bookIdToQuantity.get(entry[0])!
    insideInput.push(quantity); //Quantity
    const revenue = bookIdToRevenue.get(entry[0])!
    insideInput.push(revenue.toFixed(2)); // Revenue
    const totalCMR = topTenBooksToCMR.get(entry[0])! * quantity;
    insideInput.push(totalCMR.toFixed(2)); // CMR
    insideInput.push((revenue - totalCMR).toFixed(2)); // Profit
    topTenBooksInput.push(insideInput);
  });


  autoTable(doc, {
    head: [["Book", "Quantity sold", "Total Revenue", "Total Cost Most-Recent", "Total Profit"]],
    body: topTenBooksInput,
    theme: "striped",
    headStyles: {
      fillColor: "#343A40",
    },
  });


  return doc.output("dataurlnewwindow");
}

function getDaysArray(start: Date, end: Date): Array<string> {
  let arr: Array<string>;
  let dt: Date;
  if (start.toLocaleDateString() == end.toLocaleDateString()) {
    const arr = new Array<string>(start.toLocaleDateString());
    return arr;
  }
  for (
    arr = new Array<string>(), dt = new Date(start);
    dt <= new Date(end.valueOf());
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt).toLocaleDateString());
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return arr;
}

function getRevenue(day: string, periodSales: salesReconciliation): number {
  let dailyRevenue = 0;
  periodSales.forEach(function (saleReconciliation) {
    if (
      day === saleReconciliation.salesReconciliation.date.toLocaleDateString()
    ) {
      dailyRevenue += saleReconciliation.totalPrice;
    }
  });
  return dailyRevenue;
}

function getCost(day: string, periodOrders: purchaseOrders): number {
  let dailyCost = 0;
  periodOrders.forEach(function (purchaseOrder) {
    if (day === purchaseOrder.purchaseOrder.date.toLocaleDateString()) {
      dailyCost += purchaseOrder.totalPrice;
    }
  });
  return dailyCost;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    //eslint-disable-next-line
    transformer: superjson,
  });
  // const id = context.params?.id as string;
  /*
   * Prefetching the `post.byId` query here.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await ssg.purchaseOrders.getByDateWithOverallMetrics.prefetch({
    cursor: null,
    limit: 50,
  });

  await ssg.salesReconciliations.getByDateWithOverallMetrics.prefetch({
    cursor: null,
    limit: 50,
  });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
