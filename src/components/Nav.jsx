/* eslint-disable react/prop-types */
import Search from "./Search";
// This component is the navbar
import Login_in_out from "./Login_in_out";

const Nav = ({keyWord, setKeyWord}) => {
  return (
    <div className="fixed z-10 flex flex-col items-center justify-between w-full px-10 py-5 text-white md:flex-row bg-slate-950 poppins">
      <div
        id="logo"
        className="text-sm italic font-bold cursor-pointer md:text-lg poppins"
      >
        ImageGallery
      </div>

      {/* The Search Bar and the results it gives */}
      <Search keyWord={keyWord} setKeyWord={setKeyWord}/>

      {/* Login Button that shows whether we are logged in or not */}
      <Login_in_out />
    </div>
  );
};

export default Nav;
