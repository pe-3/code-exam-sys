'use client';

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { UserModel } from "@/sql/user/user.type";
import { uploadFile } from "@/utils/upload";
import { updateUserInfo } from "@/sql/user/actions";
import { useToast } from "@chakra-ui/react";
import UiToast, { EToastType } from "../auth/components/Toast";
import { DatePickerDemo } from "../components/DatePicker";

interface InfoItem {
  label: string;
  value: string;
  index: keyof UserModel;
  renderForm?: React.ReactElement;
  render?: (...args: any[]) => React.ReactElement;
}

const InfoItems: InfoItem[] = [
  {
    label: '姓',
    value: '无姓',
    index: 'first_name'
  },
  {
    label: '名',
    value: '无名',
    index: 'last_name'
  },
  {
    label: '昵称',
    value: '暂时没设置捏',
    index: 'nickname'
  },
  {
    label: '生日',
    value: '不晓得哦',
    index: 'birth_date',
    renderForm: <DatePickerDemo name="birth_date" />,
    render: (val) => {
      return <>{isNaN(Number(val)) ? '' : new Date(Number(val)).toDateString()}</>
    }
  },
  {
    label: '所在地',
    value: '不知道哦',
    index: 'city'
  },
  {
    label: '电话',
    value: '不敢问哦',
    index: 'phone'
  },
  {
    label: '个人介绍',
    value: '这个人很懒，没有自我介绍',
    index: 'bio'
  },
]

export default function FormArea(
  { user = {} }
  : {
    user: UserModel | { [x:string]: any }
  }
) {
  const toast = useToast({
    duration: 9000,
    position: 'top-right',
  });

  const [edit, setEdit] = useState(false);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(user.avatar_url || '/placeholder.svg');
  const [picPreviewUrl, setPicPreviewUrl] = useState(user.profile_picture_url || '/placeholder.svg');

  const handleImageChange = (set: any) => async (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('file', file);

      const uploadUrl = await uploadFile(formData)
      set(uploadUrl);
    } else {
      set(null);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const isUpdated = await updateUserInfo(formData);

      if (isUpdated) {
        toast({
          render() {
            return (
              <UiToast
                title="更新成功"
                description="信息更新成功"
                type={EToastType.Success}
              />
            )
          }
        });
        window.location.reload();
      }
    } catch (err) {
      toast({
        render() {
          return (
            <UiToast
              title="更新失败"
              description="信息更新失败"
              type={EToastType.Error}
            />
          )
        }
      });
    }
  };

  return (
    <>
      <div className="bg-white p-6 md:flex md:items-center md:justify-between">
        <div className="md:flex md:items-center">
          <Image
            alt="Profile background"
            className="h-48 w-full object-cover md:h-full md:w-48"
            height="192"
            src={user.profile_picture_url || '/placeholder.svg'}
            style={{
              aspectRatio: "192/192",
              objectFit: "cover",
            }}
            width="192"
          />
          <div className="mt-4 flex items-center md:mt-0 md:ml-6">
            <Avatar className="mr-4">
              <AvatarImage alt="John Doe" src={user.avatar_url} />
              <AvatarFallback>{user.last_name || '头像'}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user.nickname || '暂无昵称'}</h2>
              <p className="text-sm text-gray-600">{user.email || ''}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <Link href="/profile#edit-area">
            <Button disabled={edit} onClick={() => setEdit(pre => !pre)}>编辑信息</Button>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 bg-white p-6" id='edit-area'>
          {/* 标题 */}
          <h3 className="text-lg font-bold">个人资料</h3>
          <dl className="mt-2">
            {/* 普通信息 */}
            {InfoItems.map(({ index, value, label, renderForm, render }) => (
              <div className="py-2" key={index}>
                <dt className="text-sm font-semibold text-gray-600">{label}</dt>
                {!edit
                  ? <dd className="text-sm" style={{ padding: '0.5rem' }}>{user[index] && render ? render(user[index]) : (user[index] || value)}</dd>
                  : renderForm || <Input type="text" defaultValue={user[index] || ''} name={index} />
                }
              </div>
            ))}
            {/* 头像、背景 */}
            <div className="py-2">
              <label className="text-sm font-semibold text-gray-600" htmlFor="avatar-upload">
                头像上传
              </label>
              <div className="mt-4 flex space-between items-end flex-wrap">
                <Image
                  alt="Avatar Preview"
                  className="rounded-lg mr-4 mb-4"
                  height={150}
                  src={avatarPreviewUrl}
                  style={{
                    aspectRatio: "150/150",
                    objectFit: "cover",
                  }}
                  width={150}
                />
                <Input style={{ display: 'none' }} type="text" value={avatarPreviewUrl} name="avatar_url" onChange={()=>{}} />
                {edit && <Input
                  disabled={!edit}
                  name="avatar"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange(setAvatarPreviewUrl)}
                />}
              </div>
            </div>
            <div className="py-2">
              <label className="text-sm font-semibold text-gray-600" htmlFor="background-upload">
                背景上传
              </label>
              <div className="mt-4 flex space-between items-end flex-wrap">
                <Image
                  alt="Background Preview"
                  className="rounded-lg mr-4 mb-4"
                  height={150}
                  src={picPreviewUrl}
                  style={{
                    aspectRatio: "300/150",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <Input style={{ display: 'none' }} type="text" value={picPreviewUrl} name="profile_picture_url" onChange={()=>{}} />
                {edit && <Input
                  disabled={!edit}
                  name="profile-pic"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange(setPicPreviewUrl)}
                />}
              </div>
            </div>
          </dl>
          {/* 提交按钮 */}
          <div className="mt-4 space-x-4">
            {edit && <>
              <Button variant="secondary" onClick={() => {
                setEdit(false);
              }}>取消编辑</Button>
              <Button>提交信息</Button>
            </>}
          </div>
        </div>
      </form>
    </>
  )
}