import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { ChallengeAPIService } from './services/Challenge.API';
import { challengeColumn } from './ChallengeColumn';
import { Difficulty } from '../../types/Models';

interface IChallenges {
  id: string;
  name: string;
  language: string;
  difficulty: Difficulty;
}


const Candidates = () => {
    const [challenges, setChallenges] = useState<IChallenges[]>([]);
    const [filteredChallenges, setFilteredChallenges] = useState<IChallenges[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchChallenges = async () => {
        try {
            const data = await ChallengeAPIService.getAll();
            setChallenges(data);
            setFilteredChallenges(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChallenges();
    }, []);

  

    return (
        <div style={{ padding: '10px' }}>
           <h3>Custom challenges</h3>
            <Table rowKey="id" dataSource={ filteredChallenges} columns={challengeColumn} size="small" loading={loading} />
        </div>
    );
 
};

export default Candidates;
