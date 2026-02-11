import { Controller } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";
import { Input } from "@/components/common/Input";
import LoginButton from "@/components/common/Button/ButtonLogin";


const LoginForm = () => {
  const { control, errors, isValid, handleSubmit, onSubmit } = useLogin();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
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
          name="password" 
          control={control}
          defaultValue=""
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
        <LoginButton 
          variant={isValid ? "primary" : "secondary"}
          fontSize="lg" 
          disabled={!isValid}
        >
          로그인
        </LoginButton>
      </div>  
      </form>
    </div>
  );
}

export default LoginForm;