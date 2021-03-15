import styled from 'styled-components'

const Sidebar = () => {
    return (
        <SidebarRainbow>
            <span />
            <span />
            <span />
            <span />

            <span />
        </SidebarRainbow>
    )
}

export default Sidebar

const SidebarRainbow = styled.div`
    width: 8px;
    height: 100vh;
    left: 0;
    z-index: 10;
    position: absolute;

    span {
        height: 20vh;
        display: block;

        &:first-child {
            background-color: #271f30;
        }
        &:nth-child(2) {
            background-color: #8eb8e5;
        }
        &:nth-child(3) {
            background-color: #d76a03;
        }
        &:nth-child(4) {
            background-color: #e5e059;
        }
        &:nth-child(5) {
            background-color: #8c1c13;
        }
    }
`
