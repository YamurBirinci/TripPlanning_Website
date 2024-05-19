import React from 'react';
import '../styles/AdminStatistics.css';

function AdminStatistics() {
  const profits = 
  [ { month: 'Mon', value: 37 },
    { month: 'Tue', value: 61 },
    { month: 'Wed', value: 16 },
    { month: 'Thu', value: 54 },
    { month: 'Fri', value: 21 },
    { month: 'Sat', value: 61 },
    { month: 'Sun', value: 37 }
  ];

  const width = 1000;  
  const height = 300; 
  const barWidth = 137; 
  const barHeight = 4; 

  return (
    <div className='Statistics-Container'>
      <h1 style={{textAlign:'center', color: '#1c6632'}}>Chart of Weekly Profits</h1>
      <svg width={width} height={height}>
        {profits.map((item, index) => (
          <g key={index}>
            <rect
              x={index * (width/profits.length) + 37}  
              y={height - item.value*barHeight - 20}    
              width={barWidth}            
              height={item.value*barHeight}       
              fill="#799978"
            />
            <text
              x={index * (width/ profits.length) +37 + barWidth / 2} 
              y={height-1}
              textAnchor="middle"
              fill="#147214"
              fontSize={'22px'}
            >
              {item.month}
            </text>
            <text
              x={index * (width /profits.length) + 37 + barWidth/2} 
              y={(height -item.value*barHeight - 27)}
              textAnchor="middle"
              fill="#333"
              fontSize={'22px'}
            >
              {item.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default AdminStatistics;
