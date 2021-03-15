import { useState, Suspense } from 'react'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import * as Icons from '../../icons'

// Components
import Sidebar from './components/Sidebar'
import LazyLoadImage from './components/LazyLoadImage'

type Icon = 'github' | 'copy' | 'photo'

function App() {
    const initialTextState = {
        github: false,
        copy: false,
        photo: false,
    }
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const [isMobile] = useState(() => window.innerWidth <= 763)
    const [textHovered, setTextHovered] = useState<{
        github: boolean
        copy: boolean
        photo: boolean
    }>(initialTextState)

    const toggleIconHover = (icon: Icon, e?: any) => {
        if (!isMobile) {
            setIsMouseOver(e.type === 'mouseover')
        }

        setTextHovered((prev) => {
            return {
                ...initialTextState,
                [icon]: !prev[icon],
            }
        })
    }

    const handleCopyEmail = (e: any) => {
        const email = 'developer@fabricebt.com'
        e.preventDefault()
        e.stopPropagation()

        copy(email)
        console.log('here')

        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2500)
    }

    return (
        <>
            <CopyToaster isCopied={isCopied}>
                <div>🙂 Email, copied</div>
            </CopyToaster>
            <HomeWrapper isMobile={isMobile}>
                {!isMobile && <Sidebar />}
                <Logo src="/logo.png" />
                <Body>
                    <Text>
                        Hello, I'm
                        <TextCTA as="span" id="test" color="#d76a03">
                            Fabrice Toussaint.
                        </TextCTA>
                    </Text>
                    <Text>
                        I enjoy
                        <TextCTA
                            href="https://github.com/fabriceTOUSSAINT"
                            target="_blank"
                            id="test"
                            onMouseOver={(e) => toggleIconHover('github', e)}
                            onMouseLeave={(e) => toggleIconHover('github', e)}
                            color="#8EB8E5"
                        >
                            Software Development
                            <HoverIcon
                                isVisible={textHovered.github}
                                isMobile={isMobile}
                            >
                                <Icons.GithubIcon />
                            </HoverIcon>
                        </TextCTA>
                        {!isMobile && '&'}
                        <TextCTA
                            href="https://www.instagram.com/brb.mom.needs.computer/"
                            target="_blank"
                            id="test"
                            onMouseOver={(e) => toggleIconHover('photo', e)}
                            onMouseLeave={(e) => toggleIconHover('photo', e)}
                            color="#d6d144"
                        >
                            {isMobile && '&'} Photography
                            <HoverIcon
                                isVisible={textHovered.photo}
                                isMobile={isMobile}
                            >
                                <Icons.InstaIcon />
                            </HoverIcon>
                        </TextCTA>
                    </Text>
                    <Text>
                        Lets chat, create, collaborate...
                        <TextCTA
                            href="#"
                            id="test"
                            onMouseOver={(e) => toggleIconHover('copy', e)}
                            onMouseLeave={(e) => toggleIconHover('copy', e)}
                            onClick={handleCopyEmail}
                            color="#d76a03"
                        >
                            developer@fabricebt.com
                            <HoverIcon
                                isVisible={textHovered.copy}
                                isMobile={isMobile}
                            >
                                <Icons.CopyIcon />
                            </HoverIcon>
                        </TextCTA>
                    </Text>
                </Body>
            </HomeWrapper>
            {!isMobile && (
                <Suspense fallback={<div>loading</div>}>
                    <BackgroundImageCurtain openCurtain={isMouseOver}>
                        <LazyLoadImage
                            isVisible={textHovered.photo}
                            src="/images/background_1.jpg"
                            flip
                        />
                        <LazyLoadImage
                            isVisible={textHovered.github}
                            src="/images/background_2.jpg"
                        />
                        <LazyLoadImage
                            isVisible={textHovered.copy}
                            src="/images/background_4.jpg"
                        />
                    </BackgroundImageCurtain>
                </Suspense>
            )}
        </>
    )
}

export default App

const BackgroundImageCurtain = styled.div<{ openCurtain: boolean }>`
    :before {
        content: '';
        width: 100%;
        height: 100%;
        background: #fff;
        position: absolute;
        top: 0px;
        transition: all ease 0.33s;

        ${({ openCurtain }) => {
            if (openCurtain) {
                return `
                    width: 45%
                `
            }

            return ``
        }}
    }
`

const CopyToaster = styled.div<{ isCopied: boolean }>`
    background: #d2ba75;
    padding: 12px 24px;
    color: white;
    border-radius: 4px;
    position: fixed;
    display: block;
    left: -30px;
    opacity: 0;
    bottom: 30px;
    transition: all ease 0.2s;
    font-weight: 600;
    font-size: 18px;
    z-index: 999999;

    ${({ isCopied }) => {
        if (isCopied) {
            return `
            opacity: 1;
            left: 20px;
            `
        }

        return ``
    }}
`
const HoverIcon = styled.div<{ isVisible: boolean; isMobile: boolean }>`
    opacity: 0;
    transition: all ease 0.2s;
    padding-bottom: 0px;
    display: inline-flex;
    transform: translate(4px, -10px);

    ${({ isVisible, isMobile }) => {
        if (isMobile) {
            return `
            opacity: .8;
            transform: translate(6px, -2px);
            padding-bottom: 10px;
            `
        }

        if (isVisible) {
            return `
                opacity: .8;
                transform: translate(4px, -16px);
                padding-bottom: 10px;
            `
        }

        return ``
    }}
`

const Text = styled.div<{ noMargin?: boolean }>`
  font-size: 42px;
  background: #fff;
  padding: 20px 50px 20px 0px;
  border-radius: 12px;
  margin: 8px 0px;
  display-inline-flex;
  width: fit-content;
  
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0 0px 40px;
`

const TextCTA = styled.a<{ color: string }>`
    color: ${({ color }) => color};
    padding-left: 8px;
`

const Logo = styled.img<{ isMobile?: boolean }>`
    display: inline-flex;
    position: relative;
    width: 125px;
    height: auto;
    padding: 34px 20px 0px;
`

const HomeWrapper = styled.div<{ isMobile?: boolean }>`
    font-family: 'Fira Sans', sans-serif;
    font-size: 1.5em;
    width: 100vw;
    height: 100vh;
    display: flex;
    background-size: cover;
    background-position-x: 300px;
    background-repeat: no-repeat;
    transition: background-position-x cubic-bezier(0.82, 0, 0.44, 0.93) 1s;
    z-index: 99999;
    flex-direction: column;
    position: absolute;

    ${({ isMobile }) => {
        if (isMobile) {
            return `
                height: 90px;

                ${Text} {
                    font-size: 20px;
                    padding: 12px 0px;
                    margin: 0px;
                }

                ${TextCTA} {
                    display: block;
                    padding: 6px 0px;
                    margin: 0px;
                    font-size: 24px;
                    font-weight: 600;
                }

                ${Body} {
                    padding: 0px 25px 20px;
                }

                ${Logo} {
                    padding: 16px 0px 0px;
                }
            `
        }

        return ''
    }}
`
