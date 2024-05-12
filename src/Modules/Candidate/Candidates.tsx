import { useState, ChangeEvent, useMemo } from 'react';
import Search from 'antd/es/input/Search';
import { Typography } from 'antd';
import { Table } from 'antd';

import { CandidateAPIService } from './services/Candidate.API';
import { candidateColumn } from './CandidateColumn';
import { useQuery } from '@tanstack/react-query';

const { Title } = Typography;


const Candidates = () => {
    const [search, setSearch] = useState('');

    const {
        data: exams,
        isLoading,
    } = useQuery({
        queryKey: ['exams'],
        queryFn: CandidateAPIService.getAll,
    });

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
    };

    const filteredCandidates = useMemo(() => {
        return exams?.filter((exam) => exam.name.toLowerCase().includes(search.toLowerCase()));
    }, [exams, search]);

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
                loading={isLoading}
                style={{ overflowX: 'auto' }}
            />
        </div>
    );
};

export default Candidates;
