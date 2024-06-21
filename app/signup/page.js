'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { ContentPasteSearchTwoTone, Google } from '@mui/icons-material';
import {auth, provider} from '@/firebase'
import {createUserWithEmailAndPassword, getAuth, signInWithPopup} from 'firebase/auth'
import tw from 'tailwind-styled-components';
import { newContext } from '../layout';

// import { doc, setDoc } from "firebase/firestore"; 
// import { db } from '../../firebase';

export default function SignUp() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorState, setErrorState] = useState(0)
    const [log, setLog] = useState("")

    const router = useRouter()
  
    // const navigate = useNavigate()
  
//     function create_UUID(){
//       var dt = new Date().getTime();
//       var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//           var r = (dt + Math.random()*16)%16 | 0;
//           dt = Math.floor(dt/16);
//           return (c=='x' ? r :(r&0x3|0x8)).toString(16);
//       });
//       return uuid;
//   }
  
  function register () {
        console.log("the register function has been run")
        console.log(email)
        if (username) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (auth) {
                    console.log('success')
                    setErrorState(0)
                    router.push("/calendar")
                  //   router.push("/calendar")
                  //   getAuth()
                  //   .importUsers(
                  //     [
                  //       {
                  //         uid: create_UUID(),
                  //         email: {email},
                  //         // Must be provided in a byte buffer.
                  //         passwordHash: Buffer.from('base64-password-hash', 'base64'),
                  //         // Must be provided in a byte buffer.
                  //         passwordSalt: Buffer.from('base64-salt', 'base64'),
                  //       },
                  //     ],
                  //     {
                  //       hash: {
                  //         algorithm: 'SCRYPT',
                  //         // All the parameters below can be obtained from the Firebase Console's users section.
                  //         // Must be provided in a byte buffer.
                  //         key: Buffer.from('base64-secret', 'base64'),
                  //         saltSeparator: Buffer.from('base64SaltSeparator', 'base64'),
                  //         rounds: 8,
                  //         memoryCost: 14,
                  //       },
                  //     }
                  //   )
                  //   .then((results) => {
                  //     results.errors.forEach((indexedError) => {
                  //       console.log(`Error importing user ${indexedError.index}`);
                  //     });
                  //   })
                  //   .catch((error) => {
                  //     console.log('Error importing users :', error);
                  //   });
                }
            })
            .catch((error) => {
                console.log(error.message)
                if (error.message === 'Firebase: Error (auth/invalid-email).') {
                  setErrorState(1)
                }
                if (error.message === 'Firebase: Error (auth/missing-password).') {
                  setErrorState(2)
                }
                if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                  setErrorState(3)
                }
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                  setErrorState(4)
                }
            }) 
        } else {
            setErrorState(5)
        }
  }
  
  // function RegisterWithGoogle () {
  //     signInWithPopup(auth, provider)
  //         .then((userEmail) => {
  //             router.push('/calendar');
  //         })
  //         .catch(() => {
  //            console.log('You do not have google account')
  //         });
  // }
  
  //     const [ user, setUser ] = useState(null)
  //   // const [ error, setError] = useState('')
  //   const [log, setLog] = useState('Log..')
  
  
  // const addLog = () => {
  // setLog((prev) => prev + "\n" + JSON.stringify(log));
  // }
  
  const registerWithGoogle = () => {
   signInWithPopup(auth, provider)
   .then((result)=>{
  //   if(auth){
    //  setEmail(result.user.email)
    setUsername(result.user.displayName)
    setEmail(result.user.email)
     router.push("/calendar")
     console.log("Register with Google: ", result)
  //    router.push('/calendar'+email)
  //   }
  //   router.push("/calendar", email)
   })
   .catch((error)=>{
     console.log(error.message)
     addLog(error.message)
   })
  }

  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('email', JSON.stringify(email));
  }, [username, email])

// const {username, register, registerWithGoogle, errorState, email, password} = newContext()

