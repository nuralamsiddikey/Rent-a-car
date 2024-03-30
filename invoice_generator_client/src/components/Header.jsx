import { NavLink, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate()
  return (
    <div >
      <div className="navbar bg-base-300 rounded-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Car list</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">XYZ rental Ltd.</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">CAR LIST</NavLink>
            </li>
            <li>
              <NavLink to="/history">HISTORY</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
        <button className="btn btn-primary" onClick={()=> navigate("/rent")}>Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
