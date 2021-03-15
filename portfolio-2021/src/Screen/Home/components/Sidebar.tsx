import styled from 'styled-components';

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

export default Sidebar;

const SidebarRainbow = styled.div`
    width: 20px;
    height: 100vh;
    left: 0;
    z-index: 10;

    span {
        height: 20vh;
        display: block;

        &:first-child{background-color: #271F30;}
        &:nth-child(2){background-color: #8EB8E5;}
        &:nth-child(3){background-color: #D76A03;}
        &:nth-child(4){background-color: #E5E059;}
        &:nth-child(5){background-color: #8C1C13;}
    }
`;