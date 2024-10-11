import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from "axios";


export const Dashboard = () => {
    const weeklyRequests = [20, 30, 40, 50, 60, 70, 80]; // replace with actual data
const monthlyRequests = [100, 120, 140, 160, 180, 200]; // replace with actual data

const data1= {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
  datasets: [{
    label: 'Weekly Requests',
    data: weeklyRequests,
    backgroundColor: 'grey',
    borderColor: 'none',
    borderWidth: 0,
  }, {
    label: 'Monthly Requests',
    data: monthlyRequests,
    backgroundColor: 'black',
    borderColor: 'none',
    borderWidth: 0,
  }],
};

const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Weekly and Monthly Requests'
    }
  }
};

  const [customers,setCustomers] = useState('')
  const [technicians,setTechnicians] = useState('')

  Chart.register(...registerables);

const data = {
  labels: ['Customers', 'Technicians'],
  datasets: [{
    label: 'Count',
    data: [customers, technicians],
    backgroundColor: [
      'black',
      'grey'
    ],
    borderColor: [
      'none'
    ],
    borderWidth: 0.2,
  }],
};

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        
      }
    }
  };
  //displaying users count
  useEffect(()=>{
    const Userscount = async() => {
      try{
        const response = await axios.get('http://localhost:8088/userRoutes/usercount')
        setCustomers(response.data.consumer)
        setTechnicians(response.data.tech)
      }
      catch(error){
        console.log('Error fectching user count',error)
      }
    }
    Userscount()
  })
  return (
    <>
      <div className="dashboard-boxes">
        <h2>Locos</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <div><p>Total Jobs</p>
            <h3>Request</h3></div><span>0</span>
          </div>
          <div className="stat-box">
            <div><p>Total Jobs</p>
            <h3>Pending</h3></div><span>0</span>
          </div>
          <div className="stat-box">
            <div><p>Total Jobs </p>
            <h3>Finished</h3></div><span>0</span>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <h4>Total Users</h4>
      <Pie data={data} options={options} />
      </div>
      <div className="bar-container">
        <h4>Total response</h4>
        <Bar data={data1} options={options1} />
      </div>
    </>
  );
};
