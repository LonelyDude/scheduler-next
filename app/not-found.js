import tw from 'tailwind-styled-components';
import Link from 'next/link';

export default function NotFound() {
    return (
        <NotFoundContainer>
            <BackgroundText>{`:(`}</BackgroundText>
            <AbsoluteContainer>
                <NotFoundMessage>This page got lost</NotFoundMessage>
                <ColumnGap/>
                <Link href='/'>
                    <RedirectButton>Back to Home</RedirectButton>
                </Link>
            </AbsoluteContainer>
        </NotFoundContainer>
    );
}

const NotFoundContainer = tw.main`w-full h-[90%] flex items-end justify-center flex-col relative`;
const BackgroundText = tw.span`text-[48rem] text-neutral-900 cursor-default mr-64`;
const AbsoluteContainer = tw.div`w-full h-[50%] flex items-center justify-center flex-col absolute mt-[5%]`;
const NotFoundMessage = tw.span`text-6xl cursor-default`;
const ColumnGap = tw.div`my-3`;
const RedirectButton = tw.button`bg-black text-white border-none w-[30rem] h-[5rem] rounded hover:bg-gray-700 text-4xl`;