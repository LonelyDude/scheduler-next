'use client'
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import tw from "tailwind-styled-components";
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import {auth} from "@/firebase";
import {signOut} from "firebase/auth";
import Link from 'next/link';
// import { newContext } from "@/app/(defaultLayouts)/layout";

export default function Header() {

    // const {username, register, registerWithGoogle, errorState, email, password} = newContext

    const router = useRouter()
    // const {data} = router.query

    // const [email, setEmail] = useState(data)

    const [profileStatus, setProfileStatus] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    // const [signOutState, setSignOutState] = useState(false)

    function toggleStatus (status, setStatus) {
        let arr = [false, true]
        console.log(arr)
        arr = arr.filter((item) => item!==status)
        console.log(arr)
        setStatus(arr[0])
        // console.log('Status: ', status)
    }

    async function logOut () {
        console.log('Signed out');
        toggleStatus(profileStatus, setProfileStatus);
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        // toggleStatus(signOutState, setSignOutState);
        // console.log("Sign out state: ",signOutState)
        await signOut(auth);
    }

    useEffect(() => {
        // if (signOutState === true) {
        // } else {
            setUsername(JSON.parse(localStorage.getItem('username')))
            setEmail(JSON.parse(localStorage.getItem('email')))
            console.log(`username: ${username} \n email: ${email}`)
        // }
    }, [setUsername, setEmail, username, email])

    return (
        <HeaderContainer>
            <Link href='/'>
                <AppName>Scheduler</AppName>
            </Link>
            <PageLinks>
                <Link href='/dashboard'>
                    <PageLink><WidgetsOutlinedIcon className="mr-3 w-[2.2rem] h-[2.2rem]"/>Dashboard</PageLink>
                </Link>
                <Link href='/calendar'>
                    <PageLink><CalendarMonthOutlinedIcon className="mr-3 w-[2.2rem] h-[2.2rem]"/>Calendar</PageLink>
                </Link>
                <Link href='/analytics'>
                    <PageLink><AnalyticsOutlinedIcon className="mr-3 w-[2.2rem] h-[2.2rem]"/>Analytics</PageLink>
                </Link>
            </PageLinks>
            {username && email ?
            <AccountDisplay>
                <Info>
                    <NotificationsNoneIcon className="w-[2.5rem] h-[2.5rem] cursor-pointer"/>
                    <InfoIndicator/>
                </Info>
                <Info>
                    <MailOutlineIcon className="w-[2.5rem] h-[2.5rem] cursor-pointer"/>
                    <InfoIndicator/>
                </Info>
                <Profile>
                    <ProfileImage/>
                    <ProfileMiddleContainer>
                        <ProfileName>{username}</ProfileName>
                        <ProfileJob>{email}</ProfileJob>
                    </ProfileMiddleContainer>
                    <ExpandMoreIcon className="w-[2.5rem] h-[2.5rem] cursor-pointer" onClick={() => {toggleStatus(profileStatus, setProfileStatus)}}></ExpandMoreIcon>
                    {profileStatus ? 
                    <>
                        <ExpandProfileTail/>
                        <ExpandedProfile>
                            <SignOutButton onClick={() => logOut()}>Sign Out</SignOutButton>
                        </ExpandedProfile>
                    </>
                    :
                    <></>}
                </Profile>
            </AccountDisplay>
            :
            <AccountDisplay>
                <NoAccountText>Want to use Scheduler to it's fullest?</NoAccountText>
                <LogInButton onClick={() => router.push('/login')}>Log In</LogInButton>
                <SignUpButton onClick={() => router.push('/signup')}>Sign Up</SignUpButton>
            </AccountDisplay>
            }
        </HeaderContainer>
    );
}

const HeaderContainer = tw.header`w-full h-[8%] bg-[#ffffff] flex flex-row items-center justify-between px-16 border-b-[4px] border-[#f3f8ff] shadow shadow-bottom z-40`;
const AppName = tw.span`text-[3rem] bg-[#6389ff] [background:linear-gradient(45deg,rgba(109,139,255,0.8)_12%,rgba(0,212,255,0.8)_100%)] [background-clip:text;] [-webkit-text-fill-color:transparent;] font-semibold ml-[4rem] h-8 cursor-pointer`;
const PageLinks = tw.div`w-[86rem] h-[30%] flex flex-row items-center justify-center`;
const PageLink = tw.span`text-[2rem] text-black flex flex-row items-center mx-16 cursor-pointer`;
const AccountDisplay = tw.div`w-[48rem] h-full flex flex-row text-black items-center`;
const Info = tw.span`w-16 h-16 flex items-center justify-center relative mr-4`;
const InfoIndicator = tw.div`w-[0.8rem] h-[0.8rem] absolute top-[6px] right-[6px] bg-red-500 rounded-full cursor-pointer`;
const Profile = tw.div`w-auto h-full flex flex-row items-center ml-4 relative`;
const ProfileImage = tw.div`w-16 h-16 bg-black rounded-full cursor-pointer`;
const ProfileMiddleContainer = tw.div`mx-4 flex flex-col w-auto`;
const ProfileName = tw.span`font-bold cursor-pointer`;
const ProfileJob = tw.span`font-semibold cursor-pointer`;
const ExpandProfileTail = tw.div`w-[0.3rem] h-[0.3rem] border-t-[1.2px] border-l-[1.2px] border-[#838281] rotate-45 absolute right-[1rem] top-[76%] rounded-md bg-[rgba(80,_80,_80,_0.25)]`
const ExpandedProfile = tw.div`absolute w-[8rem] h-auto right-[0.5rem] top-[80%] border-[#838281] border-[1px] rounded-md bg-[rgba(80,_80,_80,_0.25)] flex flex-col items-center py-[0.8rem] z-40`
const SignOutButton = tw.span` hover:underline cursor-pointer text-black hover:text-[#575fcc] font-medium text-[1.2rem]`
const NoAccountText = tw.span`text-[1.5rem] font-semibold mx-[0.5rem]`
const LogInButton = tw.button`w-auto h-[3.8rem] bg-[#6389ff] rounded-xl text-[#ffffff] flex items-center justify-center px-[1%] cursor-pointer text-[1.5rem] font-semibold mx-[0.5rem]`
const SignUpButton = tw.button`w-auto h-[3.8rem] bg-[#ffffff] rounded-xl border-[3px] border-[#81a2eb] text-[#81a2eb] flex items-center justify-center px-[1%] cursor-pointer text-[1.5rem] font-semibold mx-[0.5rem]`