import React from 'react';
import Image from 'next/image';
import ProgressBar from './ProgressBar';
import style from './Contorls.module.scss';

interface Props {
    isPlaying: boolean;
    onPlayPause: () => void;
    onPrevious: () => void;
    onNext: () => void;
    isLooping: boolean;
    onToggleLoop: () => void;
    isShuffling: boolean;
    onToggleShuffle: () => void;
    currentTime: number;
    duration: number;
    onTimeChange: (newTime: number) => void;
    onDoubleClick: () => void;
}

const Controls = ({
    isPlaying,
    onPlayPause,
    onPrevious,
    onNext,
    isLooping,
    onToggleLoop,
    isShuffling,
    onToggleShuffle,
    currentTime,
    duration,
    onTimeChange,
    onDoubleClick,
}: Props) => {
    return (
        <div className={style.container}>
            <div className={style.buttons}>
                <button onClick={onToggleShuffle} className={style.btn}>
                    <Image src={isShuffling ? "/shuffle1.svg" : "/shuffle.svg"} alt="Shuffle" width={0} height={0} className={style.loop} />
                </button>
                <button onClick={onPrevious} className={style.btn}>
                    <Image src="/back.svg" alt="Previous" width={0} height={0} className={style.next} />
                </button>
                <button onClick={onPlayPause} className={`${style.btn} ${style.circle}`}>
                    <Image src={isPlaying ? "/pause.svg" : "/Play.svg"} alt={isPlaying ? "Pause" : "Play"} width={0} height={0} className={style.pause} />
                </button>
                <button onClick={onNext} className={style.btn}>
                    <Image src="/next.svg" alt="Next" width={0} height={0} className={style.next} />
                </button>
                <button onClick={onToggleLoop} className={style.btn}>
                    <Image src={isLooping ? "/repeat1.svg" : "/repeat.svg"} alt="Loop" width={0} height={0} className={style.loop} />
                </button>
            </div>
            <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onTimeChange={onTimeChange}
                onDoubleClick={onDoubleClick}
                className={style.progressBarHide}
            />
        </div>
    );
};

export default Controls;
