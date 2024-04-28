import React from 'react';
import '../styles/AdminStatistics.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function AdminStatistics() {

  const profits = 
  [ 
    { day: 'Mon', data: 37 },
    { day: 'Tue', data: 61 },
    { day: 'Wed', data: 16 },
    { day: 'Thu', data: 54 },
    { day: 'Fri', data: 21 },
    { day: 'Sat', data: 61 },
    { day: 'Sun', data: 37 }
  ];


  const data = {
    labels: profits.map(item => item.day),
    datasets: [
      {
        label: 'Amount of Profit',
        data: profits.map(item => item.data),
        fill: false,
        backgroundColor: 'green',
        borderColor: '#6d9b6d81',
        pointBorderColor: 'green',
      }
    ]
  };

  const customize = {
    scales: {
      y:{
        beginAtZero: true,
        ticks: {
          color: 'black)', 
          font: {
            size: 18
          }
        }
      },
      x: {
        beginAtZero: true,
        ticks:{
          color:'black)', 
          font: {
            size: 18
          }
        }
      }
    },
    plugins: {
      title:{
        display: true,
        text:'Weekly Profit Chart',
        font: {
          size: 24
        },
        padding: {
          top: 10,
        },
        color: 'black'
      },
      legend: {
        labels:{
          font: {
            size: 18 
          }
        }
    }
  }
  };

  return(
    <div className='Statistics-Container'>
      <Line data={data} options={customize} />
    </div>
    );
};


export default AdminStatistics;
