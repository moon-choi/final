import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
import Layout from "./Layout";
import axios from "axios";


export default function Login(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const setUser = props.setUser


  const cookies = new Cookies();
  const navigate = useNavigate()
  return (
    <>
      {/* <Navbar click={props.click}/> */}
      <Layout />
      <form id="form_login" action="/game" method="GET" runat="server">
        {/* <form id="form_login" action="/game" method="GET"  runat="server"  onSubmit={(e) => e.preventDefault()}> */}
        <input
          // name="email"
          id="register_email"
          rows="1"
          placeholder="EMAIL"
          type="email"
          value={userEmail}
          onChange={(e) => {
            // console.log(e.target.value);
            setUserEmail(e.target.value);
          }}
        ></input>
        <br />
        PASSWORD :{" "}
        <input
          // name="password"
          
          id="register_password"
          rows="1"
          placeholder="PASSWORD"
          type="password"
          value={userPassword}
          onChange={(e) => {
            // console.log(e.target.value);
            setUserPassword(e.target.value);
          }}
        ></input>
        <br />
        <button
          type="submit"
          onClick={(e) => {
            const loginInfo = {userEmail, userPassword}
            axios
              .post("http://localhost:8000/login", loginInfo)
              .then((res) => {
                if (res.data) {
                  // console.log("1", res);
                  setUser(res.data.userName) // pass username so that server set username and socketid as key:value pair
                  console.log("res.data", res.data);
                  cookies.set("email", res.data);
                  navigate("/game")
                } else {
                  console.log("no matching user")
                  alert ("Invalid information. Please confirm your email and password")
                }
              });
            // useEffect(() => {
            // })
            // console.log(res)
            // console.log("CLICKED");
            // const userDataForCookies = loginHandler({
            //   userEmail,
            //   userPassword,
            // });
            // userDataForCookies.then((data) => {
            //   cookies.set("email", data);
            //   console.log("LOGIN DATA", data);
            // });
            // console.log("got response", userDataForCookies);
            // console.log("setting cookies");
            e.preventDefault();

            // cookies.set("password", userPassword);

            // socket.emit("LOGIN", { userData }).catch(err => console.log(err))
            // <Redirect to="/game" />;
            // 데이터 validation ... is true? else preventdefault
          }}
        >
          Login
        </button>
      </form>
    </>
  );
}
