import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import { CardContent, Typography, colors, useTheme } from "@material-ui/core";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import PhoneIcon from "@material-ui/icons/Phone";
import TabletIcon from "@material-ui/icons/Tablet";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableSortLabel,
  TextField,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import firebase from "firebase/app";
import { typography } from "@material-ui/system";

export default function ConfirmationScreen(props) {
  const useStyles = makeStyles(() => ({
    root: {},
    actions: {
      justifyContent: "flex-end",
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  var charityData = props.data;
  console.log("CHARITYDATA:", charityData);

  const ringData = {
    datasets: [
      {
        data: [20, 20, 20, 20, 20],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.green[600],
          colors.yellow[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: charityData.map((a) => a.name),
  };
  var sum = 0;
  charityData.map((a) => (sum += parseInt(a.value, 10)));

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };
  const cardHeaderStyle = {
    background: "#3f51b5",
    color: "white"
  };
  const tableRowStyle = {
    fontWeight: "bold",
  };
  const totalStyle = {
    fontWeight: "bold",
    fontSize: 20
  };
  return (
    <div>
      <Card className={clsx(classes.root, "ring")}>
        <CardHeader
          title="Your Monthly Contribution:"
          style={cardHeaderStyle}
        />
        <Divider />
        <CardContent>
          <Box height={300} position="relative">
            <Doughnut data={ringData} options={options} />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {charityData.map(({ charityId, name, value }) => (
              <Box key={name} p={1} textAlign="center">
                <Typography color="textPrimary" variant="body1">
                  {name}
                </Typography>
                <Typography color="textSecondary" variant="h2">
                  {20}%
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
      <Card className={clsx(classes.root, "")}>
        <CardHeader title="Charities Picked for You:" style={cardHeaderStyle} />
        <Divider />
        <PerfectScrollbar>
          <Box minWidth={800}>
            <Table>
              <TableHead>
                <TableRow style={tableRowStyle}>
                  <TableCell style={tableRowStyle}>Charity Name</TableCell>
                  <TableCell style={tableRowStyle}>Charity ID</TableCell>
                  <TableCell style={tableRowStyle}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {charityData.map((charity) => (
                  <TableRow hover key={charity.charityId}>
                    <TableCell><a href={"/charity/" + charity.charityId} target="_blank">{charity.name}</a></TableCell>
                    <TableCell>{charity.charityId}</TableCell>
                    <TableCell>{`\$${charity.value}.00`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
                <TableRow hover key={"0000"}>
                  <TableCell style={totalStyle}>Total Cost:</TableCell>
                  <TableCell></TableCell>
                  <TableCell style={totalStyle}>{`\$${sum}.00`}</TableCell>
                </TableRow>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            href="/profile"
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="large"
            variant="text"
          >
            Confirm
          </Button>
        </Box>
      </Card>
    </div>
  );
}
