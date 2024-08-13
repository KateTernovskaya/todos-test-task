import styled from "styled-components";

type ButtonPropsType = {
    title: string
    onClick?: () => void
    className?: string
}

export const Button = ({title, onClick, className}: ButtonPropsType) => {
    return (
        <ButtonStyled className={className} onClick={onClick}>{title}</ButtonStyled>
    )
}
const ButtonStyled = styled.button`
  background-color: rgba(59, 141, 161, 0.49);
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer
`;
