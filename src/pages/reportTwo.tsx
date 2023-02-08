import React, { MouseEventHandler, useState } from 'react'
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import Head from 'next/head'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { api } from '../utils/api';

export default function reportTwo() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleGenerate: MouseEventHandler<HTMLButtonElement> = async (e) => {
        if (startDate.valueOf() > endDate.valueOf() + 1000*60){
        alert("End Date must be later than Start Date, or the same as Start Date");
        } else{
        generateReport(startDate, endDate)
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



function generateReport(startDate: Date, endDate: Date){
    const daysArray = getDaysArray(startDate, endDate);

    const doc = new jsPDF();

    autoTable(doc, {
        body: [
        [
            {
            content: 'Hypothetical Books',
            styles: {
                halign: 'left',
                fontSize: 20,
                textColor: '#ffffff'
            }
            },
            {
            content: 'Sales Report',
            styles: {
                halign: 'right',
                fontSize: 20,
                textColor: '#ffffff'
            }
            }
        ],
        ],
        theme: 'plain',
        styles: {
        fillColor: '#3366ff'
        }
    });

    autoTable(doc, {
        body: [
        [
            {
            content: 
            'Date:' + new Date().toLocaleDateString(),
            styles: {
                halign: 'right'
            }
            }
        ],
        ],
        theme: 'plain'
    });

    autoTable(doc, {
        body: [
        [
            {
            content: 'Start Date: \n'
            + startDate.toLocaleDateString(),
            styles: {
                halign: 'left'
            }
            },
            {
            content: 'End Date: \n'
            + endDate.toLocaleDateString(),
            styles: {
                halign: 'left'
            }
            }
        ],
        ],
        theme: 'plain'
    });

    autoTable(doc, {
        body: [
        [
            {
            content: 'Days for Report',
            styles: {
                halign:'left',
                fontSize: 14
            }
            }
        ]
        ],
        theme: 'plain'
    });

    var runningRevenue: number = 0;
    var runningCosts: number = 0;

    var trueArray: RowInput[] = [];

    daysArray.forEach(function(value, index){
        var insideInput: RowInput = [];
        insideInput.push(value.toDateString());
        const revenue = getRevenue(value);
        runningRevenue += revenue
        insideInput.push(revenue);
        const cost = getCost(value);
        runningCosts += cost
        insideInput.push(cost);
        insideInput.push((revenue - cost).toFixed(2));
        trueArray.push(insideInput);
    })


    autoTable(doc, {
        head: [['Date', 'Daily Revenue', 'Daily Costs', 'Daily Profit']],
        body: trueArray,
        theme: 'striped',
        headStyles:{
        fillColor: '#343a40'
        }
    });

    autoTable(doc, {
        body: [
        [
            {
            content: 'Total Revenue:',
            styles:{
                halign:'right'
            }
            },
            {
            content: runningRevenue,
            styles:{
                halign:'right'
            }
            },
        ],
        [
            {
            content: 'Total Costs:',
            styles:{
                halign:'right'
            }
            },
            {
            content: runningCosts,
            styles:{
                halign:'right'
            }
            },
        ],
        [
            {
            content: 'Total Profit:',
            styles:{
                halign:'right'
            }
            },
            {
            content: (runningRevenue - runningCosts).toFixed(2),
            styles:{
                halign:'right'
            }
            },
        ],
        ],
        theme: 'plain'
    });

    autoTable(doc, {
        body: [
        [
            {
            content: 'Terms & notes',
            styles: {
                halign: 'left',
                fontSize: 14
            }
            }
        ],
        [
            {
            content: 'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia'
            +'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum'
            +'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
            styles: {
                halign: 'left'
            }
            }
        ],
        ],
        theme: "plain"
    });

    autoTable(doc, {
        body: [
        [
            {
            content: 'This is a centered footer',
            styles: {
                halign: 'center'
            }
            }
        ]
        ],
        theme: "plain"
    });

    return doc.output("dataurlnewwindow")

}

  function calculateAmountOfDays(startDate: Date, endDate: Date): number {
  
    const millis = endDate.valueOf() - startDate.valueOf();
    const days = millis / (1000 * 3600 * 24);
    console.log(days);
    return Math.round(days + 1);
  }
  
  function getDaysArray(start: Date, end: Date): Array<Date> {
    if(start.toLocaleDateString() == end.toLocaleDateString()){
      const arr = new Array<Date>(start);
      return arr;
    }
    for(var arr=[],dt=new Date(start); dt<=new Date(end.valueOf()+(1000 * 3600 * 24)); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
  };

  function getRevenue(day: Date): number{
    return Number((Math.random() * 1000).toFixed(2));
  }

  function getCost(day: Date): number {
    //const returns = api.purchaseOrders.byDate.useQuery({date: day});
    return Number((Math.random() * 500).toFixed(2));
  }