import React, { useEffect, useState } from 'react';
import { Form,Popconfirm, Table, Typography } from 'antd';
import { ChallengeAPIService } from './services/Challenge.API';
import EditableCell from './EditableCell';
import Loader from './Loader';
import { DeleteOutlined, EditFilled, SelectOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Difficulty,difficultyMap } from '../../types/Models';

interface Item {
  id: string;
  name: string;
  language: string;
  difficulty: string;
}

const ChallengesTable: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState<Item[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchCandidates = async () => {
    setIsFetching(true);
    try {
      const data = await ChallengeAPIService.getAll();
      setData(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({ name: '', language: '', difficulty: '', ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
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
      //     return filteredAssessments.length > 0;
      // },
  },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Link to={`/challenges/${record.id}`} ><SelectOutlined style={{color:"blue",marginRight:12}}/></Link>
            <Link to={`/challenges/edit/${record.id}`}><EditFilled /></Link>
            <DeleteOutlined style={{color:"red",marginLeft:12}} />
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'difficulty' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <h3>Custom challenges</h3>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowKey="id"
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default ChallengesTable;
