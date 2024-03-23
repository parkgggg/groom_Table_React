import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

import axios from "axios";

import {
  AdminBackGround,
  ControlPanel,
  TableForm,
  WaitingTable,
  TableRow,
  Buttons,
} from "../lib/styles/PageStyles";

function AdminPage() {
  const [reservations, setReservations] = useState([]);
  const [refreshkey, setRefreshKey] = useState(1);
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
  const navigate = useNavigate();
  const restaurantname = sessionStorage.getItem("restaurantname");
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin", {
          params: {
            company_id: restaurantname,
            day: date,
          },
        });

        setReservations(response.data); //
      } catch (error) {
        console.error("예약 목록 조회 실패:", error);
      }
    };
    fetchReservations();
  }, [restaurantname, date, refreshkey]);

  const handleCall = () => {
    const fetchCall = async () => {
      try {
        const qs = require("qs");

        await axios.post(
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
        setRefreshKey((oldkey) => (oldkey + 1) % 2);
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

        await axios.post(
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
        setRefreshKey((oldkey) => (oldkey + 1) % 2);
      } catch (error) {
        console.log(error);
      }
    };

    if (selected) fetchConfirm();
  };

  const handleBack = () => {
    navigate(`/${restaurantname}`);
  };

  const extractTime = (reservationTime) => {
    const timestamp = new Date(reservationTime);
    const hours = timestamp.getHours().toString().padStart(2, "0");
    const minutes = timestamp.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <AdminBackGround>
      <div>
        <Buttons style={{position: "absolute", left:"5px", top: "5px"}}>
          <button onClick={() => handleBack()}>뒤로</button>
        </Buttons>
      </div>
      <h2>날짜별 대기 조회</h2>
      <ControlPanel>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <Buttons>
          <button onClick={() => handleCall()}>호출</button>
          <button onClick={() => handleConfirm()}>확인</button>
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
