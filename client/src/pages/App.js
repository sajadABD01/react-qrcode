import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Student } from "./Student";
import {Home} from './Home'
import { Qrcode } from "./Qrcode";
function App(){
  return(
    // توجيه الطلب الاتي من الرابط الى الواجهه 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/qrcode" element={<Qrcode/>}></Route>
        <Route path='students'>
          <Route path=':id' element={<Student/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App