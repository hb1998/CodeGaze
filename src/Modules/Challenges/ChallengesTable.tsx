import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { Button, Table } from 'antd';
import { ChallengeAPIService } from './services/Challenge.API';
import { challengeColumn } from './ChallengeColumn';
import { Challenge } from '../../types/Models';
import Title from 'antd/es/typography/Title';
import Search from 'antd/es/input/Search';
import { AppstoreAddOutlined } from '@ant-design/icons';

const ChallengeTable = ({ openForm }) => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [search, setsearch] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const fetchChallenges = async () => {
        try {
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

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setsearch(value);
    };

    const filteredChallenges = useMemo(() => {
        return challenges.filter((challenge) => {
            return challenge.name?.toLowerCase().includes(search.toLowerCase());
        });
    }, [challenges, search]);

    const columnDef = challengeColumn(openForm);
    return (
        <div className="container">
            <Title level={2}>Challenges</Title>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Search
                    placeholder="Search Challenge"
                    style={{ width: 200, marginBottom: '10px' }}
                    onChange={handleSearch}
                />
                <Button
                    type="primary"
                    icon={<AppstoreAddOutlined />}
                    onClick={() => {
                        openForm();
                    }}
                >
                    Create Challenge
                </Button>
            </div>
            <Table rowKey="id" dataSource={filteredChallenges} columns={columnDef} size="small" loading={loading} />
        </div>
    );
};

export default ChallengeTable;
