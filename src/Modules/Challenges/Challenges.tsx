import React, { useState } from 'react';
import ChallengesTable from './ChallengesTable';
import { Challenge } from '../../types/Models';
import { ChallengeForm } from './ChallengeForm';
import { ChallengeAPIService } from './services/Challenge.API';
import { useQuery } from '@tanstack/react-query';

export type ChallengeResult = Awaited<ReturnType<typeof ChallengeAPIService.getAll>>;

const Challenges: React.FC = () => {
    const [modalState, setModalState] = useState({
        open: false,
        values: null,
    });

    const {
        data: challenges,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['challenges'],
        queryFn: ChallengeAPIService.getAll,
    });

    const onCreate = () => {
        setModalState({
            open: false,
            values: null,
        });
        refetch();
    };

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
                loading={isLoading}
                challenges={challenges || []}
                refreshTable={() => {
                    refetch();
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
