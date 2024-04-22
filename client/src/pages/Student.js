import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useParams } from "react-router-dom";
import '../styles/student.css';

export const Student = () => {

  console.log("get to students")

  // جلب الايدي من الرابط 
  const { id } = useParams()
  const [data, setData] = useState([]);

  //ارسال طلب للسيرفر لجلب بيانات المستخدم حسب اليدي 
  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <table>
          <tr>
            <th>Name</th>
            <td><label id="nameLabel">{item.name}</label></td>
          </tr>
          <tr>
            <th>Age</th>
            <td><label id="ageLabel">{item.age}</label></td>
          </tr>
          <tr>
            <th>Birthday</th>
            <td><label id="birthdayLabel">{item.birthday}</label></td>
          </tr>
          <tr>
            <th>Phone</th>
            <td><label id="phoneLabel">{item.phone}</label></td>
          </tr>
          <tr>
            <th>Gender</th>
            <td><label id="genderLabel">{item.gender}</label></td>
          </tr>
          <tr>
            <th>Address</th>
            <td><label id="addressLabel">{item.address}</label></td>
          </tr>
          <tr>
            <th>University</th>
            <td><label id="universityLabel">{item.university}</label></td>
          </tr>
          <tr>
            <th>Email</th>
            <td><label id="emailLabel">{item.email}</label></td>
          </tr>
          <tr>
            <th>Average</th>
            <td><label id="averageLabel">{item.average}</label></td>
          </tr>
          <tr>
            <th>Eligible</th>
            <td><label id="eligibleLabel">{item.eligible}</label></td>
          </tr>
        </table>
      ))}
    </div>
  )
}