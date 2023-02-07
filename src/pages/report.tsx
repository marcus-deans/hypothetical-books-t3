import React from 'react'
import Head from 'next/head'
import { Template, BLANK_PDF, generate} from '@pdfme/generator';

function report() {
  return (
    <>
    <Head>
    <title>Report</title>
    </Head>
    <div class="flex items-center justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generate_report}>
        Generate Report
      </button>
    </div>
    </>
  )
}

function generate_report() {
  generate({ template, inputs }).then((pdf) => {
    console.log(pdf);
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob), "_blank");
  });
}

const inputs = [
  {
    "title": "Hypothetical Books Sales Report",
    "date": "Report Generated: " + new Date().toLocaleDateString(),
    "reportperiod": "Report Period: From 2/6/23 to 2/7/23",
    "day1": "Date: 2/6/23 ----------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day2": "Date: 2/7/23 ----------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:\n",
    "topbooks": "Top 10 Selling Books ----------------------------------------------------------------------------\n1. Title1\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:\n\n2. Title2\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:\n\n3. Title3\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:\n\n4. Title4\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:"
  }
];

const template: Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      "title": {
        "type": "text",
        "position": {
          "x": 22.93,
          "y": 10
        },
        "width": 170,
        "height": 13,
        "fontSize": 30,
        "fontColor": "#5088e2",
        "alignment": "center"
      },
      "date": {
        "type": "text",
        "position": {
          "x": 22.93,
          "y": 23.7
        },
        "width": 170,
        "height": 8,
        "fontSize": 20,
        "fontColor": "#000000",
        "alignment": "center"
      },
      "reportperiod": {
        "type": "text",
        "position": {
          "x": 22.93,
          "y": 33.28
        },
        "width": 170,
        "height": 6,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1,
        "backgroundColor": ""
      },
      "day1": {
        "type": "text",
        "position": {
          "x": 22.93,
          "y": 41.01
        },
        "width": 170,
        "height": 22,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1.2,
        "backgroundColor": ""
      },
      "day2": {
        "type": "text",
        "position": {
          "x": 22.93,
          "y": 66.62
        },
        "width": 170,
        "height": 22,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1.2,
        "backgroundColor": ""
      },
      "topbooks": {
        "type": "text",
        "position": {
          "x": 22.93,
          "y": 93.61
        },
        "width": 170,
        "height": 170,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1.5,
        "backgroundColor": ""
      }
    },
  ],
};


export default report