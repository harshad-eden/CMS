import { Card } from "antd";
import React from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="mt-16">
        <h2 className=" text-3xl text-center">Content Management System</h2>
        <div className="flex justify-center  mt-20 gap-8 flex-wrap">
          <Link to="/employer">
            <Card
              hoverable
              style={{
                width: 280,
                minHeight: 125,
                backgroundColor: "#f1f5f9",
                display: "grid",
                placeItems: "center",
              }}
            >
              <h2 className="text-lg text-center">Employer FAQ</h2>
            </Card>
          </Link>
          <Link to="/provider">
            <Card
              hoverable
              style={{
                width: 280,
                minHeight: 125,
                backgroundColor: "#f1f5f9",
                display: "grid",
                placeItems: "center",
              }}
            >
              <h2 className="text-lg text-center">Provider FAQ</h2>
            </Card>
          </Link>
          <Link to="/provider">
            <Card
              hoverable
              style={{
                width: 280,
                minHeight: 125,
                backgroundColor: "#f1f5f9",
                display: "grid",
                placeItems: "center",
              }}
            >
              <h2 className="text-lg text-center">Lorem</h2>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
