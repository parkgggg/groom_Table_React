import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {AdminBackGround, ControlPanel, TableForm, WaitingTable, TableRow, Buttons} from "./PageStyles"


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
  const [date, setDate] = useState(() => {
    let today = new Date();
    return (
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0")
    );
  });

  //리스트에서 클릭 한 행의 전화번호를 스테이트에 저장해줄 것
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        /*const response = await axios.get(
          `http://127.0.0.1:8090/api/collections/customers/records`
        );
        const customers = response.data.items.filter((element) => {
          return element.restaurant_id === restaurantId;
          //return element.restaurant_id === restaurantId && element.date === date ;
        });*/
        //console.log(restaurantId);
        const response = await axios.get("http://localhost:8080/admin", {
          params: {
            company_id: restaurantId,
            day: date,
          },
        });

        //날짜 읽어오면 날짜 순으로 정렬하는 것으로 변경
        //const list = customers.sort((a, b) => a.member - b.member);
        //setReservations(list);
        console.log(response);
        setReservations(response.data); //
      } catch (error) {
        console.error("예약 목록 조회 실패:", error);
      }
    };
    fetchReservations();
  }, [restaurantId, date]);

  const handleCall = () => {
    const fetchCall = async () => {
      try {
        const qs = require("qs");

        const response = await axios.post(
          "http://localhost:8080/admin/call",
          qs.stringify({
            tel: selected.phoneNum,
            sequence: selected.memberSeq,
            status: selected.status,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log("호출됨");
      } catch (error) {
        console.log(error);
      }
    };
    if (selected) fetchCall();
  };

  const handleConfirm = () => {
    const fetchConfirm = async () => {
      try {
        const qs = require("qs");

        const response = await axios.post(
          "http://localhost:8080/admin/confirm",
          qs.stringify({
            tel: selected.phoneNum,
            sequence: selected.memberSeq,
            status: selected.status,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (selected) fetchConfirm();
  };
  /*
  const handleCancel = () => {
    const fetchCancel = async () => {
      try {
        const response = await axios.post("삭제 해주는 api");
      } catch (error) {
        console.log(error);
      }
    };
    if (selected) fetchCancel();
  };
*/
  const extractTime = (reservationTime) => {
    const timestamp = new Date(reservationTime);
    const hours = timestamp.getHours().toString().padStart(2, "0");
    const minutes = timestamp.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <AdminBackGround>
      <h2>날짜별 대기 조회</h2>
      <ControlPanel>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        {/* <img src="calendar-icon.png" id="imageButton" alt="날짜 선택" style="cursor: pointer;" onclick="triggerDatePicker()"> */}

        <Buttons>
          <button onClick={() => handleCall()}>호출</button>
          <button onClick={() => handleConfirm()}>확인</button>
          {/* <button onClick={() => handleCancel()}>취소</button> */}
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
              <th>예약 시간</th>
              <th>대기 상태</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((element, index) => (
              <TableRow
                key={index}
                selectable={element.status !== "confirm"}
                highlight={
                  selected.phoneNum === element.phoneNum &&
                  element.status !== "confirm"
                }
                onClick={() => setSelected(element)}
              >
                <td>{index + 1}</td>
                <td>{element.phoneNum}</td>
                <td>{element.peopleNum}</td>
                <td>{element.extra}</td>
                <td>{extractTime(element.reservationTime)}</td>
                <td>{element.status}</td>
              </TableRow>
            ))}
          </tbody>
        </WaitingTable>
      </TableForm>
    </AdminBackGround>
  );
}

export default AdminPage;
