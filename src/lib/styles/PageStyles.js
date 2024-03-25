import styled, { css } from "styled-components";


/////공통

export const Button = styled.button`
  width: 50%;
  padding: 10px;
  background-color: #FFB966;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #E9A553; // 버튼을 호버했을 때의 배경색 변경
  }
`;

/////ReservePage
export const ReserveBackGround = styled.div`
  position: relative; // 설정 버튼의 절대 위치를 위해 relative로 설정
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F1CC9F;
`;

export const RerserveForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px; /* 고정된 너비 설정 */
  background-color: #FEF0DF;
  padding: 20px;
  border-radius: 10px;
`;

export const AdminButton = styled.button`
  position: absolute;
  top: 20px; // 상단에서 20px 떨어진 위치
  right: 100px; // 우측에서 20px 떨어진 위치
  padding: 10px;
  background-color: #FFB966;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #E9A553;
  }
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 20px; // 상단에서 20px 떨어진 위치
  right: 20px; // 우측에서 20px 떨어진 위치
  padding: 10px;
  background-color: #FFB966;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #E9A553;
  }
`;

//////로그인 페이지
export const LoginBackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F1CC9F;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px; /* 고정된 너비 설정 */
  background-color: #FEF0DF;
  padding: 20px;
  border-radius: 10px;
`;


///관리자 페이지
export const AdminBackGround = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F1CC9F;
`;

export const ControlPanel = styled.div`
  width: 95vw; /* 테이블 폼과 일치하도록 너비 설정 */
  display: flex;
  justify-content: space-between; /* 좌우 여백 최대화 */
  padding: 0 20px; /* 좌우 패딩 */
  margin-bottom: 10px; /* 테이블과의 간격 */
`;

export const TableForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  overflow-y: auto; // 스크롤 추가
  width: 95vw; /* 고정된 너비 설정 */
  background-color: #FEF0DF;
  padding: 20px;
  border-radius: 10px;
`;

export const WaitingTable = styled.table`
  width: 100%;
  border-collapse: collapse; // 테이블 셀 사이의 간격을 없애줍니다.

  th,
  td {
    border: 1px solid #ddd; // 테이블 셀에 경계선 추가
    text-align: center;
    padding: 8px; // 셀 내용과 경계 사이의 패딩을 추가하여 간격을 넓힙니다.
  }
`;

//테이블 각 행에 대한 스타일링 => 호버, 클릭(하이라이트)
export const TableRow = styled.tr`
  background-color: #FEF0DF;

  ${(props) =>
    props.selectable &&
    css`
      background-color: #FEF0DF;

      &:hover {
        background-color: white;
      }
    `}

  ${(props) =>
    props.highlight &&
    css`
      border: 2px solid;
      border-color: black;
      background-color: white;
    `}
`;


export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end; // 버튼을 우측 정렬
  gap: 10px; // 버튼 사이의 간격 설정
`;

