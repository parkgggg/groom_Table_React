import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AdminPage() {
  const { restaurantId } = useParams();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`YOUR_API_ENDPOINT/reservations/${restaurantId}`);
        setReservations(response.data);
      } catch (error) {
        console.error('예약 목록 조회 실패:', error);
      }
    };
    fetchReservations();
  }, [restaurantId]); // restaurantId가 변경될 때마다 예약 목록 재조회

  return (
    <div>
      {}
    </div>
  );
}

export default AdminPage;