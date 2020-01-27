import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";

import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import EmployeesListPage from "./pages/EmployeesList";
import GeneratedEmailPage from "./pages/GeneratedEmail";

import Header from "./components/Header";
import Footer from "./components/Footer";

// initiate Authenticated Route component
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      window.netlifyIdentity && window.netlifyIdentity.currentUser() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const navigationMenuItems = [
  {
    path: "/Home",
    name: "Home"
  }
];

const App = () => {
  return (
    <Layout>
      <Header navigationMenuItems={navigationMenuItems} />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <AuthenticatedRoute path="/Home" component={HomePage} />
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
