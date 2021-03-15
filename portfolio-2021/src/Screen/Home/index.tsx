import styled from 'styled-components';

// Components
import Sidebar from './components/Sidebar';

function App() {
  return (
    <HomeWrapper>
      <Sidebar />
      <Logo src='/logo.png' />
      <Center>
        <Text>Hello, I'm <OnHover color='#d76a03'>Fabrice.</OnHover></Text>
        <Text>I'm a <OnHover color='#8EB8E5'>Software Engineer</OnHover> & <OnHover color='#E5E059'>Photographer</OnHover></Text>
        <Text>Lets chat, create, brainstorm...</Text>
        <Text noMargin><OnHover color='#d76a03'>developer@fabricebt.com</OnHover></Text>
      </Center>
    </HomeWrapper>
  );
}

export default App;

const HomeWrapper = styled.div`
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
  position: absolute;
`;

const Text = styled.div<{ noMargin?: boolean}>`
  font-size: 48px;
  background: #fff;
  padding: 15px 50px 15px 0px;
  border-radius: 12px;
  margin: 15px 0px 0px;
  display-inline-flex;
  width: fit-content;

  ${({noMargin}) => {
    if (noMargin) {
      return  `
        border-top-right-radius: 0px;
        margin: 0px 0px;
      `
    }

    return ''
  }}
  
`

const Center = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 0 0px 40px;
`;

const OnHover = styled.span<{color: string}>`
  color: ${({color}) => color};
`

const Logo = styled.img`
height: 125px;
display: block;
top: 30px;
position: absolute;
z-index: 10;
left: 30px;
right: 20px;
`;