import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MyDataTables from "./MyDataTables";
import { useEffect } from "react";
import { Container } from "@mui/material";

export const UserTable = () => {
  const users = useSelector((state: RootState) => state.data.usersData);

  const columns = [
    { data: "name", title: "Name" },
    { data: "age", title: "Age" },
    { data: "sex", title: "Sex" },
    { data: "mobile", title: "Mobile" },
    { data: "idType", title: "Govt Issued ID" },
    { data: "idNumber", title: "ID Number" },
    { data: "address", title: "Address" },
    { data: "city", title: "City" },
    { data: "state", title: "State" },
    { data: "country", title: "Country" },
    { data: "pincode", title: "Pincode" },
  ];

  useEffect(() => {
    console.log({ users });
  }, [users]);

  return (
    <>
    <Container>

      {users.length!=0?<div style={{backgroundColor:"white", borderRadius:"10px",padding:"10px", marginTop:"30px"}}>
        <h2>User Data</h2>
        <MyDataTables data={users} columns={columns} />
      </div>:null}
      </Container>
    </>
  );
};
