import styled from "styled-components";
import Regist from "./Regist";
import Login from "./Login";
import LogOut from "./LogOut";
import { useState, useEffect } from "react";

export default function UserBox() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserStyled>
      <Regist users={users} setUsers={setUsers} />
      <Login users={users} setUser={setUser} />
      <LogOut user={user} setUser={setUser} />
    </UserStyled>
  );
}

const UserStyled = styled.div``;
