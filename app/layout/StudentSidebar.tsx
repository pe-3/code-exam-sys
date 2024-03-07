/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dEpvseR5PMG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { usePathname } from "next/navigation";
import UserCard from "./UserCard"
import Link from "next/link";
import { ArrowUpIcon, CircleIcon, LayoutDashboardIcon, MailboxIcon, StarIcon, UserIcon, LogOutIcon } from "./icons";

// 定义菜单项的配置数组
const menuList = [
  {
    name: '概览',
    icon: LayoutDashboardIcon,
    href: '/student',
  },
  {
    name: '考试列表',
    icon: ArrowUpIcon,
    href: '/student/exam-list'
  },
  {
    name: '成绩汇总',
    icon: StarIcon,
    href: '/student/grades'
  },
  {
    name: '我的课程',
    icon: MailboxIcon,
    href: '/student/courses'
  },
  {
    name: '个人资料',
    icon: UserIcon,
    href: '/student/profile'
  },
  {
    name: '帮助与支持',
    icon: CircleIcon,
    href: '/student/help'
  }
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 relative h-full border-r border-gray-100">
      <UserCard />
      <div className="flex flex-col">
        {menuList.map((item, index) => (
          <Link
            key={index}
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              pathname === item.href ? 'bg-black text-white' : 'hover:bg-gray-300 hover:text-white'
            }`}
            href={item.href}
          >
            <item.icon className="w-6 h-6" />
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Link
          className="flex items-center justify-center px-4 py-3 text-sm font-medium bg-black text-white"
          href="/"
        >
          <LogOutIcon className="w-6 h-6" />
          <span className="ml-3">退出登录</span>
        </Link>
      </div>
    </div>
  )
}
