import React from "react";
import { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import TokenContext from "../context/token.context";
import useLogout from "../hook/use-logout";

function Header() {
  const { user } = useContext(TokenContext);
  const { logout } = useLogout();

  return (
    <div>
      <nav className="header bg-slate-200 flex justify-between items-center">
        <div className="logo w-1/4 text-center">
          <NavLink to="/">Todo App</NavLink>
        </div>
        <div className="flex justify-between">
          {user ? (
            <div className="flex items-center justify-center">
              <p className="mr-5">
                welcome,{" "}
                <span className=" text-xl text-blue-800 capitalize">
                  {user.name}
                </span>
              </p>
              <button onClick={logout} className="logout mr-4">
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex justify-end gap-3 w-3/4 pr-6">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;
