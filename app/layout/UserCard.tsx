/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pKJ3ELhQPLD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { getUserInfo } from "@/sql/user/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserCard() {
  const router = useRouter();

  const [user, setUser] = useState<any>({});
  
  useEffect(() => {
    getUserInfo().then(user => {
      setUser(user);
    }) 
  }, []);

  return (
    <div className="flex items-center space-x-4 bg-white p-4 shadow mb-1 cursor-pointer" onClick={() => {
      router.push('/student/profile');
    }}>
      <Avatar>
        <AvatarImage alt="User profile picture" src={user.avatar_url || "/placeholder.svg?height=40&width=40"} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-semibold text-gray-900">{user.first_name ? `${user.first_name}${user.last_name}` : '无名'}</div>
        <div className="text-xs text-gray-500">{user.email || 'loading...'}</div>
      </div>
    </div>
  )
}

