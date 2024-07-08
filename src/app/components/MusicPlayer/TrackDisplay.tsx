import React from 'react';
import Image from 'next/image';
import style from './TrackDisplay.module.scss';
import HeartShapeBtn from '../Button/HeartShapeBtn';
import Link from 'next/link';

interface TrackDisplayProps {
    currentTrack: {
        title: string;
        artist: string;
        albumArt: string;
    };
}

const TrackDisplay = ({ currentTrack }: TrackDisplayProps) => {
    const truncatedTitle = currentTrack.title.length > 20 ? `${currentTrack.title.slice(0, 20)}...` : currentTrack.title;
    const truncatedArtist = currentTrack.artist.length > 20 ? `${currentTrack.artist.slice(0, 20)}...` : currentTrack.artist;

    return (
        <Link href="/">
            <div className={style.container}>
                <Image src={currentTrack.albumArt} alt="Album Art" width={134} height={112} className={style.img} />
                <div className={style.text}>
                    <span className={style.title}>{truncatedTitle}</span>
                    <span className={style.artist}>{truncatedArtist}</span>
                </div>
                <HeartShapeBtn isActive={true} isDisabled={false} onClick={() => console.log('Button clicked!')} className={style.heartBtn} />
            </div>
        </Link>

    );
};

export default TrackDisplay;
