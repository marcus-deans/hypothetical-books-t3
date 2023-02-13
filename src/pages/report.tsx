import type { MouseEventHandler } from "react";
import React, { useState } from "react";
import jsPDF from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import Head from "next/head";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import GenerateReport from "../components/GenerateReport";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Report(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
          <h2>Start Date:</h2>
          <div className="text-black">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date ?? new Date())}
            />
          </div>
        </div>
        <div>
          <h2>End Date:</h2>
          <div className="text-black">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date ?? new Date())}
            />
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

  autoTable(doc, {
    body: [
      [
        {
          content: "Terms & notes",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content:
            "orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia" +
            "molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum" +
            "numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium",
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
          content: "This is a centered footer",
          styles: {
            halign: "center",
          },
        },
      ],
    ],
    theme: "plain",
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
