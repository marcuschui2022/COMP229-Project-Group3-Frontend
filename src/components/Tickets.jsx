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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Link, redirect } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns = [
  {
    id: "recordNumber",
    label: "Record Number",
    // minWidth: 170,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  { id: "incidentDescription", label: "Incident Description" },
  { id: "status", label: "Status" },
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
  // console.log(tickets);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const handleAlertClickOpen = (id) => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setAlertOpen(true);
      setDeleteId(id);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleDelete = async () => {
    const statesCode = await fetch(
      `https://comp229-group3-w2023.azurewebsites.net/api/incident-ticket/tickets/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((x) => {
      return x.status;
    });
    if (statesCode === 401) {
      localStorage.clear();
      navigate("/login");
      // navigate("/dashboard");
    } else {
      navigate("/dashboard");
      setAlertOpen(false);
    }
    // window.location.href = "/dashboard";
  };
  // console.log("first 2");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [tickets, setTickets] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "90vh" }}>
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
                // console.log(row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      // console.log(column);
                      return (
                        <TableCell key={i} align={column.align}>
                          {/* {column.id === "recordNumber" && (
                            <IconButton>
                              <FiberNewIcon />
                            </IconButton>
                          )} */}
                          {/* {row.status === "Pending" && (
                            <IconButton>
                              <FiberNewIcon />
                            </IconButton>
                          )} */}

                          {row.status !== "Closed" && column.id === "_id" && (
                            <Link to={`/update-ticket/${value}`}>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                          )}

                          {row.status !== "Closed" && column.id === "_id" && (
                            <IconButton
                              onClick={() => handleAlertClickOpen(value)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          )}

                          {row.status === "Closed" && column.id === "_id" && (
                            <Link to={`/update-ticket/${value}`}>
                              <IconButton>
                                <VisibilityIcon />
                              </IconButton>
                            </Link>
                          )}

                          {/* {column.id === "_id" && (
                            <IconButton href={`/updateticket/${value}`}>
                              delete
                            </IconButton>
                          )} */}

                          {/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}
                          {column.id !== "_id" && value !== "New" && value}
                          {column.id === "status" && value === "New" && (
                            <IconButton>
                              <FiberNewIcon />
                            </IconButton>
                          )}
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
