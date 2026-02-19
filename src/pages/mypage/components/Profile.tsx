'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/common/Input';
import BaseButton from '@/components/common/Button/ButtonBase';
import { getMyUser, putMyUser, postMyUserImage } from '@/api/users.api';

interface ProfileFormValues {
  email: string;
  nickname: string;
}

const Profile = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const { control, handleSubmit, reset, formState:{isDirty}, 
  } = useForm<ProfileFormValues>();

  // 유저 정보 불러오기
  useEffect( () => {
    const fetchUser = async () => {
      try {
        const user = await getMyUser();

        setUserId(user.id);

        reset({
          email: user.email,
          nickname: user.nickname,
        });

        if (user.profileImageUrl) {
          setPreviewUrl(user.profileImageUrl);
        }
      } catch (error) {
        console.error(error);
        alert('유저 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [reset]);

  // 이미지 클릭
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 변경
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const updatedUser = await postMyUserImage(file);

      if (updatedUser.profileImageUrl) {
        setPreviewUrl(updatedUser.profileImageUrl);
      }
      alert('프로필 이미지가 변경되었습니다.'); // toast 변경 예정
    } catch (error) {
      console.error(error);
      alert('이미지 업로드 실패'); // toast 변경 예정
    }

    e.target.value = '';
  };

  // 닉네임 수정
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const updatedUser = await putMyUser({
        nickname: data.nickname,
      });

      alert('정보가 수정되었습니다.'); // toast 변경 예정

      reset({
        email: updatedUser.email,
        nickname: updatedUser.nickname,
      });
    } catch (error) {
      console.error(error);
      alert('수정 실패'); // toast 변경 예정
    }
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="bg-white px-[24px] py-[24px] rounded-[12px]">
      <h2 className="text-xl font-bold mb-[24px]">프로필</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-[24px]">
          {/* 이미지 업로드 */}
          <button
            type = "button"
            onClick={handleImageClick}
            className="
              w-[160px] h-[160px] bg-gray-light rounded-[8px] 
              flex items-center justify-center cursor-pointer flex-shrink-0 overflow-hidden"
            aria-label="프로필 이미지 업로드"
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
          </button>

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
                    readOnly
                    placeholder=""                    
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
              disabled = {!isDirty}
              className="
                w-[252px] h-[54px] md:w-[276px] lg:w-[400px] 
                bg-violet-main text-white rounded-[8px] text-lg font-semibold"
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