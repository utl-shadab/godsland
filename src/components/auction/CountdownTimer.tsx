import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, onEnd }: { targetDate: Date; onEnd?: () => void }) => {
    const [timeLeft, setTimeLeft] = useState<{
        hours: number;
        minutes: number;
        seconds: number;
        isExpired: boolean;
    }>({ hours: 0, minutes: 0, seconds: 0, isExpired: false });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                    isExpired: false
                };
            }
            return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
        };

        const timer = setInterval(() => {
            const calculated = calculateTimeLeft();
            setTimeLeft(calculated);
            if (calculated.isExpired) {
                clearInterval(timer);
                if (onEnd) onEnd();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onEnd]);

    if (timeLeft.isExpired) {
        return <span className="text-red-500 font-bold uppercase text-[10px] tracking-wide">Ended</span>;
    }

    return (
        <span className="tabular-nums font-mono font-bold text-neon-green text-xs tracking-wider">
            {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
    );
};

export default CountdownTimer;
