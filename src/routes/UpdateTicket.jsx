import Container from "@mui/material/Container";

import {
  Avatar,
  Box,
  Button,
  Grid,

  //   InputLabel,
  //   MenuItem,
  //   Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import * as React from "react";
// import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    await fetch("/v1/incidentTicket/createticket", {
      method: "PATCH",
      body: JSON.stringify({
        incidentDescription: data.get("incidentDescription"),
        incidentPriority: incidentPriority,
        customerInformation: data.get("customerInformation"),
        incidentNarrative: data.get("incidentNarrative"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    console.log({
      incidentDescription: data.get("incidentDescription"),
      incidentPriority: incidentPriority,
      customerInformation: data.get("customerInformation"),
      incidentNarrative: data.get("incidentNarrative"),
    });

    window.location.href = "/dashboard";
  };

  const ticket = useLoaderData();

  const [incidentPriority, setIncidentPriority] = React.useState(
    ticket.incidentPriority
  );

  const handleChangeIncidentPriority = (event) => {
    setIncidentPriority(event.target.value);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Form method="PATCH">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              UPDATE INCIDENT TICKET
            </Typography>
            <Box
              // component="form"
              // method="POST"
              // noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <input
                id="_id"
                name="_id"
                defaultValue={ticket._id}
                type="hidden"
              />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="incidentDescription"
                    label="Incident Description"
                    name="incidentDescription"
                    rows={5}
                    multiline={true}
                    defaultValue={ticket.incidentDescription}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="incidentPriorityLabel">
                      Incident priority
                    </InputLabel>
                    <Select
                      required
                      labelId="incidentPriority"
                      id="incidentPriority"
                      value={incidentPriority}
                      label="Incident priority"
                      onChange={handleChangeIncidentPriority}
                    >
                      <MenuItem value={"High"}>High</MenuItem>
                      <MenuItem value={"Medium"}>Medium</MenuItem>
                      <MenuItem value={"Low"}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="customerInformation"
                    label="Customer information"
                    name="customerInformation"
                    rows={5}
                    multiline={true}
                    defaultValue={ticket.customerInformation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="incidentNarrative"
                    label="Incident Narrative"
                    name="incidentNarrative"
                    rows={5}
                    multiline={true}
                    defaultValue={ticket.incidentNarrative}
                  />
                </Grid>
              </Grid>
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                UPDATE
              </Button>
              <Link to="/dashboard">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>
              </Link>
            </Box>
          </Box>
        </Form>
      </Container>
    </div>
  );
}

export default App;

export async function loader({ params }) {
  const response = await fetch(
    // "https://comp229-group3-w2023.azurewebsites.net/api/incident-ticket/tickets/64152cbd8992d7999a4d4bd6"
    "https://comp229-group3-w2023.azurewebsites.net/api/incident-ticket/tickets/" +
      params.id
  );

  const resData = await response.json();
  return resData;
}

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body:... , author:... }

  console.log(postData);
  console.log(
    `https://comp229-group3-w2023.azurewebsites.net/api/incident-ticket/update-ticket/${postData._id}`
  );
  await fetch(
    `https://comp229-group3-w2023.azurewebsites.net/api/incident-ticket/update-ticket/${postData._id}`,
    {
      method: "PATCH",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return redirect("/dashboard");
}
