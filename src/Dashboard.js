import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link as RLink,
} from "react-router-dom";
import Summary from "./pages/Summary";
import PdfUploader from "./pages/Upload";
import ProblemSummary from "./pages/ProblemSummary";
import Document from "./pages/Document";
import Chat from "./pages/Chat";

// const patient = {
//   medications: [
//     {
//       active: true,
//       dosage: "5 mg daily",
//       name: "Amlodipine",
//       quote: "Current Medications: Amlodipine 5 mg daily",
//       source_id: 0,
//       source_path: "patient/Hypertension Treatment Medical Report.pdf",
//     },
//     {
//       active: true,
//       dosage: "25 mg daily",
//       name: "Hydrochlorothiazide",
//       quote: "Current Medications: Hydrochlorothiazide 25 mg daily",
//       source_id: 0,
//       source_path: "patient/Hypertension Treatment Medical Report.pdf",
//     },
//     {
//       active: true,
//       dosage: "75 mg/m² IV infusion on Day 1 of each cycle",
//       name: "Docetaxel",
//       quote: "Docetaxel: 75 mg/m² IV infusion on Day 1 of each cycle",
//       source_id: 2,
//       source_path: "patient/Chemotherapy Treatment Medical Report.pdf",
//     },
//     {
//       active: true,
//       dosage: "50 mg/m² IV infusion on Day 1 of each cycle",
//       name: "Doxorubicin",
//       quote: "Doxorubicin: 50 mg/m² IV infusion on Day 1 of each cycle",
//       source_id: 2,
//       source_path: "patient/Chemotherapy Treatment Medical Report.pdf",
//     },
//     {
//       active: true,
//       dosage: "500 mg/m² IV infusion on Day 1 of each cycle",
//       name: "Cyclophosphamide",
//       quote: "Cyclophosphamide: 500 mg/m² IV infusion on Day 1 of each cycle",
//       source_id: 2,
//       source_path: "patient/Chemotherapy Treatment Medical Report.pdf",
//     },
//   ],
//   overview:
//     "Claire Thompson, a 52-year-old female with a history of hypertension, presented with a lump in her right breast, diagnosed with Stage II Invasive Ductal Carcinoma. She underwent a lumpectomy and sentinel lymph node biopsy, followed by a treatment plan including a TAC chemotherapy regimen and radiation therapy. Post-treatment, she completed chemotherapy with expected adverse effects and is currently stable with no signs of disease recurrence. Ongoing monitoring with surveillance mammography and clinical examinations is recommended, along with adherence to prescribed medications and lifestyle modifications.",
//   particulars: {
//     age: "52",
//     dob: "May 12, 1972",
//     gender: "Female",
//     name: "Claire Thompson",
//   },
//   problems: [
//     {
//       active: true,
//       name: "Invasive Ductal Carcinoma",
//       quote: "Diagnosis: Invasive Ductal Carcinoma, Stage II",
//       source_id: 2,
//       source_path: "patient/Patient Lumpectomy Discharge.pdf",
//     },
//     {
//       active: true,
//       name: "Hypertension",
//       quote:
//         "History of Present Illness: Ms. Thompson has a history of hypertension for which she has been under treatment for the past five years.",
//       source_id: 0,
//       source_path: "patient/Hypertension Treatment Medical Report.pdf",
//     },
//   ],
// };

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Curate
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const sideMenu = (
  <React.Fragment>
    <List component="nav">
      <RLink to="/upload">
        <ListItemButton>
          <ListItemText primary="Upload" />
        </ListItemButton>
      </RLink>
      <RLink to="/overview">
        <ListItemButton>
          <ListItemText primary="Overview" />
        </ListItemButton>
      </RLink>
      <RLink to="/problems">
        <ListItemButton>
          <ListItemText primary="Problems" />
        </ListItemButton>
      </RLink>
      <RLink to="/chat">
        <ListItemButton>
          <ListItemText primary="AI Chat" />
        </ListItemButton>
      </RLink>
    </List>
  </React.Fragment>
);

export default function Dashboard() {
  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={false}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Curate
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={true}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            ></Toolbar>
            <Divider />
            {sideMenu}
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/overview" element={<Summary />} />
                <Route path="/upload" element={<PdfUploader />} />
                <Route path="/problems" element={<ProblemSummary />} />
                <Route path="/document/:id" element={<Document />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}
