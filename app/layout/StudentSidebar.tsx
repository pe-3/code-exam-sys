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
const menuListForTeacher = [
  {
    name: '概览',
    icon: LayoutDashboardIcon,
    href: '/teacher',
  },
  {
    name: '管理考试',
    icon: ArrowUpIcon,
    href: '/teacher/exam-list'
  },
  {
    name: '学生成绩',
    icon: CircleIcon,
    href: '/teacher/mark-exam'
  },
  {
    name: '个人信息',
    icon: UserIcon,
    href: '/teacher/profile'
  }
];

const menuListForStudent = [
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
    name: '个人信息',
    icon: UserIcon,
    href: '/student/profile'
  }
];

export default function SideBar({
  forWhat
}: {
  forWhat?: 'student' | 'teacher'
}) {
  const pathname = usePathname();

  const menuList = forWhat !== 'teacher' ? menuListForStudent : menuListForTeacher;

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
      <div className="absolute inset-x-0 bottom-0 cursor-pointer">
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
