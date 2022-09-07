import React from "react";
import { ForgotPasswordNew } from "../ForgotPasswordNew";
import Layout from "../NewLayout";

export const ForgotPasswordAdmin = () => {
  return (
    <Layout sidebar headerTitle="Password Reset">
      <ForgotPasswordNew></ForgotPasswordNew>
    </Layout>
  );
};
