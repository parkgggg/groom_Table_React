import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";

const BackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px; /* 고정된 너비 설정 */
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
`;

const Button = styled.button`
width: 50%;
padding: 10px;
background-color: gray;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
&:hover {
  background-color: darkgray; // 버튼을 호버했을 때의 배경색 변경
}`


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const qs = require('qs')
      //const response = await axios.post(`http://localhost:8080/login?id=${username}&password=${password}`);    
      //url에 id, 비번 포함해서 날리면 되는데 body로 빼주면 안 되는 이유?
      //JSON형식이 아니라 x-www-form-urlencoded 형식으로 보내줘야 되는 거 였음....

      const response = await axios.post('http://localhost:8080/login', qs.stringify({
        id: username,
        password: password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      /*const response = await axios.get(
        `http://127.0.0.1:8090/api/collections/restaurant/records?identifier=${username},password=${password}`
      );*/
      // 로그인 성공 후 받은 식당 ID를 예약 페이지 URL에 포함시키고 이동
      // 레스토랑 id 조회되는 지 확인(여기선 get 요청으로함, 추후 post보내고 응답받는 버젼으로 변경(위에 주석처리해놓은 거)
      console.log(response);
      const restaurantId = response.data.companyId;
      setUsername("");
      setPassword("");
      console.log(restaurantId);
      navigate(`/${restaurantId}`); // useNavigate 함수로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      setUsername("");
      setPassword("");
      alert("로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인해주세요.");
      // 로그인 실패 처리
    }
  };

  return (
    <BackGround>
      <LoginForm onSubmit={handleLogin}>
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
    </BackGround>
  );
}
export default LoginPage;
