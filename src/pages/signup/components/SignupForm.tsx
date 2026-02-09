import { Controller } from "react-hook-form";
import { useExample } from "@/hooks/useExample";
import { Input } from "@/components/common/Input";
import LoginButton from "@/components/common/Button/ButtonLogin";


const SignupForm = () => {
  const { control, errors, isValid, handleSubmit, onSubmit } = useExample();

  return (
    <div>
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
              labelSize="labelSm"
              labelWeight="normal"
              inputSize="inputMd"
              errorSize="errorSm"
            />
          )}
        />

      <div className='mt-4'>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="닉네임"
              field={field}
              type="email"
              placeholder="닉네임을 입력해주세요"
              error={errors.email?.message}
              labelSize="labelSm"
              labelWeight="normal"
              inputSize="inputMd"
              errorSize="errorSm"
            />
          )}
        />
      </div>  

      <div className='mt-4'>
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
              labelSize="labelSm"
              labelWeight="medium"
              inputSize="inputLg"
            />
          )}
        />
        </div>  

      <div className='mt-4'>
        <Controller
          name="password" 
          control={control}
          render={({ field }) => (
            <Input
              label="비밀번호 확인"
              field={field}
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              required={true}
              error={errors.password?.message}
              labelSize="labelSm"
              labelWeight="medium"
              inputSize="inputLg"
            />
          )}
        />
        </div> 
      </form>
      <div className='mt-4'>      
        <LoginButton variant="secondary" fontSize="lg">
          가입하기
        </LoginButton>
      </div>      
    </div>
  )
}

export default SignupForm;