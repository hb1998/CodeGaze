import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { ChallengeAPIService } from './services/Challenge.API';
import { challengeColumn } from './ChallengeColumn';

interface IChallenges {
  id: string;
  name: string;
  language: string;
  difficulty: string;
}


const Candidates = () => {
    const [challenges, setChallenges] = useState<IChallenges[]>([]);

    const fetchChallenges = async () => {
        try {
            const data = await ChallengeAPIService.getAll();
            setChallenges(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    useEffect(() => {
        fetchChallenges();
    }, []);

  

    return (
        <div style={{ padding: '10px' }}>
           <h3>Custom challenges</h3>
            <Table rowKey="id" dataSource={challenges} columns={challengeColumn} size="small" />
        </div>
    );
 
};

export default Candidates;
