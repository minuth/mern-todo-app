import { useContext, useState } from "react";
import TokenContext from "../context/token.context";
import useUserApi from "./api/use-user-api";

export default function useLogin() {
  const [formData, setFormData] = useState({});
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
  const [error, setError] = useState();
  const userApi = useUserApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await userApi.login(formData);
      tokenDispatch({ type: "SET_TOKEN", payload: data.token });
      userDispatch({ type: "SET_USER", payload: data.user });
      localStorage.setItem("authToken", JSON.stringify(data.token));
    } catch (error) {
      console.log(error);
      setError({ message: error.response.data.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return { handleChange, error, userToken, handleSubmit };
}
