import logo from "./../../../src/qapplogo.png"
import doctorImg from "./../../../src/doctorImg.png"
import React, { useEffect, useState } from 'react'
import "./style.css"
import {
  auth, swal,
  addDoc, db, collection, ref, uploadBytes, getDownloadURL, storage, onSnapshot, where, query, getDoc,
  getDocs
} from "./../../config/Firebase"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const navigate = useNavigate()


  const authData = useSelector(state => state.auth)
  console.log(authData)
  const user = JSON.parse(localStorage.getItem('auth'))



  // getting Companies From Db
  async function getCompaniesFromDB() {
    const querySnapshot = await getDocs(collection(db, "companies"))
    const companies = []
    querySnapshot.forEach((doc) => {
      companies.push({ id: doc.id, ...doc.data() })
    })
    return companies
  }
  let [allCompanies, setAllCompanies] = useState([])
  useEffect(() => {
    const loadCompanies = async () => {
      const companies = await getCompaniesFromDB()
      console.log(companies)
      setAllCompanies(companies)
    }
    loadCompanies()
  }, [])

  ///////////////////////////





  let [checkCompanyExistence, setCheckCompanyExistence] = useState("")
  const addCompanyToDB = async () => {
    const companyName = document.getElementById("companyName").value
    const image = await uploadImage(document.getElementById("compImg").files[0])
    const companyAddress = document.getElementById("addressInp").value
    const startTime = document.getElementById("appt").value
    const endTime = document.getElementById("appt2").value
    const since = document.getElementById("sinceInp").value
    const userId = auth.currentUser.uid
    if (companyName.length == 0 || image.length == 0 || companyAddress.length == 0 || startTime.length == 0 || endTime.length == 0 || since.length == 0) {
      swal("Please fill all inputs!");
      return
    }

    try {

      if (localStorage.getItem("companyExists") == "yes") {
        swal("Your one Doctor account already exists , Signup with anoter to continue as a doctor")
        return
      }

      const companyData = { userId, companyName, since, companyAddress, startTime, endTime, image }
      await addDoc(collection(db, "companies"), companyData)
      await getCompaniesFromDB()
      await swal("Congratulations!", "Company Added Successfully!", "success");
      console.log("try works")
      localStorage.setItem("companyExists", "yes")


    } catch (e) {
      console.log(e.message)
    }



  }
  async function uploadImage(image) {
    const storageRef = ref(storage, `images/${image.name}`)
    const snapshot = await uploadBytes(storageRef, image)
    const url = await getDownloadURL(snapshot.ref)
    return url
  }



  const toggleStar = (e) => {
    if (e.target.className === "fa-regular fa-star") {
      e.target.className = "fa-solid fa-star"
    }
    else {
      e.target.className = "fa-regular fa-star"
    }
  }


  const detailPage = (e) => {
    let id = e
    console.log("home id>>>>>>>>" + id)
    localStorage.setItem("detailId", id)
    navigate(`/detail?id=${e}`)
  }

  let [clickedCompany, setClickedCompany] = useState("")
  const companiesToDisplay = allCompanies.map((item, index) => {
    return <div className="companyItem" key={index}>
      <div className="imageDiv"><img src={item.image} alt="" /></div>
      <div className="descriptionDiv" onClick={() => detailPage(item.id)}><h2>Dr. {item.companyName}</h2> <h3>{item.companyAddress}</h3></div>
      <div className="rating">
        <i className="fa-regular fa-star" onClick={toggleStar}></i>
        <i className="fa-regular fa-star" onClick={toggleStar}></i>
        <i className="fa-regular fa-star" onClick={toggleStar}></i>
        <i className="fa-regular fa-star" onClick={toggleStar}></i>
      </div>
    </div>
  })

  // console.log(clickedCompany)
  console.log(allCompanies)








  const logout = async () => {
    auth.signOut();
    await swal("Congratulations!", "Logged out!", "success");
    navigate("/")
  }


  let arraySince = []
  for (let i = 2022; i >= 1900; i--) {
    arraySince.push(i)
  }
  const years = arraySince.map((sinceYearItem) => {
    return <option key={sinceYearItem + 200} value={sinceYearItem}>{sinceYearItem}</option>
  })


  return (
    <>
      <div className='mainHomePage'>
        <div className="HomeHeader" style={{ marginTop: "30px" }}>
          <div className="logo"><img src={logo} style={{ width: "60px", height: "60px" }} alt="" /></div>
          <div className="userInfo">   <h2>Hey, {authData.name} <p>How are you feeling today?</p></h2></div>

          <div className="dropdown">
            <i className="fa-solid fa-user profileIcon" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" ></i>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
              <li><a className="dropdown-item" onClick={() => navigate("/myCompanies")}>My Companies</a></li>
            </ul>
          </div>
        </div>
        <hr className="w-25 mx-auto" />


        <div className="doctorImgDiv">
          <div className="doctor"><img src={doctorImg} className="drImg" alt="" /></div>
          <div className="consultDesc"><h2>Consult expert doctors from home.</h2>
            <a href="#allCompanies"><button >Consult Now</button></a>


          </div>
        </div>

        <p className="ooor or">OR</p>

        <div className="asDoctorBtnDiv" ><button className="continueAsDr" data-bs-toggle="modal"
          data-bs-target="#loginDiv"
          data-bs-dismiss="modal">Continue as Doctor</button></div>

        <h1 className="drNearBy">Doctors near by</h1>
        <div className="companies" id="allCompanies">
          {companiesToDisplay}
        </div>












        <div >
          <footer className="footer text-center text-white">
            <div className="container p-4 pb-0">
              <section className="mb-4">
                <a
                  className="btn text-white btn-floating m-1"
                  style={{ backgroundColor: "#3b5998" }}

                  href="#!"
                  role="button"
                ><i className="fab fa-facebook-f"></i
                ></a>

                <a
                  className="btn text-white btn-floating m-1"
                  style={{ backgroundColor: "#55acee" }}

                  href="#!"
                  role="button"
                ><i className="fab fa-twitter"></i
                ></a>

                <a
                  className="btn text-white btn-floating m-1"

                  style={{ backgroundColor: "#0082ca" }}


                  href="#!"
                  role="button"
                ><i className="fab fa-google"></i
                ></a>

                <a
                  className="btn text-white btn-floating m-1"
                  style={{ backgroundColor: "#ac2bac" }}

                  href="#!"
                  role="button"
                ><i className="fab fa-instagram"></i
                ></a>

                <a
                  className="btn text-white btn-floating m-1"
                  style={{ backgroundColor: "#0082ca" }}

                  href="#!"
                  role="button"
                ><i className="fab fa-linkedin-in"></i
                ></a>
                <a
                  className="btn text-white btn-floating m-1"
                  style={{ backgroundColor: "#333333" }}
                  href="#!"
                  role="button"
                ><i className="fab fa-github"></i
                ></a>
              </section>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: 'black' }}>
              © 2020 Copyright:
              <a className="text-white" >MDBootstrap.com</a>
            </div>
          </footer>
        </div>





















        {/* Continue as Doctor Popup */}
        <div id="loginDiv" className="modal login-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="signupTitle">Continue as doctor!</h2>
                <i className="fas fa-times btnClose " data-bs-dismiss="modal"></i>
              </div>
              <div className="modal-body">
                <div className="since-comp">
                  <div className="nameOfCompanyDiv">
                    Name of Company
                    <input type="text" id="companyName" required />
                  </div>
                  <div className="sinceDiv">
                    Since <br />
                    <select name="since" id="sinceInp" className="sinceInput" required>{years}</select>
                  </div>
                </div>
                <h6 className="mt-4">Select three images of your company certificates Certificates (Max 3 Images)
                </h6>
                <div className="my-2">
                  <input className="form-control" type="file" id="compImg" />
                </div>



                <div className="address my-3">
                  Your company address <br />
                  <input type="text" className="addressInp" id="addressInp" required />
                </div>

                <h6 className="mt-4">Select your company timing</h6>
                <div className="timing">
                  <div className="startTime"><label htmlFor="appt">From</label><br />
                    <input type="time" id="appt" name="appt" required /></div>
                  <div className="endTime"><label htmlFor="appt2">To</label><br />
                    <input type="time" id="appt2" name="appt" required /></div>
                </div>

                <button className="btn btn-primary mt-3" id="companyAddBtn" onClick={addCompanyToDB} style={{ fontSize: "15px" }}>Submit</button>

              </div>
            </div>
          </div>
        </div>
        {/* continue as dr popup ends */}











      </div></>
  )
}

export default Home
