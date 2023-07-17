import { Link, Navigate } from 'react-router-dom';
import { Difficulty, difficultyMap } from '../../types/Models';
import { DeleteOutlined, EditFilled, SelectOutlined } from '@ant-design/icons';
import Edit from './UpdateChallenge';
import { Popconfirm, Space, Tag } from 'antd';
import CommonUtils from '../common/utils/Common.utils';
import { ChallengeAPIService } from './services/Challenge.API';

interface Item {
  id: string;
  name: string;
  language: string;
  difficulty: string;
}

export const challengeColumn = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'id',
    editable: true,
  },
  {
    title: 'Description',
    dataIndex: 'short_description',
    key: 'id',
    editable: true,
  },
  {
    title: 'Language',
    dataIndex: ['assessment', 0, 'language'],
    key: 'id',
    editable: true,
    render: (text, record) => <div>5 Language</div>,
    filters: [
      {
        text: 'JavaScript',
        value: 'javascript',
      },
      {
        text: 'Python',
        value: 'python',
      },
      {
        text: 'Java',
        value: 'java',
      },
      {
        text: 'C++',
        value: 'c++',
      },
      {
        text: 'C',
        value: 'c',
      },
    ],
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
    key: 'id',
    render: (difficulty: Difficulty) => <Tag color={CommonUtils.getColor(difficulty)}>{difficultyMap[difficulty]}</Tag>,
    filters: [
      {
        text: 'Easy',
        value: Difficulty.easy.toString(),
      },
      {
        text: 'Medium',
        value: Difficulty.medium.toString(),
      },
      {
        text: 'Hard',
        value: Difficulty.hard.toString(),
      },
    ],
    onFilter: (value, record) => record?.difficulty?.toString?.() === value,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: (_: any, record: Item) => {
      const handleDelete = async () => {
        try {
          await ChallengeAPIService.delete(Number(record.id));
          window.location.href = '/challenges'; 
        } catch (error) {
          console.error('Error deleting record:', error);
        }
      };
      return (
        <>
          <Space align='baseline'>
            <Link to={`/challenges/${record.id}`} state={record} ><SelectOutlined style={{ color: "blue", marginRight: 12 }} /></Link>
            {/* <Edit param={record.id} /> */}
            <EditFilled />
            
            <Popconfirm
              title="Are you sure you want to delete this challenge?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} />
            </Popconfirm>
          </Space>
          
        </>
      );
    },
  },
];









