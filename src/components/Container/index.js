import styled from 'styled-components';

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        align-items: center;

        svg {
            margin-right: 10px;
        }
    }
`;

export default Container;
