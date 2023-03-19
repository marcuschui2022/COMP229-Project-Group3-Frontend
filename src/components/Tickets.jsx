import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Icon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const columns = [
  {
    id: "recordNumber",
    label: "Record Number",
    // minWidth: 170,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  { id: "incidentDescription", label: "Incident Description" },
  { id: "incidentPriority", label: "Incident priority" },
  //   {
  //     id: "population",
  //     label: "Population",
  //     // minWidth: 170,
  //     align: "right",
  //     format: (value) => value.toLocaleString("en-US"),
  //   },
  //   {
  //     id: "size",
  //     label: "Size\u00a0(km\u00b2)",
  //     // minWidth: 170,
  //     align: "right",
  //     format: (value) => value.toLocaleString("en-US"),
  //   },

  {
    id: "customerInformation",
    label: "Customer information",
    // minWidth: 170,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "incidentNarrative",
    label: "Incident Narrative",
    // minWidth: 170,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "_id",
    label: "",
    // minWidth: 170,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  incidentDescription,
  incidentPriority,
  customerInformation,
  incidentNarrative,
  _id
) {
  return {
    incidentDescription,
    incidentPriority,
    customerInformation,
    incidentNarrative,
    _id,
  };
}
// function createData(incidentDescription, incidentPriority, population, size) {
//   const density = population / size;
//   return { incidentDescription, incidentPriority, population, size, density };
// }

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function StickyHeadTable() {
  const tickets = useLoaderData();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const navigate = useNavigate();

  const handleAlertClickOpen = (id) => {
    setAlertOpen(true);
    setDeleteId(id);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleDelete = async () => {
    await fetch(
      `https://comp229-group3-backend.azurewebsites.net/api/incident-ticket/tickets/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAlertOpen(false);
    navigate("/dashboard");
    // window.location.href = "/dashboard";
  };
  // console.log("first 2");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [tickets, setTickets] = React.useState([]);

  // React.useEffect(() => {
  //   // const result = await axios(
  //   //   "https://comp229-group3-backend.azurewebsites.net/api/v1/incidentTicket/tickets"
  //   // );

  //   async function fetchTickets() {
  //     let res = await fetch("https://comp229-group3-backend.azurewebsites.net/api/v1/incidentTicket/tickets")
  //       .then((response) => response.json())
  //       .then((result) => result)
  //       .catch((error) => console.log("error", error));
  //     console.log(res);
  //     if (res) {
  //       setTickets(res);
  //     }
  //   }

  //   fetchTickets();
  //   // console.log(result);
  //   // await fetch("https://comp229-group3-backend.azurewebsites.net/api/users/", {
  //   //     method: "POST",
  //   //     body: JSON.stringify({
  //   //       incidentDescription: data.get("incidentDescription"),
  //   //       incidentPriority: incidentPriority,
  //   //       customerInformation: data.get("customerInformation"),
  //   //       incidentNarrative: data.get("incidentNarrative"),
  //   //     }),
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //   })
  //   //     .then((response) => response.json())
  //   //     .then((data) => console.log(data));
  // }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {/* <TableCell></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      //   console.log(column.id);
                      return (
                        <TableCell key={i} align={column.align}>
                          {column.id === "recordNumber" && (
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          )}
                          {column.id === "_id" && (
                            <Link to={`/update-ticket/${value}`}>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                          )}

                          {column.id === "_id" && (
                            <IconButton
                              onClick={() => handleAlertClickOpen(value)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          )}
                          {/* {column.id === "_id" && (
                            <IconButton href={`/updateticket/${value}`}>
                              delete
                            </IconButton>
                          )} */}

                          {/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}
                          {column.id !== "_id" && value}
                        </TableCell>
                      );
                    })}
                    {/* <TableCell>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confrim Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            forever delete... forever delete... forever delete...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Back</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
