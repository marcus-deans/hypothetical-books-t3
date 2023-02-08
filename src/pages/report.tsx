import React, { MouseEventHandler, useState } from 'react'
import Head from 'next/head'
import { TextSchema, Template, BLANK_PDF, generate} from '@pdfme/generator';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function report() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  console.log(endDate.getDate());
  
  const handleGenerate: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if(startDate > endDate){
      alert("End Date must be later than Start Date, or the same as Start Date");
    } else{
      generate_report(startDate, endDate)
    }
  };

  return (
    <><Head>
      <title>Report</title>
    </Head><div>
      <h2>Start Date:</h2>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date!)} />
          <h2>End Date:</h2>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date!)} />
        <button onClick={handleGenerate}>
          Generate Report
        </button>
      </div></>
  )
}

function generate_report(startDate: Date, endDate: Date) {

  

  const inputs = [
    {
      "title": "Hypothetical Books Sales Report",
      "date": "Report Generated: " + new Date().toLocaleDateString(),
      "reportperiod": "Report Period: From "+ startDate.toDateString() + " to " + endDate.toDateString() + ".",
      "day1": "Date: 2/6/23 ----------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
      "day2": "Date: 2/7/23 ----------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:\n",
      "topbooks": "Top 10 Selling Books ----------------------------------------------------------------------------\n1. Title1\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:\n\n2. Title2\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:\n\n3. Title3\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:\n\n4. Title4\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:"
    }
  ];

  
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
    "day1": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day2": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day3": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day4": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day5": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day6": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day7": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day8": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
    "day9": "Date: 2/6/23 -------------------------------------------------------------------------------------------------------\nTotal Revenue: \nTotal Costs: \nTotal Profit:",
  },
  {
    "topbooksheader": "Top 10 Best Selling Books -- From 2/7/23 to 2/9/23",
    "book1": "1. Title1\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
    "book2": "2. Title2\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:", 
    "book3": "3. Title3\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
    "book4": "4. Title4\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
    "book5": "5. Title5\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
    "book6": "6. Title6\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
    "book7": "7. Title7\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
    "book8": "8. Title8\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
    "book9": "9. Title9\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
    "book10": "10. Title10\nQuantity Sold: \nTotal Revenue:\nTotal Cost Most-Recent:",
  }
];

// ------------------ Formulas for Calculating Day Review and Top Books Spacing and Dimensions ------------------
// Day Width: 170, Height: 20
// Day X Constant: 22.93
// Day Y Height Formula: ((Day# - 1) * 22) + 47
// Limit: 9 days per page
// Start: 47
// End: 47 + ((9 - 1) * 22) = 245

// Book Width: 170, Height: 20
// Book X Constant: 22.93
// Book Y Height Formula: ((Book# - 1) * 23) + 35
// Limit: 10 books per page
// Start: 35
// End: 35 + ((10 - 1) * 23) = 242

const days = 5;

let a = new Array<TextSchema>(days);

a.forEach(function (day, index){
  day.height = 20;
  day.width = 170;
  day.type = "text";
  day.alignment = "left";
  day.fontSize = 11,
  day.characterSpacing = 0;
  day.lineHeight = 1.2,
  day.backgroundColor = ""
  day.position = {
    x: (22.93),
    y: (47 + 22 * index)
  }
})


const dynamicSchemaDays: Array<TextSchema> = Array.from({length: days}, (_, i) => ({
  [`day${i + 1}`]: {
    type: "text",
    position: {
      x: (22.93),
      y: (47 + 22 * i)
    },
    width: 170,
    height: 20,
    alignment: "left",
    fontSize: 11,
    characterSpacing: 0,
    lineHeight: 1.2,
    backgroundColor: ""
  }
}));

const books = 10;
const dynamicSchemaBooks = Array.from({length: books}, (_, i) => ({
  [`book${i + 1}`]: {
    type: "text",
    position: {
      x: 22.93,
      y: 35 + 23 * i},
    width: 170,
    height: 20,
    alignment: "left",
    fontSize: 11,
    characterSpacing: 0,
    lineHeight: 1.2,
    backgroundColor: ""
  }
}));

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
          "y": 24
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
          "y": 36
        },
        "width": 170,
        "height": 6,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1,
        "backgroundColor": ""
      },
      
      
      
      "topbooksheader": {
        "type": "text",
        "position": {
          "x": 22.93,
          "y": 24
        },
        "width": 170,
        "height": 7,
        "alignment": "left",
        "fontSize": 14,
        "characterSpacing": 0,
        "lineHeight": 1.2
      },
    },
  ],
};

for (let obj in dynamicSchemaDays) {
  template.schemas.push(dynamicSchemaDays[obj]);
}

for (let obj in dynamicSchemaBooks) {
  template.schemas.push(dynamicSchemaBooks[obj]);
}
template.schemas

console.log(template.schemas);

