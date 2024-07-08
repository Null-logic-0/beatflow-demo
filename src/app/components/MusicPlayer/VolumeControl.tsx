import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import style from './VolumeControl.module.scss';
import HeartShapeBtn from '../Button/HeartShapeBtn';

interface Props {
    volume: number;
    onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: Props) => {
    const volumeBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const percentage = (volume / 100) * 100;
        if (volumeBarRef.current) {
            volumeBarRef.current.style.setProperty('--seek-before-width', `${percentage}%`);
            volumeBarRef.current.style.setProperty('--knobby', 'var(--selectedKnobby)');
        }
    }, [volume]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value, 10);
        onVolumeChange(newVolume);
    };

    return (
        <div className={style.volume}>
            <Image src="/volume-loud.svg" alt="Volume" width={0} height={0} className={style.volumeIcon}/>
            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                ref={volumeBarRef}
                className={style.volSetting}
            />
            <HeartShapeBtn isActive isDisabled={false} onClick={() => console.log('Button clicked!')} className={style.heartBtn}/>
        </div>
    );
};

export default VolumeControl;
