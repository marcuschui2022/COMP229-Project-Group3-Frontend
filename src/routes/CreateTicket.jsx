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
import { Form, Link, redirect } from "react-router-dom";
import * as React from "react";
// import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const data = new FormData(event.currentTarget);
  //   // const postData = Object.fromEntries(data);
  //   // // console.log(postData);

  //   await fetch("/v1/incidentTicket/createticket", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       incidentDescription: data.get("incidentDescription"),
  //       incidentPriority: incidentPriority,
  //       customerInformation: data.get("customerInformation"),
  //       incidentNarrative: data.get("incidentNarrative"),
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));

  //   console.log({
  //     incidentDescription: data.get("incidentDescription"),
  //     incidentPriority: incidentPriority,
  //     customerInformation: data.get("customerInformation"),
  //     incidentNarrative: data.get("incidentNarrative"),
  //   });

  //   // redirect("/dashboard");
  //   window.location.href = "/dashboard";
  //   // return console.log(redirect("/dashboard"));
  // };

  const [incidentPriority, setIncidentPriority] = React.useState("");

  const handleChangeIncidentPriority = (event) => {
    setIncidentPriority(event.target.value);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Form method="post">
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
              CREATE NEW INCIDENT
            </Typography>
            <Box
              // component="form"
              // method="POST"
              // noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
                      name="incidentPriority"
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
                CREATE
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
  if (!localStorage.getItem("user")) {
    return redirect("/login");
  } else {
    return null;
  }
}

export async function action({ request }) {
  // const errors = {};
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body:... , author:... }
  const statesCode = await fetch(
    "http://localhost:3000/api/incident-ticket/create-ticket",
    {
      method: "POST",
      body: JSON.stringify(postData),
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
    return redirect("/login");
  } else {
    return redirect("/dashboard");
  }
}
