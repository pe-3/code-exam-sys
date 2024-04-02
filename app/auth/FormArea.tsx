'use client';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CodeOpt } from "./components/CodeOpt";
import SendCodeBtn from "./components/SendCodeBtn";
import { loginOrCreateByCode } from "@/sql/user/actions";
import { useToast } from "@chakra-ui/react";
import UiToast, { EToastType } from "./components/Toast";
import { setTokenInCookie } from "../token";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FormArea = ({
  initDate
}: {
  initDate: Date;
}) => {
  const toast = useToast({
    position: 'top-right',
    duration: 3000
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    const formData = new FormData(e.target);

    if (!formData.get('email') || !formData.get('code')) {
      return toast({
        render: () => (
          <UiToast
            title="请输入邮箱和验证码"
            description="请检查你的邮箱和验证码是否正确"
            type={EToastType.Error}
          />
        )
      })
    }
    
    const { 
      isVerifyed,
      isCreated,
      isLogined,
      user
    } = await loginOrCreateByCode(formData);

    if (!isVerifyed) {
      return toast({
        render: () => (
          <UiToast
            title="验证码错误"
            description="请检查你的验证码是否正确。或者，你的验证码失效了"
            type={EToastType.Error}
          />
        )
      })
    }

    if (!isCreated && !isLogined) {
      return toast({
        render: () => (
          <UiToast
            title="注册失败"
            description="请检查你的验证码是否正确。或者，你的验证码失效了"
            type={EToastType.Error}
          />
        )
      })
    }

    user && (await setTokenInCookie(user));

    if (isCreated) {
      toast({
        render: () => (
          <UiToast
            title="注册成功"
            description="欢迎使用码测，你的初始密码为你的注册验证码。接下来请选择你的角色。"
            type={EToastType.Success}
          />
        )
      });
    }

    const { role, nickname } = user || {};
    
    if (!role) {
      router.push('/role');
      toast({
        // 选取角色提示
        render: () => (
          <UiToast
            title="选取角色"
            description="请选择你的角色"
            type={EToastType.Success}
          />
        )
      })
      return;
    }

    if (!nickname) {
      console.log('触发了');
      router.push('/profile');
      toast ({
        // 完善信息提示
        render: () => (
          <UiToast
            title="完善信息"
            description="请完善你的信息"
            type={EToastType.Success}
          />
        )
      });
      return;
    }

    if (isLogined) {
      toast({
        render: () => (
          <UiToast
            title="登录成功"
            description="欢迎回来"
            type={EToastType.Success}
          />
        )
      });
    }
  }

  // 如果是重定向过来，提醒用户登录过期，请重新登录
  const search = useSearchParams();

  useEffect(() => {
    const expired = search.get('expired');
    if (expired) {
      toast({
        render: () => (
          <UiToast
            title="登录过期"
            description="私密马赛，请重新登录!!!!"
            type={EToastType.Error}
          />
        )
      });
      // 替换掉 expired
      router.replace('/auth');
    }
  }, [])

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          电子邮件
        </label>
        <Input className="mt-1" id="email" name="email" placeholder="m@example.com" type="email" />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700" htmlFor="code">
          验证码
        </label>
        <div className="flex justify-between mt-1">
          <CodeOpt name="code"/>
          <SendCodeBtn initDate={initDate} />
        </div>
      </div>
      <Button className="w-full  text-white">登录 / 注册</Button>
  </form>
  )
}

export default FormArea;