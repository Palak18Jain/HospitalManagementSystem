import { createContext, useEffect ,useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";  
import { assets } from "../assets/assets";

const getDoctorImage = (docId) => {
    if (!docId) return assets.doc1;
    const idStr = String(docId);
    const numMatch = idStr.match(/\d+/);
    const num = numMatch ? parseInt(numMatch[0]) : 1;
    const index = ((num - 1) % 15) + 1;
    return assets[`doc${index}`] || assets.doc1;
};



export const AppContext = createContext()


const AppContextProvider = (props)=>{



    const  currencySymbol='$'
    const backendUrl = "http://localhost:4000"
    const [doctorsData, setDoctorsData] = useState([]);
    const [token,setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token"):"" );


    const [userData, setUserData] = useState(false);

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
            if (data.success) {
                let user = data.userdata;
                if (typeof user.address === 'string') {
                    try {
                        user.address = JSON.parse(user.address);
                    } catch (e) {
                        user.address = { line1: '', line2: '', city: '' };
                    }
                }
                if (typeof user.address !== 'object' || user.address === null) {
                    user.address = { line1: '', line2: '', city: '' };
                }
                if (!user.image || user.image === "" || user.image === "null" || user.image === "undefined") {
                    user.image = assets.profile_pic;
                }
                setUserData(user);
            } else {
                toast.error(data.message);
                if (data.message === "User does not exist" || data.message.includes("Not Authorized")) {
                    setToken('');
                    localStorage.removeItem('token');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    

    const getDoctorsData = async () => {
       try {
         const {data} = await axios.get(`${backendUrl}/api/doctor/list`);
        if(data.success){
            const mapped = data.doctors.map(doc => {
                if (!doc.image || doc.image === "" || doc.image === "null" || doc.image === "undefined") {
                    doc.image = getDoctorImage(doc.id || doc._id);
                }
                return doc;
            });
            setDoctorsData(mapped);

        }else{
            toast.error(data.message);
        }
       } catch (error) {
        toast.error(error.message);
       }
    };
    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);


    const value={
        doctors: doctorsData,getDoctorsData,
        currencySymbol,
        backendUrl,token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


 
}
export default AppContextProvider   
