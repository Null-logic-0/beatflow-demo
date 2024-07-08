import { useState } from 'react';
import Image from 'next/image';
import style from './HeartShapeBtn.module.scss';

interface Props {
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
  className?:string;
}

export default function HeartShapeBtn ({ isActive, isDisabled, onClick,className }: Props) {
  const [isClicked, setIsClicked] = useState(false);

  const getIconSource = () => {
    if (isDisabled) {
      return '/heartDisabled.svg';
    } else if (isClicked) {
      return '/heart2.svg';
    } else {
      return '/heart1.svg';
    }
  };

  const handleClick = () => {
    if (!isDisabled) {
      setIsClicked(!isClicked);
      onClick();
    }
  };

  return (
    <button
      className={`${style.btn} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <Image
        src={getIconSource()}
        alt="Heart Icon"
        width={0}
        height={0}
        className={style.icon}
      />
    </button>
  );
}
