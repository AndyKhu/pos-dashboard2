"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { Mail, Menu, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type THeaderProps = {
  toggleCollapse: ()=> void
}
const Header = ({toggleCollapse}:THeaderProps) => {
  const {data:session} = useSession()
  return (
    <header className="h-[70px] flex items-center justify-between shadow-sm px-6 bg-white text-gray-600  dark:bg-neutral-900 dark:text-white ">
        <Button size="icon" variant="ghost" onClick={toggleCollapse}>
          <Menu size={24}/>
        </Button>
        <div className="flex space-x-3 items-center">
          <ThemeSwitcher/>
          <DropdownMenu>
            <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session?.user.profile.img} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={18}>
              <div className="flex flex-col p-8">
                <h5 className="font-semibold text-lg text-gray-700 dark:text-white">User Profile</h5>
                <div className="flex items-center py-6">
                  <Avatar size="profile">
                    <AvatarImage src={session?.user.profile.img} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 text-sm">
                    <h6 className="font-semibold">{session?.user.profile.name}</h6>
                    <h6>{session?.user.profile.job}</h6>
                    <h6>
                      <Mail className="inline-block mr-2"/>
                      {session?.user.profile.email}
                    </h6>
                  </div>
                </div>
                <DropdownMenuSeparator/>
                <Link href="/">
                  <div className="py-4 flex items-center group">
                    <div className="flex items-center justify-center h-11 w-11 bg-blue-100 dark:bg-neutral-900 rounded">
                      <User/>
                    </div>
                    <div className="ml-4 text-sm">
                      <h6 className="font-semibold group-hover:text-blue-500">My Profile</h6>
                      <h6>Account Settings</h6>
                    </div>
                  </div>
                </Link>
                <Button className="my-4" onClick={()=>signOut()}>Logout</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  );
}

export default Header;