import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";

import HomePage from "./pages/Home";
import AddCompanyPage from "./pages/AddCompany";
import EmployeesListPage from "./pages/EmployeesList";
import GeneratedEmailPage from "./pages/GeneratedEmail";

import Header from "./components/Header";
import Footer from "./components/Footer";

// TODO:
// plug it in to add new company
// give notification when new company added
//* that page has a textarea with template email
// when we click on delete button company gets deleted
// when we click on edit button we go to edit page
// all above should have notification

const navigationMenuItems = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/addCompany",
    name: "Add Company"
  }
];

const App = () => {
  return (
    <Layout>
      <Header navigationMenuItems={navigationMenuItems} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/addCompany" component={AddCompanyPage} />
        <Route
          path="/employeesList/:company_id"
          component={EmployeesListPage}
        />
        <Route
          path="/generatedEmail/:name/:civilId"
          component={GeneratedEmailPage}
        />
      </Switch>
      <Footer />
    </Layout>
  );
};

export default App;
