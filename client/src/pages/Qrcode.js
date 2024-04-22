import { useLocation } from "react-router-dom"
import '../styles/Qrcode.css'

export const Qrcode = () => {

    const { state } = useLocation()
    const { photoFileName } = state
    const imageUrl = "https://react-qrcode.onrender.com/images/" + photoFileName
    console.log(imageUrl)
    return (
        <body>
            <div class="container-qr">
                <p> this is your qrcode</p>
                <div class="wrapper-qr">
                    <img src={imageUrl} alt="Your QrCode"></img>
                </div>

            </div>
        </body>
    )
}