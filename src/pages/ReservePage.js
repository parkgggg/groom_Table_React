import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PasswordModal from "../components/PasswordModal"; //에러 무시해
import styled from "styled-components";

const BackGround = styled.div`
  position: relative; // 설정 버튼의 절대 위치를 위해 relative로 설정
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const RerserveForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px; /* 고정된 너비 설정 */
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
`;

const ConfigButton = styled.button`
  position: absolute;
  top: 20px; // 상단에서 20px 떨어진 위치
  right: 20px; // 우측에서 20px 떨어진 위치
  padding: 10px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkgray;
  }
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
  }
`;

function ReservationPage() {
  // 현재 대기 중인 사람 수 state, 클라이언트단에서 state로 대기 인원 수 관리하고, 백엔드로 업데이트
  // 시키는 방식으로 하는 게 더 효율적(매번 쿼리 날려서 대기자 수 찾아올 필요가 없어짐)
  const [currentWaiting, setCurrentWaiting] = useState(0);

  //예약자 정보
  //전화 번호, 인원 수, 추가 사항
  //이렇게 말고 객체형으로 한 번에 묶어줘도 될 듯
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [additionalRequests, setAdditionalRequests] = useState("");

  //식당 식별자(이전 로그인 페이지에서 넘어오면서 같이 온 라우팅 변수를 useParams로 뽑기
  const { restaurantId } = useParams();
 
  //관리자 페이지 접근용 모달
  const [showModal, setShowModal] = useState(false); // 모달 보이기/숨기기 상태

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //맨 처음 DB에서 식당 식별자로 손님 정보 받아와서 대기 인원 추출(맨 처음 1번만 시행, 일단)
  useEffect(() => {
    const fetchCurrentWaiting = async () => {
      try {
        // 백엔드에서 대기 중인 사람 수를 조회하는 API 엔드포인트로 교체해야 합니다.
        const response = await axios.get(
          `http://127.0.0.1:8090/api/collections/customers/records?restaurant_id=${restaurantId}&status=waiting`
        );
        //왠지는 모르겠지만 일단 프로미스 객체 형태로 밖에 반환이 안 된다. 특정
        //식당 ID && status가 waiting인 것들만 추려서 응답받고 싶었는데 모르겠음.
        //일단 추출은 완료
        //console.log(restaurantId);
        const waiting = response.data.items.reduce((acc, cur) => {
          return cur.restaurant_id == restaurantId ? acc + 1 : acc;
        }, 0);
        console.log("렌더링")
        setCurrentWaiting(waiting);
      } catch (error) {
        console.error("대기 중인 사람 수 조회 실패", error);
      }
    };

    fetchCurrentWaiting();
  }, [restaurantId]);

  //대기 인원 state에 변화있을 때마다 리렌더링
  useEffect(() => {}, [currentWaiting]);

  const resetAllstate = () => {
    setPhoneNumber("");
    setPartySize(0);
    setAdditionalRequests("");
  }

  const reserve_timestamp = () => {
    let now = new Date();
    console.log(now.getTime());
    return now.getTime();
  }

  const reserve_date = () => {
    let now = new Date();
    return now.toLocaleDateString();
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()){
        alert("전화 번호를 올바르게 입력해주세요");
        resetAllstate();
        return;
    }
    try {
      await axios.post(
        "http://127.0.0.1:8090/api/collections/customers/records",
        {
          restaurant_id: restaurantId,
          phone: phoneNumber,
          member: partySize,
          extra: additionalRequests,
          status: "waiting",
          timestamp: reserve_timestamp(),
          reserve_date: reserve_date()
        }
      );
      alert("예약이 추가되었습니다.");
      resetAllstate();
      //대기자 수 state 업데이트 해주고
      setCurrentWaiting((prev) => prev + 1);
      // 예약 추가 후 현재 대기 중인 사람 수를 다시 조회
    } catch (error) {
      console.error("예약 추가 실패", error);
      alert("예약 추가에 실패했습니다.");
    }
  };

  return (
    <BackGround>
      <div>
        <ConfigButton onClick={handleShowModal}>설정</ConfigButton>
        <PasswordModal restaurantId={restaurantId} isOpen={showModal} onClose={handleCloseModal} />
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
            style={{ width: "100%", padding: "2px"}}
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
            style={{ width: "100%", padding: "2px", textAlign: "center"}}
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
          <input
            style={{ width: "100%", padding: "2px" }}
            id="additionalRequests"
            type="text"
            value={additionalRequests}
            onChange={(e) => setAdditionalRequests(e.target.value)}
            required
          />
        </div>
        <Button type="submit">등록</Button>
      </RerserveForm>
    </BackGround>
  );
}

export default ReservationPage;
