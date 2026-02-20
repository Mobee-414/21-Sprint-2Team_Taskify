'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/common/Input';
import BaseButton from '@/components/common/Button/ButtonBase';
import { getMyUser, putMyUser, postMyUserImage } from '@/api/users.api';
import { showToast } from "@/contexts/ToastProvider";

interface ProfileFormValues {
  email: string;
  nickname: string;
}

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { control, handleSubmit, reset, formState:{isDirty}, 
  } = useForm<ProfileFormValues>();

  // 유저 정보 불러오기
  useEffect( () => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const user = await getMyUser();

        reset({
          email: user.email,
          nickname: user.nickname,
        });

        setProfileImage(user.profileImageUrl ?? null);
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

  // 이미지 선택
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file); 
    setPreviewUrl(URL.createObjectURL(file));

    e.target.value = '';
  };

  // 저장 업로드
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      let imageUrl = profileImage;
      // 이미지 먼저

      if (imageFile) {
        const res = await postMyUserImage(imageFile);
        imageUrl = res.profileImageUrl;
        }

      // 닉네임
      const updatedUser = await putMyUser({
        nickname: data.nickname,
        profileImageUrl: imageUrl,
      });

      setProfileImage(updatedUser.profileImageUrl ?? null);
      setImageFile(null);
      setPreviewUrl(null);

      showToast.success('정보가 수정되었습니다.');

      reset({
        email: updatedUser.email,
        nickname: updatedUser.nickname,
      });

    } catch (error) {
      console.error(error);
      showToast.error('수정 실패');
    }
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="bg-white px-[24px] py-[24px] rounded-[12px] w-[284px] md:w-[548px] lg:w-[672px]">
      <h2 className="text-[18px] md:text-xl font-bold mb-[24px]">프로필</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-[24px]">
          {/* 이미지 업로드 */}
          <button
            type = "button"
            onClick={handleImageClick}
            className="
              w-[100px] h-[100px] md:w-[160px] md:h-[160px] bg-gray-light rounded-[8px] 
              flex items-center justify-center cursor-pointer flex-shrink-0 overflow-hidden              
            "
            aria-label="프로필 이미지 업로드"
          >
            {(previewUrl || profileImage )? (
              <Image
                src={previewUrl || profileImage! }
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
                className="w-full h-full object-contain"
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
          <div className="flex flex-col gap-[16px] w-[252px] md:w-[276px] lg:w-[400px]">
            <div>
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
            <div>
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
                w-[252px] md:w-[276px] lg:w-[400px] h-[54px]
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