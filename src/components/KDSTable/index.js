import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./style.css";

export const KDSTable = (props) => {
  const filterByCounter = (orders, counter) => {
    if (counter) {
      for (let i = 0; i < orders.length; i++) {
        orders[i].items = orders[i].items.filter(function (el) {
          return el.counter === counter;
        });
      }

      orders = orders.filter(function (el) {
        return el.items.length > 0;
      });
    }

    return orders;
  };

  return (
    <div className="mt-0">
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          {/* <TableRow sx={{ backgroundColor: "#203764" }}>
            <TableCell
              component="th"
              scope="row"
              colspan="5"
              sx={{ color: "#fff" }}
            >
              <span style={{ fontWeight: "bold" }}>Date:</span> 16-May-2022
              &nbsp;{" "}
              <span style={{ fontWeight: "bold" }}>Restaurant Name:</span>{" "}
              Hangries, Yamunagar
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              colspan="3"
              sx={{ color: "#fff" }}
            >
              # of Pending Orders: 3
            </TableCell>
          </TableRow> */}
          <TableRow
            sx={{
              backgroundColor: "#595959",
            }}
          >
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Order Id
            </TableCell>
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Time
            </TableCell>
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Order Type
            </TableCell>
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Order Info
            </TableCell>
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Customer Name
            </TableCell>
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Item Name
            </TableCell>
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Qty.
            </TableCell>
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Remarks
            </TableCell>
            <TableCell
              sx={{ color: "#fff", border: "1px solid #fff" }}
              align="center"
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterByCounter(props.orders, props.counter).map((order) => (
            <TableRow>
              <TableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.orderId}
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.time}
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #000" }}>
                Web
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.orderInfo}
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.customerName}
              </TableCell>
              <TableCell align="left" sx={{ border: "1px solid #000" }}>
                {order.items.map((item) => (
                  <>
                    {item.itemName}
                    {item.choice ? (
                      <>
                        <br></br>
                        {/* <hr></hr> */}
                        {item.choice.map((ch) => (
                          <p
                            style={{
                              color: "red",
                              paddingLeft: "1em",
                              margin: 0,
                            }}
                          >
                            {ch.itemName}
                          </p>
                        ))}
                      </>
                    ) : null}

                    {item.extra ? (
                      <>
                        {item.extra.map((ch) => (
                          <p
                            style={{
                              color: "red",
                              paddingLeft: "1em",
                              margin: 0,
                            }}
                          >
                            {ch.itemName}
                          </p>
                        ))}
                      </>
                    ) : null}
                    <br></br>
                    {/* <hr></hr> */}
                  </>
                ))}
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.items.map((item) => (
                  <>
                    {item.qty}
                    {item.choice ? (
                      <>
                        <br></br>
                        {/* <hr></hr> */}
                        {item.choice.map((ch) => (
                          <p style={{ margin: 0 }}>{ch.qty}</p>
                        ))}
                      </>
                    ) : null}

                    {item.extra ? (
                      <>
                        {item.extra.map((ch) => (
                          <p style={{ margin: 0 }}>{ch.qty}</p>
                        ))}
                      </>
                    ) : null}
                    <br></br>
                    {/* <hr></hr> */}
                  </>
                ))}
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.items.map((item) => (
                  <>
                    {item.remarks}
                    {item.choice ? (
                      <>
                        <br></br>
                        {/* <hr></hr> */}
                        {item.choice.map((ch) => (
                          <p style={{ margin: 0 }}>{ch.remarks}</p>
                        ))}
                      </>
                    ) : null}

                    {item.extra ? (
                      <>
                        {item.extra.map((ch) => (
                          <p style={{ margin: 0 }}>{ch.remarks}</p>
                        ))}
                      </>
                    ) : null}
                    <br></br>
                    {/* <hr></hr> */}
                  </>
                ))}
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.items.map((item) => (
                  <div
                    className={
                      item.status === "FOOD READY" ||
                      item.status === "Completed"
                        ? "back-green"
                        : "back-orange"
                    }
                  >
                    {item.status}
                    {item.choice ? (
                      <>
                        <br></br>
                        {/* <hr></hr> */}
                        {item.choice.map((ch) => (
                          <p style={{ margin: 0 }}>
                            {ch.status} <br></br>
                          </p>
                        ))}
                      </>
                    ) : null}

                    {item.extra ? (
                      <>
                        <br></br>
                        {/* <hr></hr> */}
                        {item.extra.map((ch) => (
                          <p style={{ margin: 0 }}>
                            {ch.status} <br></br>
                          </p>
                        ))}
                      </>
                    ) : null}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
