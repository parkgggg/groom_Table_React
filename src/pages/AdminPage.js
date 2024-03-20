import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

const BackGround = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const ControlPanel = styled.div`
  width: 95vw; /* 테이블 폼과 일치하도록 너비 설정 */
  display: flex;
  justify-content: space-between; /* 좌우 여백 최대화 */
  padding: 0 20px; /* 좌우 패딩 */
  margin-bottom: 10px; /* 테이블과의 간격 */
`;

const TableForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  overflow-y: auto; // 스크롤 추가
  width: 95vw; /* 고정된 너비 설정 */
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
`;

const WaitingTable = styled.table`
  width: 100%;
  border-collapse: collapse; // 테이블 셀 사이의 간격을 없애줍니다.

  th,
  td {
    border: 1px solid #ddd; // 테이블 셀에 경계선 추가
    text-align: left;
    padding: 8px; // 셀 내용과 경계 사이의 패딩을 추가하여 간격을 넓힙니다.
  }
`;

//테이블 각 행에 대한 스타일링 => 호버, 클릭(하이라이트)
const TableRow = styled.tr`
  &:hover {
    background-color: #ddd; // 마우스 호버 시 배경색 변경
  }

  ${props =>
    props.highlight && css`
    border: 2px solid;
    border-color: purple;
    background-color: #D8BFD8;	
    `}
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end; // 버튼을 우측 정렬
  gap: 10px; // 버튼 사이의 간격 설정
`;

//input 태그 date 속성으로 날짜 선택 & 식당 식별자 => 백에 지금 식당의 선택한 날짜 예약 손님 데이터 요청
//받아오면 리스팅
//테이블 형식으로 해서 스크롤할 수 있도록,
//리스팅(날짜별) 예약한 시간 순서대로 오름차순으로 수직 정렬(빠른 예약이 가장 위)
//클릭하면 해당 손님 하이라이트
//하이라이트 되면 리스트 테이블 우상단에 있는 "호출", "취소" 버튼을 통해 처리
//호출 -> 손님 전화번호
function AdminPage() {
  const { restaurantId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState(0);
  //리스트에서 클릭 한 행의 전화번호를 스테이트에 저장해줄 것
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8090/api/collections/customers/records`
        );
        const customers = response.data.items.filter((element) => {
          return element.restaurant_id === restaurantId;
          //return element.restaurant_id === restaurantId && element.date === date ;
        });
        //날짜 읽어오면 날짜 순으로 정렬하는 것으로 변경
        const list = customers.sort((a, b) => a.member - b.member);
        setReservations(list);
        console.log(list);
      } catch (error) {
        console.error("예약 목록 조회 실패:", error);
      }
    };
    fetchReservations();
  }, [restaurantId, date]);

  const handleCall = () => {
    const fetchCall = async () => {
        try {
            const response = await axios.post('status 바꿔주는 api')
        } catch (error) {
            console.log(error);
        }
    }
    if (selected)
        fetchCall();
  }

  const handleCancel = () => {
    const fetchCancel = async () => {
        try {
            const response = await axios.post('삭제 해주는 api')
        } catch (error) {
            console.log(error);
        }
    }
    if (selected)
        fetchCancel();
  }

  return (
    <BackGround>
      <ControlPanel>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Buttons>
            <button onClick={() => handleCall() }>호출</button>
            <button onClick={() => handleCancel()}>취소</button>
          </Buttons>
      </ControlPanel>

      <TableForm>
        <WaitingTable>
          <thead>
            <tr>
              <th>No</th>
              <th>전화번호</th>
              <th>인원</th>
              <th>추가 요청 사항</th>
              <th>대기 상태</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((element, index) => (
              <TableRow key={index} highlight = {selected === element.phone} onClick={() => setSelected(element.phone)} >
                <td>{index + 1}</td>
                <td>{element.phone}</td>
                <td>{element.member}</td>
                <td>{element.extra}</td>
                <td>{element.status}</td>
              </TableRow>
            ))}
          </tbody>
        </WaitingTable>
      </TableForm>
    </BackGround>
  );
}

export default AdminPage;
