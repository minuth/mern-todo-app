export default function useLogout() {
  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return { logout };
}
