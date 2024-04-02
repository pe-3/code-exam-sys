'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3nC5EHE1ndG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { CardFooter, Card, CardDescription, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import UiToast, { EToastType } from "../auth/components/Toast";
import { UserRole } from "@/sql/user/user.type";
import { selectRole } from "@/sql/user/actions";
import { useRouter } from "next/navigation";

const roleRouterPath = {
  '学生': '/student',
  '老师': '/teacher',
  '管理员': '/admin'
}

// 新建一个 UserCard 组件
const UserCard = ({ role, imageSrc, placeholder }: {
  role: '学生' | '老师' | '管理员';
  imageSrc: any;
  placeholder: any;
}) => {
  // 1. toast
  const toast = useToast({
    position: 'top-right',
    duration: 3000
  });
  const router = useRouter();

  // 1. 角色ID，学生是学号、老师是授权码
  const [roleId, setRoleId] = useState('');
  // 2. 选择角色
  const handleSelect = async () => {
    if (!roleId) {
      // 提示
      toast({
        render: () => (
          <UiToast
            title="请输入对应ID"
            description={<>
              输入 <strong>{role === '学生' ? '学生ID' : '授权码'}</strong> 以访问 <strong>{role}</strong> 特定功能。
            </>}
            type={EToastType.Error}
          />
        )
      })
      return;
    }
    // 3. 拿到 roleId, role
    const roleValues = {
      '学生': UserRole.Student,
      '老师': UserRole.Teacher,
      '管理员': UserRole.Admin
    };
    const roleValue = roleValues[role];
    // 4. 选择角色
    const isSelected = await selectRole({
      role: roleValue,
      roleId
    });

    // 5. 提示
    if (isSelected) {
      toast({
        render: () => (
          <UiToast
            title="选择成功"
            description={`你已成功选择${role}角色`}
            type={EToastType.Success}
          />
        )
      });
      return router.push(roleRouterPath[role] || '/');
    } else {
      toast({
        render: () => (
          <UiToast
            title="选择失败"
            description={`你选择${role}角色失败`}
            type={EToastType.Error}
          />
        )
      })
    }
  }
  return (
    <div className="flex items-center m-2" style={{ width: '280px' }}>
      <Card className="w-full max-w-sm">
        <CardHeader className="grid gap-2 place-content-center">
          <Image
            alt={role}
            className="rounded-full aspect-[1/1] margin-auto object-cover"
            height={200}
            src={imageSrc}
            width={200}
          />
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm font-medium">角色</p>
            <h3 className="text-2xl font-bold">{role}</h3>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <CardDescription>{`输入${role === '学生' ? '学生ID' : '授权码'}以访问${role}特定功能。`}</CardDescription>
            <Input className="max-w-xs w-full" placeholder={placeholder} onChange={({ target: { value } }) => setRoleId(value)} />
          </div>
        </CardHeader>
        <CardFooter>
          <Button className="w-full  text-white" onClick={handleSelect}>选择</Button>
        </CardFooter>
      </Card>
    </div>
  )
};

// 在主组件中使用 UserCard
export default function Component() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-wrap p-6">
      <UserCard role="学生" imageSrc="/student.png" placeholder="学生ID" />
      <UserCard role="老师" imageSrc="/teacher.png" placeholder="授权码" />
      <UserCard role="管理员" imageSrc="/admin.png" placeholder="授权码" />
    </div>
  );
}
