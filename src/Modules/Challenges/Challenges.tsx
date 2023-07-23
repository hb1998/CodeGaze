import React, { useEffect, useState } from 'react';
import ChallengesTable from './ChallengesTable';
import { Challenge } from '../../types/Models';
import { ChallengeForm } from './ChallengeForm';
import { ChallengeAPIService } from './services/Challenge.API';

export type ChallengeResult = Awaited<ReturnType<typeof ChallengeAPIService.getAll>>;

const Challenges: React.FC = () => {
    const [modalState, setModalState] = useState({
        open: false,
        values: null,
    });
    const [challenges, setChallenges] = useState<ChallengeResult>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const onCreate = () => {
        setModalState({
            open: false,
            values: null,
        });
        fetchChallenges();
    };

    const fetchChallenges = async () => {
        try {
            setLoading(true);
            const data = await ChallengeAPIService.getAll();
            setChallenges(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChallenges();
    }, []);
    return (
        <>
            <div>
                <ChallengeForm
                    open={modalState.open}
                    onCreate={onCreate}
                    onCancel={() => {
                        setModalState({
                            open: false,
                            values: null,
                        });
                    }}
                    challenge={modalState.values}
                />
            </div>
            <ChallengesTable
                loading={loading}
                challenges={challenges}
                refreshTable={() => {
                    fetchChallenges();
                }}
                openForm={(values: Challenge) => {
                    setModalState({
                        open: true,
                        values,
                    });
                }}
            />
        </>
    );
};

export default Challenges;
