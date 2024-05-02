import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { IRootState } from '../../../store';
import { ChallengeAPIService } from '../../Challenges/services/Challenge.API';
import { Challenge } from '../../../types/Models';
import { supabase } from '../../API/supabase';
import { FUNCTIONS } from '../../../constants/functions.constants';
import Editor from './Editor';
import { Skeleton } from 'antd';

const EditorContainer = () => {
    const { state } = useLocation();
    const assessment = useSelector((state: IRootState) => state.assessment);
    const candidate = useSelector((state: IRootState) => state.candidate);

    const [challenge, setChallenge] = useState<Challenge>(null);

    const { challengeId } = useParams<{ challengeId: string }>();

    useEffect(() => {
        async function loadChallenge() {
            if (state) {
                setChallenge(state?.challenge);
            } else if (candidate?.token) {
                await supabase.functions.setAuth(candidate.token);
                const { data: challenge } = await supabase.functions.invoke(FUNCTIONS.GET_CHALLENGE, {
                    body: {
                        challengeId,
                    },
                });
                setChallenge(challenge as Challenge);
            } else {
                ChallengeAPIService.getById(challengeId)
                    .then((response) => {
                        setChallenge(response as unknown as Challenge);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
        loadChallenge();
    }, [challengeId, candidate, state]);

    const allDepsLoaded = assessment && challenge && candidate;
    return allDepsLoaded ? (
        <Editor assessment={assessment} challenge={challenge} candidate={candidate} />
    ) : (
        <div style={{ padding: '1rem' }}>
            <Skeleton />
        </div>
    );
};

export default EditorContainer;
