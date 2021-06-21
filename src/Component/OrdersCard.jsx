import React, { useEffect, useState } from "react";
import PizzaCard from "./PizzaCard";
import { Paper, makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
const useStyles = makeStyles( theme => ({
  pos: {
    marginBottom: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

function OrdersCard() {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    fetch("https://pizza-planet-server.herokuapp.com/kitchen")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
        setRefresh(false);
      });
  }, [refresh]);
  const [orders, setOrders] = useState([]);

  return (
    <>
        <Backdrop className={classes.backdrop} open={refresh}>
          <CircularProgress color="inherit" />
        </Backdrop>
      
      {orders
        .sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt))
        .map((order) => (
          <Paper elevation={3} className={classes.pos} key={order.order_id}>
            <PizzaCard
              order={order}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          </Paper>
        ))}
    </>
  );
}

export default OrdersCard;
