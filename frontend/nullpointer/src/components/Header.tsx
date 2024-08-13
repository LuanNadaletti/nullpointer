import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="sticky w-full flex-none border-b border-gray-300">
            <div className="max-w-7xl mx-auto">
                <div className="py-2 px-8">
                    <div className="relative flex items-center md:justify-right justify-center mx-4">
                        <div className="w-3/6 hidden md:block">
                            <Link to="/" className="focus:outline-none">
                                <p className="text-xl font-bold">Nullpointer</p>
                            </Link>
                        </div>
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="relative border rounded-lg border-gray-300 p-4 h-5 w-96 text-sm text-slate-500 focus:outline-none pl-9" />
                            <IoMdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-2xl text-slate-500" />
                        </div>
                        <Link to="/login" className="focus:outline-none">
                            <button className="min-w-16 h-8 border rounded-md border-cyan-500 text-cyan-500 ml-3 text-xs hover:bg-cyan-100">Log in</button>
                        </Link>
                        <Link to="/signup" className="focus:outline-none">
                            <button className="min-w-16 h-8 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 ml-3 text-xs">Sign up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
