import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import {LoginBackGround, LoginForm, Button} from "../lib/styles/PageStyles"
import img from "../assets/logo.png"

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const qs = require('qs');
      const response = await axios.post('http://localhost:8080/login', qs.stringify({
        id: username,
        password: password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      sessionStorage.setItem("username", response.data.adminId);
      sessionStorage.setItem("restaurantname", response.data.companyId);
      sessionStorage.setItem("memberseq", response.data.memberSeq);
      
      setUsername("");
      setPassword("");      
      
      navigate(`/${response.data.companyId}`); // useNavigate 함수로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      setUsername("");
      setPassword("");
      alert("로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <LoginBackGround style={{zIndex: "-1"}}>
      <div style={{position: "absolute", bottom: "55%", zIndex:"1"}}>
        <img src={img} alt="로고" style={{width: "300px", height:"300px", background: "transparent" }}/>
      </div>
      <LoginForm style={{zIndex: "2"}} onSubmit={handleLogin}>
        <div style={{marginBottom: "20px", width: "80%" }}>
          <label
            style={{ display: "block", marginBottom: "5px", textAlign: "center"}}
            htmlFor="username"
          >
            ID
          </label>
          <input
            style={{ width: "100%", padding: "2px" }}
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{marginBottom: "20px", width: "80%" }}>
          <label
            style={{ display: "block", marginBottom: "5px", textAlign: "center" }}
            htmlFor="password"
          >
            Password
          </label>
          <input
            style={{ width: "100%", padding: "2px" }}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
        >
          로그인
        </Button>
      </LoginForm>
    </LoginBackGround>
  );
}
export default LoginPage;
