import React from "react";
import { StyleSheet, View } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import Navigator from "./Navigator";

const Layout = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({});

export default Layout;