//   useEffect(()=>{
//     registerWithGoogle()
//   },[registerWithGoogle])

//   console.log('USER: ', user.user.displayName)

    return (
        <SignUpContainer>
            <SignUpSection>
                <DecorationText>
                    <DecorationTextLineOne>Get Started with Scheduler</DecorationTextLineOne>
                    <DecorationTextLineTwo>Manage your personal calendar starting from now!</DecorationTextLineTwo>
                </DecorationText>
                <InputForm>
                    <InputContainer>
                        <InputDescriptor>Name{errorState === 5 ? <InputDescriptorError> - Please enter a username</InputDescriptorError> : <></>}</InputDescriptor>
                        <Input type='text' onChange={(e) => setUsername(e.target.value)} value={username}/>
                    </InputContainer>
                    <InputContainer>
                        <InputDescriptor>Email{errorState === 1 ? <InputDescriptorError> - Please enter a valid email</InputDescriptorError> : errorState === 4 ? <InputDescriptorError> - This email is already in use</InputDescriptorError> : <></>}</InputDescriptor>
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </InputContainer>
                    <InputContainer>
                        <InputDescriptor>Password{errorState === 2 ? <InputDescriptorError> - Please enter a password</InputDescriptorError> : errorState === 3 ? <InputDescriptorError> - Password is too weak</InputDescriptorError> : <></>}</InputDescriptor>
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </InputContainer>
                    <ConfirmSignUp type='button' onClick={() => register()} >Create Account</ConfirmSignUp>
                </InputForm>
                <Seperator/>
                <GoogleRegister onClick={() => registerWithGoogle("sign in with google")}>Or register with <Google className='w-[1.3rem] h-[1.3rem]'/>oogle</GoogleRegister>
                <LoginRedirectText><LoginRedirectTextNormal>Already have an account? </LoginRedirectTextNormal><Link href='/login'><LoginRedirectTextLink>Login here</LoginRedirectTextLink></Link></LoginRedirectText>
            </SignUpSection>
        </SignUpContainer>
    );
}

const SignUpContainer = tw.main`w-full h-full relative bg-white [background:linear-gradient(45deg,rgba(255,255,255,0.8)_12%,rgba(0,212,255,0.8)_100%);] bg-no-repeat bg-cover`
const SignUpSection = tw.div`w-[40%] h-full bg-[rgba(255,255,255,0.75)] absolute flex flex-col items-center justify-center px-[5%] pb-[15%]`
const DecorationText = tw.div`w-full h-auto flex flex-col mb-[2rem] cursor-default`
const DecorationTextLineOne = tw.span`text-[3rem] font-medium mb-[0.5rem]`
const DecorationTextLineTwo = tw.span`text-[1.5rem] text-[#757782]`
const InputForm = tw.form`w-full h-[32rem] flex flex-col justify-between items-center`
const InputContainer = tw.div`w-full h-auto flex flex-col items-center`
const InputDescriptor = tw.span`text-[1.2rem] font-semibold mb-[0.4rem] w-full cursor-default`
const InputDescriptorError = tw.span`text-red-500`
const Input = tw.input`w-[98%] h-[4.5rem] border-[2px] border-[#757782] rounded-lg px-[0.4rem] text-[1.5rem]`
const ConfirmSignUp = tw.button`w-[98%] h-[4.5rem] bg-black text-white rounded-lg text-[1.4rem] font-medium`
const Seperator = tw.div`h-[1px] w-full bg-[#757782] my-[2rem]`
const GoogleRegister = tw.button`w-[98%] h-[4.5rem] border-[2px] border-[#757782] rounded-lg px-[0.4rem] text-[1.5rem] font-medium mb-[2rem]`
const LoginRedirectText = tw.span`text-[1.2rem]`
const LoginRedirectTextNormal = tw.span`text-[#757782] cursor-pointer`
const LoginRedirectTextLink = tw.span`text-black font-medium cursor-pointer hover:underline`