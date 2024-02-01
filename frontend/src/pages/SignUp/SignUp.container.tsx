import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "src/utils/axios";

import SignUpView from "./SignUp.view";
import { initialValues, IValues } from "./SignUp.consts";
import { useSnackbar } from "src/hooks/useSnackbar";
import { UserContext } from "src/providers/UserProvider";

const SignUpContainer = () => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (values: IValues) => {
    const { name, email, password, role } = values;
    setLoading(true);

    try {
      const result = await axios.post("auth/signup", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("token", result.data.accessToken);

      const meResult = await axios.get("auth/me");
      setUserData(meResult.data);
      showSnackbar("success", "Signed up successfully!");
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.message) {
        showSnackbar("error", error.response?.data?.message);
      }
      setLoading(false);
    }
  };

  return (
    <SignUpView
      onSubmit={onSubmit}
      initialValues={initialValues}
      loading={loading}
    />
  );
};

export default SignUpContainer;
