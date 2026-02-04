import { Controller } from "react-hook-form";
import { useExample } from "@/hooks/useExample";
import { Input } from "@/components/common/Input";

export default function Example() {
  const { control, errors, isValid, handleSubmit, onSubmit } = useExample();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="이메일"
              field={field}
              type="email"
              placeholder="이메일을 입력해주세요"
              error={errors.email?.message}
              labelSize="14-16"
              labelWeight="400"
              inputSize="14-16"
              errorSize="12-14"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="비밀번호"
              field={field}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required={true}
              error={errors.password?.message}
              labelSize="14-18"
              labelWeight="500"
              inputSize="16-16"
            />
          )}
        />
      </form>
    </>
  );
}
