import React, { FC } from 'react'
import "../sass/components/buttons.scss"
interface ButtonProps {
    className?: string;
  btnName: string;
  onSubmit?: () => void;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ className, btnName }) => {
  return (
      <button className={`${className} btn`} type="button">{btnName}</button>
  )
}

export default Button;