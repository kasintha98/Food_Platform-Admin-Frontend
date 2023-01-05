import React, { useEffect, useState } from "react"
const PaytmChecksum = require('./paytmChecksum');
const https = require('https');

export function PaytmButton () {

    const [paymentData, setPaymentData] = useState({
        token: "", 
        order: "", 
        mid: "",
        amount: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = () => {
        let orderId = 'Order_'+new Date().getTime();

        // Credentials : This data is available at Paytm dashboard --> Developer settings --> API Keys
        let mid = "IDpKGL25244605401004";     // Add Sandbox or PROD Merchant ID here
        let mkey = "ctdEopzTwFfg8kJP";  // Add Sandbox or PROD Merchant Key here
        var paytmParams = {};

        paytmParams.body = {
          "requestType"  : "Payment",
          "mid"      : mid,
          "websiteName"  : "WEBSTAGING",  // WEBSTAGING for Sandbox and DEFAULT for PROD
          "orderId"    : orderId,
          "callbackUrl"  : "add callback url here",  // Here you can put your callback url where Transaction response will come
          "txnAmount"   : {
            "value"   : "1.00",   //  Assign Dynamic value here as per product
            "currency" : "INR",
          },
          "userInfo"   : {
            "custId"  : '1001', // Assign dynamic customer id
          }
        };

        PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey).then(function(checksum){
            console.log(checksum);
            
          paytmParams.head = {
            "signature" : checksum
          };

          var post_data = JSON.stringify(paytmParams);

          var options = {
            /* for Staging */
            hostname: 'securegw-stage.paytm.in',  // Sandbox Testing URL

            /* for Production */
                // hostname: 'securegw.paytm.in',  // LIVE URL

            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': post_data.length
            }
          };

          var response = "";
          var post_req = https.request(options, function(post_res) {
            post_res.on('data', function (chunk) {
              response += chunk;
            });
                post_res.on('end', function(){
              console.log('Response: ', response);
                    // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
                    setPaymentData({
                        ...paymentData,
                        token: JSON.parse(response).body.txnToken, 
                        order: orderId, 
                        mid: mid,
                        amount: 100     // Assign dynamic cost of product here
                    })
            });
          });

          post_req.write(post_data);
          post_req.end();
        });
    }

    const makePayment = () => {
        setLoading(true);
        var config = {
            "root":"",
            "style": {
              "bodyBackgroundColor": "#fafafb",
              "bodyColor": "",
              "themeBackgroundColor": "#0FB8C9",
              "themeColor": "#ffffff",
              "headerBackgroundColor": "#284055",
              "headerColor": "#ffffff",
              "errorColor": "",
              "successColor": "",
              "card": {
                "padding": "",
                "backgroundColor": ""
              }
            },
            "data": {
              "orderId": paymentData.order,
              "token": paymentData.token,
              "tokenType": "TXN_TOKEN",
              "amount": paymentData.amount /* update amount */
            },
            "payMode": {
              "labels": {},
              "filter": {
                "exclude": []
              },
              "order": [
                  "CC",
                  "DC",
                  "NB",
                  "UPI",
                  "PPBL",
                  "PPI",
                  "BALANCE"
              ]
            },
            "website": "WEBSTAGING",
            "flow": "DEFAULT",
            "merchant": {
              "mid": paymentData.mid,
              "redirect": false           // Handle Callback Url redirect from here. If false : response will come in handler below. If True Response will be sent to callback url
            },
            "handler": {
              "transactionStatus":function transactionStatus(paymentStatus){
                //debugger; 
                // For manual handing
                console.log("paymentStatus => ",paymentStatus);
                if(paymentStatus.STATUS === "TXN_SUCCESS"){
                  // Do the page redirectional logic manually
                  alert("Transaction Successful. Bank name :" + paymentStatus.BANKNAME + " and transaction id: " + paymentStatus.BANKTXNID);
                }else{
                  // Handle Error logic manually
                  alert("Transaction Unsuccessful. Bank name :" + paymentStatus.BANKNAME + " and transaction id: " + paymentStatus.BANKTXNID);
                }
                
                setLoading(false);
              },
              "notifyMerchant":function notifyMerchant(eventName,data){
                //debugger;
                console.log("Closed");
                setLoading(false);
              }
            }
        };

        console.log();
      
        if (window.Paytm && window.Paytm.CheckoutJS) {
        // initialze configuration using init method
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            console.log('Before JS Checkout invoke');
            // after successfully update configuration invoke checkoutjs
            window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
            console.log("Error => ", error);
        });
        }
    }

    return (
        <div>
            {
                loading ? (
                    <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
                ) : (
                    <button onClick={makePayment}>Test Payment</button>
                )
            }
        </div>
    )
}