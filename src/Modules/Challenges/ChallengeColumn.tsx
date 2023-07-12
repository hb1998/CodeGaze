import { Link } from 'react-router-dom';
import { Difficulty,difficultyMap } from '../../types/Models';
import { DeleteOutlined, EditFilled, SelectOutlined } from '@ant-design/icons';

interface Item {
  id: string;
  name: string;
  language: string;
  difficulty: string;
}

export const challengeColumn = [
    {
      title: 'key',
      dataIndex: ['exam_challenge', 0, 'id'],
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
      editable: true,
    },
    {
      title: 'Language',
      dataIndex: ['assessment', 0, 'language'],
      key: 'id',
      editable: true,
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
      dataIndex: ['challenge', 0, 'difficulty'],
      key: 'id',
      render: (difficulty: Difficulty) => difficultyMap[difficulty],
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
      // onFilter: (value, record) => {
      //     const filteredChallenges = record.challenge.filter((challenge) => {
      //         return challenge.status.toString() === value;
      //     });
      //     return filteredChallenges.length > 0;
      // },
  },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: any, record: Item) => {
        return (
          <>
            <Link to={`/challenges/${record.id}`} ><SelectOutlined style={{color:"blue",marginRight:12}}/></Link>
            <Link to={`/challenges/edit/${record.id}`}><EditFilled /></Link>
            <DeleteOutlined style={{color:"red",marginLeft:12}} />
          </>
        );
      },
    },
  ];









