// PasswordModal.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./modal.css";

//넷플릭스 강의 듣고 모달 사용법 좀 익히자
//모달에 비번 입력하면 admin 페이지로 리다이렉팅(/레스토랑식별자/admin)
function PasswordModal({ isOpen, onClose }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate Hook 사용
  const { restaurantId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.get(`http://127.0.0.1:8090/api/collections/restaurant/records?identifier=${username},password=${password}`)
      console.log(password);
      setPassword("");
      navigate(`/${restaurantId}/admin`); // useNavigate 함수로 이동
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("로그인 실패:", error);
      setPassword("");
      alert("로그인에 실패했습니다. 비밀번호를 확인해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>닫기</button>

          <h2 style={{ textAlign: "center", color: "white" }}>비밀번호 입력</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="submit-button-wrapper">
              <button type="submit">확인</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;