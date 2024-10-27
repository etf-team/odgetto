import './App.css'
import { AuthProvider } from "@/context/AuthContext";
import {Outlet} from "react-router-dom";
import {Navbar} from "@/components/navigation/Navbar.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {UserProvider} from "@/context/UserContext.tsx";


function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <div className="min-h-screen bg-white font-montserrat">
                    <Navbar/>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[40px] sm:mt-[40px] md:mt-[40px]">
                        <Outlet/>
                    </div>
                </div>
                <Toaster />
            </UserProvider>
        </AuthProvider>
    );
}

export default App
