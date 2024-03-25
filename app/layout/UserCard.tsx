'use clinet';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pKJ3ELhQPLD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { useRouter } from "next/navigation";

export default function UserCard() {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-4 bg-white p-4 shadow mb-1 cursor-pointer" onClick={() => {
      router.push('/profile');
    }}>
      <Avatar>
        <AvatarImage alt="User profile picture" src="/placeholder.svg?height=40&width=40" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-semibold text-gray-900">敏感与漏见</div>
        <div className="text-xs text-gray-500">example@email.com</div>
      </div>
    </div>
  )
}

