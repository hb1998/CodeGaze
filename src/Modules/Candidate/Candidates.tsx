import { useState, useEffect } from 'react';
import { CandidateAPIService } from './services/Candidate.API';
import Search from 'antd/es/input/Search';
import { Typography } from 'antd';
import { candidateColumn } from './CandidateColumn';
import { Table } from 'antd';
import { Status } from '../../types/Models';

// Code Editor Main File
import Editor from '../common/CodeEditor/Editor';

const { Title } = Typography;

interface ICandidate {
    id: string;
    name: string;
    emailId: string;
    language: string;
    status: Status;
    createdAt: Date;
}

const Candidates = () => {
    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCandidates = async () => {
        try {
            const data = await CandidateAPIService.getAll();
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleSearch = (value: string) => {
        console.log(value);
    };

    return (
        <div style={{ padding: '10px' }}>
            <Title>Candidates</Title>
            <Search
                placeholder="Search Candidate"
                style={{ width: 200, marginBottom: '10px' }}
                onSearch={handleSearch}
            />
            <Table rowKey="id" dataSource={candidates} columns={candidateColumn} size="small" loading={loading} />
            <Editor />
        </div>
    );
};

export default Candidates;
