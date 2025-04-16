import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageUpload from "../noticeimage/imageupload/ImageUpload";
import AdminPage from "../Adminpage/AdminPage";

function Admin() {
  return (
      <div>
          <h1>Hello Admin</h1>
          <ImageUpload />
          <AdminPage />
      </div>
  );
}

export default Admin;
