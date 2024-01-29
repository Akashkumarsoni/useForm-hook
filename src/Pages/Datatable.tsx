import { Card, Typography } from "@mui/material";
import DataTables from "datatables.net";
import { useSelector } from "react-redux";

const Datatable = () => {
  new DataTables("#myTable");
  const listOfUser = useSelector((store:any)=>{
    return store.listOfUsers;
  });
  return (
    <>
      {listOfUser.length > 0 && (
        <Card sx={{ padding: 2, marginTop: 5 }}>
          <Typography component="h1" variant="h3" align="center" sx={{ padding: 4 }}>
            List of Register Users
          </Typography>
          <table id="myTable" className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age / Sex</th>
                <th>Id</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {listOfUser.map((lst: any) => {
                const address =
                  (lst.address !== "" ? lst.address + "," : "") +
                  (lst.city !== "" ? lst.city + "," : "") +
                  (lst.state !== "" ? lst.state + "," : "") +
                  (lst.country !== "" ? lst.country + "," : "") +
                  (lst.zip !== "" ? lst.zip + "" : "");
                return (
                  <tr>
                    <td>{lst.name}</td>
                    <td>{`${lst.age} / ${lst.gender}`}</td>
                    <td>
                      {lst.idType} / {lst.idNumber}
                    </td>
                    <td>{address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}

export default Datatable