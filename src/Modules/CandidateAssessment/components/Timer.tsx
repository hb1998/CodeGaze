import { Typography } from 'antd';
import { useState, useEffect } from 'react';
const { Title } = Typography;

interface IProps {
    timeLeft: number;
}

const Timer: React.FC<IProps> = (props: IProps) => {
    const [timeLeft, setTimeLeft] = useState(props.timeLeft);

    useEffect(() => {
        setTimeLeft(props.timeLeft);
    }, [props.timeLeft]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <Title level={4}>
            <div className='flex-container row timer' >
                Time Left <span>{formatTime(timeLeft)}</span>
            </div>
        </Title>
    );
};

export default Timer;
