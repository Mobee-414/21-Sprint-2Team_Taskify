'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/common/Input';
import BaseButton from '@/components/common/Button/ButtonBase';

interface ProfileFormValues {
  email: string;
  nickname: string;
}

const Profile = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      email: '',
      nickname: '배유철',
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
  };

  return (
    <div className="bg-white px-[24px] py-[24px]">
      <h2 className="text-xl font-bold mb-[24px]">프로필</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-[24px]">
          {/* 이미지 업로드 */}
          <div
            onClick={handleImageClick}
            className="w-[160px] h-[160px] bg-gray-light rounded-[8px] flex items-center justify-center cursor-pointer flex-shrink-0 overflow-hidden"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="프로필 이미지"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/icons/add_Icon_Profile.svg"
                alt="프로필 이미지 추가"
                width={160}
                height={160}
              />
            )}
          </div>

          {/* 숨겨진 파일 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* 입력 영역 */}
          <div className="flex flex-col gap-[16px]">
            <div className="w-[252px] md:w-[276px] lg:w-[400px]">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    label="이메일"
                    field={field}
                    type="text"
                    placeholder="johndoe@gmail.com"
                  />
                )}
              />
            </div>
            <div className="w-[252px] md:w-[276px] lg:w-[400px]">
              <Controller
                name="nickname"
                control={control}
                render={({ field }) => (
                  <Input
                    label="닉네임"
                    field={field}
                    placeholder="닉네임을 입력해주세요"
                  />
                )}
              />
            </div>
            <BaseButton
              type="submit"
              className="w-[252px] h-[54px] md:w-[276px] lg:w-[400px] bg-violet-main text-white rounded-[8px] text-lg font-semibold"
            >
              저장
            </BaseButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;