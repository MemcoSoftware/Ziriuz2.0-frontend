import React from "react";
import { useLocation } from "react-router-dom";
import UpdatePasswordForm from "../components/forms/UpdatePasswordForm";

const UpdatePasswordPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  return (
    <div>
      
      <UpdatePasswordForm email={email} />
    </div>
  );
};

export default UpdatePasswordPage;
