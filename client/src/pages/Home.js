import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'
import { add } from "date-fns";
export const Home = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [birthday, setBirthday] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [university, setUniversity] = useState("")
    const [average, setAverage] = useState("")
    const [isPending, setPending] = useState("")

    const [data, setData] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        setPending(true)
        const studentData = { name, age, address, birthday, gender, phone, university, email, average }
        fetch('http://localhost:5000/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        }).then((res) => {
            if (res.status == 409) {
                return res.text().then((text) => {
                    setData(text)
                })
            }
            if (res.status == 200) {
                return res.text().then((text) => {
                    console.log(text)
                    navigate('/qrcode', { state: { photoFileName: text } })
                })

            }

        })

    }
    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    return (
        <div className="container">
            <table>
                <tbody>
                    <tr>
                        <td><input type="text" placeholder="Name" value={name} onChange={(e) => handleChange(e, setName)} /></td>
                        <td><input type="text" placeholder="Age" value={age} onChange={(e) => handleChange(e, setAge)} /></td>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="Gender" value={gender} onChange={(e) => handleChange(e, setGender)} /></td>
                        <td><input type="date" placeholder="Birthday" value={birthday} onChange={(e) => handleChange(e, setBirthday)} /></td>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="Phone" value={phone} onChange={(e) => handleChange(e, setPhone)} /></td>
                        <td><input type="text" placeholder="University" value={university} onChange={(e) => handleChange(e, setUniversity)} /></td>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="Average" value={average} onChange={(e) => handleChange(e, setAverage)} /></td>
                        <td><input type="text" placeholder="Address" value={address} onChange={(e) => handleChange(e, setAddress)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><input type="text" placeholder="Email" value={email} onChange={(e) => handleChange(e, setEmail)} /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleSubmit}>Send Data</button>
            <label class ='custom-label'>{data}</label>
        </div>
    );
}