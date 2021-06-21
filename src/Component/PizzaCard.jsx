import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Paper, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PizzaCard({ order, refresh ,setRefresh }) {
  const classes = useStyles();
 
  const handleOrderStatusChange = (id, status , email) => {
    console.log(email)
    setRefresh(true)
    fetch("https://pizza-planet-server.herokuapp.com/kitchen", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id ,
        status ,
        email : email
      }),
    }).then(res => res.json() ).then(data => {
      
    })

  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {order.order_id.slice(6)}
        </Typography>
        <Typography variant="h5" component="h2">
          Email: {order.email}
        </Typography>
        <Typography variant="h5" component="h2">
          Status: {order.status}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {order.orderedAt}
        </Typography>
        <Typography variant="h6" component="h4"  className={classes.pos} >
          Order Details:
        </Typography>
        <Grid container spacing={3}  className={classes.pos} >
          {order.orderDetails.map((ele) => (
            <Grid item md={4}>
              <Paper elevation={2}>
                <Typography>
                  Base : {ele.base} <br />
                  Sauce : {ele.sauce} <br />
                  Cheese : {ele.cheese} <br />
                  Veg : {ele.veg.join(", ")} <br />
                  Nonveg : {ele.nonveg.join(", ")} <br />
                  Quantity : {ele.quantity} <br />
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <DropdownButton
          alignLeft
          title="Update Order Status"
          id="dropdown-menu-align-right"
        >
          <Dropdown.Item
            eventKey="1"
            onClick={() => handleOrderStatusChange(order.order_id, "received" ,order.email)}
          >
            Received
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            onClick={() => handleOrderStatusChange(order.order_id, "preparing" ,order.email)}
          >
            Prepare Order
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            onClick={() => handleOrderStatusChange(order.order_id, "dispached" ,order.email)}
          >
            Send For Delivery
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="4"
            onClick={() => handleOrderStatusChange(order.order_id, "delivered" ,order.email)}
          >
            Delivered
          </Dropdown.Item>
        </DropdownButton>
      </CardContent>
    </Card>
  );
}
