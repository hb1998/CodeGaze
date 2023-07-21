import { useState, useEffect, ChangeEvent } from 'react';
import Search from 'antd/es/input/Search';
import { Typography } from 'antd';
import { Table } from 'antd';

import { CandidateAPIService } from './services/Candidate.API';
import { candidateColumn } from './CandidateColumn';
import { Status } from '../../types/Models';

const { Title } = Typography;

interface ICandidate {
    id: string;
    name: string;
    emailId: string;
    language: string;
    status: Status;
    createdAt: Date;
}

type CandidateQueryResult = Awaited<ReturnType<typeof CandidateAPIService.getAll>>;

const Candidates = () => {
    const [candidates, setCandidates] = useState<CandidateQueryResult>([]);
    const [filteredCandidates, setFilteredCandidates] = useState<CandidateQueryResult>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCandidates = async () => {
        try {
            const data = await CandidateAPIService.getAll();
            setCandidates(data);
            setFilteredCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const filtered = candidates.filter((candidate) => candidate.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredCandidates(filtered);
    };

    return (
        <div className="container">
            <Title>Candidates</Title>
            <Search
                placeholder="Search Candidate"
                style={{ width: 200, marginBottom: '10px' }}
                onChange={handleSearch}
            />
            <Table
                rowKey="id"
                dataSource={filteredCandidates}
                columns={candidateColumn}
                size="small"
                loading={loading}
                style={{ overflowX: 'auto' }}
            />
        </div>
    );
};

export default Candidates;
