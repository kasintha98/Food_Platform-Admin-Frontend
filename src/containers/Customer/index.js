import React from "react";
import Layout from "../NewLayout";

export const Customer = () => {

  var htmlCustomerDataIframe = '<iframe width="100%" height="800" src="https://datastudio.google.com/embed/reporting/5c92ed2a-3233-41e0-8848-470f4d277654/page/w679C" frameborder="0" style="border:0" allowfullscreen></iframe>';

  return (
    <Layout sidebar headerTitle="Customer">
      <div style={{maxWidth:'100%',maxHeight:'1068px',minWidth:800}}>
        <div className="content" dangerouslySetInnerHTML={{__html: htmlCustomerDataIframe}}></div>
      </div>
    </Layout>
  );
};
