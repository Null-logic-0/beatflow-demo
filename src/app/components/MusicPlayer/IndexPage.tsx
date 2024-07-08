import React, { useState, useRef, useEffect, useCallback } from 'react';
import Contorls from './Contorls';
import TrackDisplay from './TrackDisplay';
import VolumeControl from './VolumeControl';
import style from './IndexPage.module.scss';

const tracks = [
    {
        title: 'Voyage Voyage',
        artist: 'Desireless',
        albumArt: '/music/DesirelessCover.jpg',
        audio: '/music/Desireless.mp3',
    },
    {
        title: 'Enjoy The Silence',
        artist: 'Depeche Mode',
        albumArt: '/music/D.jpg',
        audio: '/music/EnjoyTheSilence.mp3',
    },
    {
        title: 'Tourner Dans Le Vide',
        artist: 'Indila',
        albumArt: '/music/indila.jpg',
        audio: '/music/Indila.mp3',
    },
    {
        title: 'Santa Lucia',
        artist: 'Quest Pistols Show',
        albumArt: '/music/questPistols.jpg',
        audio: '/music/santaLucia.mp3',
    },
    {
        title: 'Name 505',
        artist: 'Vremya i steklo',
        albumArt: '/music/505.jpg',
        audio: '/music/Ymia505.mp3',
    },
];

const IndexPage = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = tracks[currentTrackIndex];

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume / 100;
            audio.loop = isLooping;
        }
    }, [volume, isLooping]);

    const playNextTrack = useCallback(() => {
        const newIndex = isShuffling
            ? Math.floor(Math.random() * tracks.length)
            : (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(newIndex);
        setCurrentTime(0);
        setIsPlaying(true);
    }, [isShuffling, currentTrackIndex]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleTrackEnded = () => {
            playNextTrack();
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleTrackEnded);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleTrackEnded);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [playNextTrack]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => console.error("Playback failed:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const playPause = useCallback(() => {
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
    }, []);

    const playPrevious = useCallback(() => {
        const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        setCurrentTrackIndex(newIndex);
        setCurrentTime(0);
        setIsPlaying(true);
    }, [currentTrackIndex]);

    const handleVolumeChange = useCallback((newVolume: number) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    }, []);

    const toggleLoop = useCallback(() => {
        setIsLooping(prevIsLooping => !prevIsLooping);
    }, []);

    const toggleShuffle = useCallback(() => {
        setIsShuffling(prevIsShuffling => !prevIsShuffling);
    }, []);

    const handleTimeChange = useCallback((newTime: number) => {
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    }, []);

    const handleDoubleClick = useCallback(() => {
        const newTime = Math.min(currentTime + 10, duration);
        handleTimeChange(newTime);
    }, [currentTime, duration, handleTimeChange]);

    return (
        <div className={style.main}>
            <div className={style.container}>
                <TrackDisplay currentTrack={currentTrack} />
                <Contorls
                    isPlaying={isPlaying}
                    onPlayPause={playPause}
                    onNext={playNextTrack}
                    onPrevious={playPrevious}
                    isLooping={isLooping}
                    onToggleLoop={toggleLoop}
                    isShuffling={isShuffling}
                    onToggleShuffle={toggleShuffle}
                    currentTime={currentTime}
                    duration={duration}
                    onTimeChange={handleTimeChange}
                    onDoubleClick={handleDoubleClick}
                />
                <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
                <audio
                    ref={audioRef}
                    src={currentTrack.audio}
                    onError={() => console.error('Audio failed to load')}
                />
            </div>
        </div>
    );
};

export default IndexPage;
