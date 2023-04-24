import { useState } from "react";
import Layout from "../NewLayout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import qrcodepic from "../../img/qrcode-img.jpeg";
import { saveAs } from "file-saver";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { toast } from "react-toastify";

const QRgenerator = () => {
  const stores = useSelector((state) => state.store.stores);

  const [storeId, setStoreId] = useState("");
  const [tableId, setTableId] = useState("");
  const [displayqr, setDisplayqr] = useState(false);
  const [downloadqr, setDownloadqr] = useState(true);
  console.log("aaa ", storeId, tableId);

  const qrcode = `https://api.qrserver.com/v1/create-qr-code/?data=https://www.hangries.in/?QRcode=true%26storeId=${storeId}%26restaurantId=R001%26tableId=${tableId}&amp;size=250x250`;

  const handleDownload = (qr) => {
    saveAs(qr, "qrcode.png");
    setTableId("");
    setStoreId("");
    setDisplayqr(false);
    setDownloadqr(true);
  };

  const handlegenQR = () => {
    setDisplayqr(true);
    setDownloadqr(false);
    toast.success("QR Code Generated Successfully!");
  };

  // console.log("aaa qrcode", qrcode);

  return (
    <Layout sidebar headerTitle="QR Generator" classes={{}}>
      <div>
        <Container fluid style={{ backgroundColor: "lightgray" }}>
          <Row style={{ minHeight: "85vh" }}>
            <Col sm={5}>
              <img
                src={qrcodepic}
                alt="qrcode"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col
              sm={7}
              style={{
                backgroundColor: "#454545",
              }}
            >
              <h2
                style={{
                  margin: "20px 0",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                QR CODE GENERATOR
              </h2>
              <Row
                style={{
                  backgroundColor: "lightgray",
                  margin: "10px",
                  padding: "15px",
                }}
              >
                <Col sm={8}>
                  <Row className="justify-content-end">
                    <Col>
                      <div class="form-group row">
                        <label
                          for="colFormLabel"
                          class="col-sm-4 col-form-label"
                        >
                          Resurant Name
                        </label>
                        <div class="col-sm-8" style={{ textAlign: "center" }}>
                          <label
                            for="colFormLabel"
                            class="col-sm-2 col-form-label"
                            style={{
                              paddingLeft: 0,
                              color: "red",
                              fontSize: "1.3rem",
                              fontWeight: "600",
                            }}
                          >
                            HANGRIES
                          </label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="colFormLabel"
                          class="col-sm-4 col-form-label"
                        >
                          Select Store
                        </label>
                        <div class="col-sm-8">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            style={{
                              backgroundColor: "#fff",
                              width: "100%",
                              padding: "0.6em",
                            }}
                            value={storeId}
                            onChange={(e) => setStoreId(e.target.value)}
                          >
                            <option value="">Select a Store</option>
                            {stores.map((store) => (
                              <option value={store.storeId}>
                                {store.resturantName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="colFormLabel"
                          class="col-sm-4 col-form-label"
                        >
                          Enter Table No
                        </label>
                        <div class="col-sm-8">
                          <input
                            type="email"
                            class="form-control"
                            id="colFormLabel"
                            onChange={(e) => setTableId(e.target.value)}
                            value={tableId}
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="colFormLabel"
                          class="col-sm-4 col-form-label"
                        >
                          QR URL
                        </label>
                        <div class="col-sm-8">
                          <input
                            type="email"
                            class="form-control"
                            id="colFormLabel"
                            disabled
                            value={
                              storeId && tableId
                                ? `https://www.hangries.in/?QRcode=true&storeId=${storeId}&restaurantId=R001&tableId=${tableId}`
                                : ""
                            }
                          />
                        </div>
                      </div>
                      <div
                        class="form-group row"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="success"
                          disabled={!storeId || !tableId}
                          onClick={handlegenQR}
                        >
                          GENERATE QR CODE
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm={4}>
                  <div>
                    {!displayqr ? (
                      <div style={{ height: "250px" }}>
                        <QrCodeScannerIcon
                          style={{
                            display: "flex",
                            margin: "auto",
                            fontSize: "200px",
                          }}
                        />
                        <h6 style={{ textAlign: "center" }}>
                          QR will be display here
                        </h6>
                      </div>
                    ) : (
                      <img id="qr-code" src={qrcode} alt="" title="" />
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        onClick={() => handleDownload(qrcode)}
                        variant="info"
                        disabled={downloadqr}
                      >
                        DOWNLOAD QR CODE
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default QRgenerator;
