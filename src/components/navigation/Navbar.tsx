import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <nav className="w-full border-b bg-white fixed top-0 left-0 right-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
                    <div className="flex-shrink-0 font-bold text-base sm:text-lg md:text-xl flex items-center gap-2"
                         onClick={() => navigate(isAuthenticated ? '/dashboard' : '/auth')}
                         style={{ cursor: 'pointer' }}
                    >
                        <img
                            src="../src/assets/oggetto.png"
                            className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                            alt="logo"
                        />
                        <span className="hidden sm:inline">Challenge Arena</span>
                    </div>

                    <div className="hidden md:flex items-center gap-3 lg:gap-4">
                        {isAuthenticated && (
                            <>
                                <Button
                                    className="bg-black text-white hover:text-black hover:bg-white text-sm lg:text-base"
                                    onClick={() => navigate('/spaces')}
                                >
                                    Пространства
                                </Button>
                            </>
                        )}
                        <Button
                            className="bg-black text-white hover:text-black hover:bg-white text-sm lg:text-base"
                            onClick={() => navigate('/about')}
                        >
                            О платформе
                        </Button>
                        {isAuthenticated && (
                            <Avatar
                                className="h-8 w-8 lg:h-10 lg:w-10 cursor-pointer transition-transform hover:scale-105"
                                onClick={() => navigate('/profile')}
                            >
                                <AvatarFallback>И</AvatarFallback>
                            </Avatar>
                        )}
                    </div>

                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-black text-white hover:text-black hover:bg-white p-2">
                                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white text-black shadow-lg w-48" align="end">
                                {isAuthenticated && (
                                    <DropdownMenuItem onClick={() => navigate('/spaces')}>
                                        Пространства
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => navigate('/about')}>
                                    О платформе
                                </DropdownMenuItem>
                                {isAuthenticated && (
                                    <>
                                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                                            Профиль
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>
                                            Выйти
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};
