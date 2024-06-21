'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { Google } from '@mui/icons-material';
import {auth} from '@/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import tw from 'tailwind-styled-components';

export default function Login() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorState, setErrorState] = useState(0)

    function login () {
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log("Sign in results: ", result)
            // router.push('/calendar')
        })
        .catch((error) => {
            console.log("Sign in error: ",  error)
            if (error.message === 'Firebase: Error (auth/invalid-email).') {
                setErrorState(1)
            }
            if (error.message === 'Firebase: Error (auth/missing-password).') {
                setErrorState(2)
            }
            if (error.message === 'Firebase: Error (auth/wrong-password).') {
                setErrorState(3)
            }
        })
    }

    return (
        <LoginContainer>
            <LoginSection>
                <DecorationText>
                    <DecorationTextLineOne>Welcome back to Scheduler</DecorationTextLineOne>
                    <DecorationTextLineTwo>Let's make sure it's you!</DecorationTextLineTwo>
                </DecorationText>
                {errorState === 0 && email && password ?
                <>
                <InputForm>
                    <InputContainer>
                        <InputDescriptor>Email</InputDescriptor>
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </InputContainer>
                    <InputContainer>
                        <InputDescriptor>Password</InputDescriptor>
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </InputContainer>

                    <Link href={{pathname: '/calendar', query: {email: email}}} className='w-full flex flex-row justify-center'>
                        <ConfirmSignUp type='button' onClick={() => login()} >Sign In</ConfirmSignUp>
                    </Link>
                </InputForm>
                </>
                :
                <>
                <InputForm>
                    <InputContainer>
                        <InputDescriptor>Email</InputDescriptor>
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </InputContainer>
                    <InputContainer>
                        <InputDescriptor>Password</InputDescriptor>
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </InputContainer>
                    <ConfirmSignUp type='button'>Sign In</ConfirmSignUp>
                </InputForm>
                </>}
                <Seperator/>
                <GoogleRegister>Or login with <Google className='w-[1.3rem] h-[1.3rem]'/>oogle</GoogleRegister>
                <SignUpRedirectText><SignUpRedirectTextNormal>New to Scheduler? </SignUpRedirectTextNormal><Link href='/signup'><SignUpRedirectTextLink>Sign up here</SignUpRedirectTextLink></Link></SignUpRedirectText>
            </LoginSection>
        </LoginContainer>
    );
}

const LoginContainer = tw.main`w-full h-full relative bg-signup-background [background:linear-gradient(135deg,rgba(238,174,202,0.8)_0%,rgba(255,255,255,1)_88%);] bg-no-repeat bg-cover`
const LoginSection = tw.div`w-[40%] h-full bg-[rgba(255,255,255,0.75)] absolute flex flex-col items-center justify-center px-[5%] pb-[15%] right-0`
const DecorationText = tw.div`w-full h-auto flex flex-col mb-[2rem] cursor-default`
const DecorationTextLineOne = tw.span`text-[3rem] font-medium mb-[0.5rem]`
const DecorationTextLineTwo = tw.span`text-[1.5rem] text-[#757782]`
const InputForm = tw.form`w-full h-[24rem] flex flex-col justify-between items-center`
const InputContainer = tw.div`w-full h-auto flex flex-col items-center`
const InputDescriptor = tw.span`text-[1.2rem] font-semibold mb-[0.4rem] w-full cursor-default`
const Input = tw.input`w-[98%] h-[4.5rem] border-[2px] border-[#757782] rounded-lg px-[0.4rem] text-[1.5rem]`
const ConfirmSignUp = tw.button`w-[98%] h-[4.5rem] bg-black text-white rounded-lg text-[1.4rem] font-medium`
const Seperator = tw.div`h-[1px] w-full bg-[#757782] my-[2rem]`
const GoogleRegister = tw.button`w-[98%] h-[4.5rem] border-[2px] border-[#757782] rounded-lg px-[0.4rem] text-[1.5rem] font-medium mb-[2rem]`
const SignUpRedirectText = tw.span`text-[1.2rem]`
const SignUpRedirectTextNormal = tw.span`text-[#757782] cursor-pointer`
const SignUpRedirectTextLink = tw.span`text-black font-medium cursor-pointer hover:underline`