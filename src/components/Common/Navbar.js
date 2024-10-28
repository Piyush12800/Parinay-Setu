import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { getLink } from '../../services/operations/authAPi'; // Adjust import path if necessary
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const [link, setLink] = useState('');

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const fetchedLink = await getLink();
        console.log("Fetched link:", fetchedLink);
        if (fetchedLink) {
          setLink(fetchedLink);
        }
      } catch (error) {
        console.error("Error fetching link:", error);
        toast.error("Failed to fetch translation link");
      }
    };
    fetchLink();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const getNavItemClass = (path) => {
    return matchRoute(path)
      ? "shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-[15px] bg-white py-3.5 px-6 text-red justify-center"
      : "hover:text-red";
  };

  return (
    <div className="flex flex-col min-[769px]:flex-row justify-center items-center bg-khaki-100 py-4 min-[769px]:pr-24 min-[769px]:pl-7 rounded-b-[30px] sm:rounded-[30px] mx-auto sm:my-4 w-11/12 min-[769px]:w-[calc(100%_-_214px)] p-4">
      <div className="flex flex-col min-[769px]:flex-row justify-between items-center w-full">
        <div className="flex flex-col items-center min-[769px]:items-start">
          <p className="text-3xl sm:text-45xl font-niconne m-0">Parinay</p>
          <p className="text-2xl sm:text-37xl text-red font-niconne m-0 mt-[-10px] sm:mt-[-20px] sm:ml-[150px]">Setu</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-16 text-lg sm:text-xl mt-4 sm:mt-0">
          <div className={getNavItemClass("/")}>
            <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          </div>
          <div className={getNavItemClass("/sub")}>
            <Link to='/sub' style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</Link>
          </div>
          <div className={getNavItemClass("/contact")}>
            <Link to='/contact' style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</Link>
          </div>
          {token === null && (
            <>
              <div className={getNavItemClass("/login")}>
                <Link to='/login' style={{ color: 'inherit', textDecoration: 'none' }}>Log In</Link>
              </div>
              <div className={getNavItemClass("/signup")}>
                <Link to='/signup' style={{ color: 'inherit', textDecoration: 'none' }}>Sign Up</Link>
              </div>
            </>
          )}
          {token !== null && <ProfileDropdown />}
          <div className="shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-[15px] bg-white py-3.5 px-6 text-red justify-center">
            <Link to={link} target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>
              Translate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
