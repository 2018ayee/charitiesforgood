import React, { useState } from "react";
import clsx from "clsx";
import { PlaidLink } from "react-plaid-link";
import { Button, Card, CardHeader, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: "flex-end",
  },
}));
export default function PaymentScreen() {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, "")} variant="outlined">
      <CardHeader title="Your total contribution is $60.00" />

      <PlaidLink
        component={Button}
        componentProps={{ title: "Add Account" }}
        onSuccess={(result) => {
          console.log("Success: ", result);
        }}
        onExit={(result) => {
          console.log("Exit: ", result);
        }}
        token=''
        key='PUBLIC_KEY'
      >
        Connect a bank account
      </PlaidLink>
    </Card>
  );
}
