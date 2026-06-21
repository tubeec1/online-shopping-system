import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiHome,
  FiPackage,
  FiCreditCard,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  let cartCount = cartItems.length || 0;
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // ✅ FIXED: no width shifting anymore
  const navLinkClasses = ({ isActive }) =>
    `relative text-sm font-medium pb-1 transition-colors duration-300 ${
      isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
    } after:pointer-events-none after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:transition-opacity after:duration-300 ${
      isActive ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-100"
    }`;

  const mobileLinkClasses = ({ isActive }) =>
    `flex items-center gap-4 text-base font-medium px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "text-orange-500 bg-orange-100"
        : "text-gray-700 hover:text-orange-500 hover:bg-gray-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 border-b ${
        isScrolled ? "shadow-md h-[10vh]" : ""
      }`}
    >
      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/50 z-[55] md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-[60] transform transition-transform duration-300 ease-in-out md:hidden border-r ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <FiShoppingCart className="text-orange-500 text-2xl" />
            <span className="text-slate-800 text-xl font-bold tracking-tight">
              Miro Market
            </span>
          </Link>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="text-gray-500 hover:text-black transition-colors p-1"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        <nav className="p-4 flex flex-col h-full overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={mobileLinkClasses}
              >
                <FiHome className="w-5 h-5" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                onClick={closeMenu}
                className={mobileLinkClasses}
              >
                <FiPackage className="w-5 h-5" />
                <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                onClick={closeMenu}
                className={mobileLinkClasses}
              >
                <FiShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/checkout"
                onClick={closeMenu}
                className={mobileLinkClasses}
              >
                <FiCreditCard className="w-5 h-5" />
                <span>Checkout</span>
              </NavLink>
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t">
            {token && user ? (
              <>
                {(user.role_id === 1 || user.role_id === 2) && (
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/my-profile"
                  onClick={closeMenu}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className={mobileLinkClasses}
                >
                  <FiLogIn className="w-5 h-5" />
                  <span>Login</span>
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={closeMenu}
                  className={mobileLinkClasses}
                >
                  <FiUserPlus className="w-5 h-5" />
                  <span>Signup</span>
                </NavLink>
              </>
            )}
          </div>

          <div className="mt-auto pt-6 border-t">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center justify-center gap-3 w-full text-white bg-orange-500 hover:bg-orange-600 text-base font-medium py-3 rounded-lg transition-colors duration-200"
            >
              <FiUser className="w-5 h-5" />
              <span>My Account</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <FiShoppingCart className="text-orange-500 text-2xl" />
          <span className="text-slate-800 text-xl font-bold tracking-tight">
            Miro Market
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <NavLink to="/" end className={navLinkClasses}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={navLinkClasses}>
                Products
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/cart"
            className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
          >
            <FiShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-orange-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/checkout"
            className="p-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
          >
            <FiCreditCard className="text-xl" />
          </Link>

          <Link
            to="/login"
            className="p-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
          >
            <FiUser className="text-xl" />
          </Link>

          {token && user ? (
            <div className="relative ml-3">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center"
              >
                <img
                  src={
                    user?.profile_image
                      ? `http://localhost/online-shopping-system/backend/public/${user.profile_image}`
                      : "https://ui-avatars.com/api/?name=" + user?.full_name
                  }
                  alt={user?.full_name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user?.full_name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  {(user?.role_id === 1 || user?.role_id === 2) && (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                  )}

                  <Link
                    to="/my-profile"
                    className="block px-4 py-3 hover:bg-gray-50"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2 border-l pl-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:border-orange-500 hover:text-orange-500"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-gray-700 hover:text-orange-500 transition-colors duration-200 p-2"
        >
          <FiMenu className="text-2xl" />
        </button>
      </div>
    </header>
  );
};

export default PublicHeader;
