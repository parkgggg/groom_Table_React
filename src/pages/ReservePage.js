import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../components/PasswordModal"; //에러 무시해
import {
  ReserveBackGround,
  AdminButton,
  LogoutButton,
  RerserveForm,
  Button,
} from "../lib/styles/PageStyles";

function ReservationPage() {
  const [currentWaiting, setCurrentWaiting] = useState(0);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [additionalRequests, setAdditionalRequests] = useState("");
  const navigate = useNavigate();
  const restaurantname = sessionStorage.getItem("restaurantname");
  const memberseq = sessionStorage.getItem("memberseq");

  const [showModal, setShowModal] = useState(false); // 모달 보이기/숨기기 상태

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchCurrentWaiting = async () => {
      try {
        const response = await axios.get("http://localhost:8080/waitingCnt", {
          params: {
            company_id: restaurantname,
          },
        });
        setCurrentWaiting(response.data);
      } catch (error) {
        console.error("대기 중인 사람 수 조회 실패", error);
      }
    };
    fetchCurrentWaiting();

    const intervalId = setInterval(fetchCurrentWaiting, 5000); // 5초마다 조회
    return () => clearInterval(intervalId);
  }, [restaurantname]);

  useEffect(() => {}, [currentWaiting]);

  const resetAllstate = () => {
    setPhoneNumber("");
    setPartySize(0);
    setAdditionalRequests("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      alert("전화 번호를 올바르게 입력해주세요");
      resetAllstate();
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/insReser",
        JSON.stringify({
          phoneNum: phoneNumber,
          peopleNum: partySize,
          extra: additionalRequests,
          companyId: restaurantname,
          memberSeq: memberseq,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("예약이 추가되었습니다.");
      resetAllstate();
      setCurrentWaiting((prev) => prev + 1);
    } catch (error) {
      console.error("예약 추가 실패", error);
      alert("예약 추가에 실패했습니다.");
    }
  };

  const handleLogout = () => {
    resetAllstate();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <ReserveBackGround>
      <div>
        <AdminButton onClick={handleShowModal}>관리</AdminButton>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>

        <PasswordModal isOpen={showModal} onClose={handleCloseModal} />
      </div>

      <RerserveForm onSubmit={handleSubmit}>
        <h2>손님 대기 예약</h2>
        <p>현재 대기 중인 사람 수: {currentWaiting}</p>

        <div style={{ marginBottom: "20px", width: "80%" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              textAlign: "center",
            }}
            htmlFor="phoneNumber"
          >
            전화 번호
          </label>
          <input
            style={{ width: "100%", padding: "2px", textAlign: "center" }}
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "20px", width: "80%" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              textAlign: "center",
            }}
            htmlFor="partySize"
          >
            인원 수:
          </label>
          <input
            style={{ width: "100%", padding: "2px", textAlign: "center" }}
            id="partySize"
            type="number"
            min={1}
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "20px", width: "80%" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              textAlign: "center",
            }}
            htmlFor="additionalRequests"
          >
            추가 요청:
          </label>
          <select style={{ width: "100%", padding: "2px", textAlign: "center" }}>
            <option value="">선택해주세요</option>
            <option value="애기의자 필요">애기의자 필요</option>
            <option value="창가 자리 원함">창가 자리 원함</option>
            <option value="조용한 자리 원함">조용한 자리 원함</option>
            <option value="기타 사항">기타 사항(직원에게 문의할게요)</option>
          </select>
        </div>
        <Button type="submit">등록</Button>
      </RerserveForm>
    </ReserveBackGround>
  );
}

export default ReservationPage;
