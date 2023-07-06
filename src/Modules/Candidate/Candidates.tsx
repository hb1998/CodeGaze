import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { CandidateAPIService } from './services/Candidate.API';
import Search from 'antd/es/input/Search';
import { Typography } from 'antd';
import { candidateColumn } from './support/CandidateColumn';

// import Main from "../common/CodeEditor/Main";

const { Title } = Typography;

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);

    const fetchCandidates = async () => {
        try {
            const data = await CandidateAPIService.getAll();
            // const assessmentData = data.map();
            console.log('🚀 ~ file: Candidates.tsx:16 ~ fetchCandidates ~ data:', data);
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
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
            <Table dataSource={candidates} columns={candidateColumn} size="small" />
        </div>
    );
    // return <div>{/* <Main /> */}</div>;
};

export default Candidates;
