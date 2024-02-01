import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "src/utils/axios";

import SignInView from "./SignIn.view";
import { initialValues, IValues } from "./SignIn.consts";
import { useSnackbar } from "src/hooks/useSnackbar";
import { UserContext } from "src/providers/UserProvider";

const SignInContainer = () => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (values: IValues) => {
    const { email, password } = values;
    setLoading(true);

    try {
      const result = await axios.post("auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", result.data.accessToken);

      const meResult = await axios.get("auth/me");
      setUserData(meResult.data);
      showSnackbar("success", "Signed in successfully!");
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.message) {
        showSnackbar("error", error.response?.data?.message);
      }
      setLoading(false);
    }
  };

  return (
    <SignInView
      onSubmit={onSubmit}
      initialValues={initialValues}
      loading={loading}
    />
  );
};

export default SignInContainer;
