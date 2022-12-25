import React from 'react'
import "./style.css"
// Firebase imports
import { useNavigate } from "react-router-dom";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    swal,
    auth,
    addUserToDB,
    FacebookAuthProvider
} from "../../config/Firebase";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../../state/index"




function SiginButtons() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { authData } = bindActionCreators(actionCreators, dispatch)
    function sendData(data) {
        authData(data)
    }

    const signInGoogle = async () => {
        try {
            var provider = new GoogleAuthProvider();
            const result = await auth;
            await signInWithPopup(auth, provider);
            await addUserToDB();


            await swal("Congratulations!", "Loggined successfully!", "success");
            sendData(auth)
            localStorage.setItem("auth" , JSON.stringify(auth))

            navigate('/home')
        } catch (e) {
            console.log(e.message);
        }

    };




    const siginFaceboook = () => {
        const provider = new FacebookAuthProvider();
        provider.setCustomParameters({
            'display': 'popup'
        });

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                navigate('/home')

            })
            .catch((error) => {
                console.log("error in fb login")

            });


    }


    localStorage.removeItem("doctorForToken")

    return (
        <div>
            <div className="siginBtns">

                <div className='BtnDiv' onClick={signInGoogle}>
                    <button className="continueSignup"  >
                        <i
                            className="fab fa-google googleBtnLogin"
                            style={{ fontSize: "22px" }}
                        ></i>{" "}
                        &nbsp; Continue with Google
                    </button>
                </div>



                <div className='BtnDiv'>
                    <button className="continueSignup" onClick={siginFaceboook}>

                        <i className="fa-brands fa-facebook googleBtnLogin" style={{ fontSize: "22px" }}></i>
                        &nbsp; Continue with Facebook
                    </button>
                </div>

                <div className="getStartedDesc">
                    <h1>Lets Get Started</h1>
                    <hr className="belowHeading" />
                    <p className="desc">Take Care of Yourself with Medisafe, <br />Consult expert doctors online <br />You can also continue as a doctor </p>

                </div>







            </div>
        </div>
    )
}

export default SiginButtons
