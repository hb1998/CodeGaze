const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
};

const compareTimestamps = (a: string, b: string) => {
    const timestampA = new Date(a).getTime();
    const timestampB = new Date(b).getTime();
    return timestampA - timestampB;
};

export const candidateColumn = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 3,
        },
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'id',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Email',
        dataIndex: 'emailId',
        key: 'id',
    },
    {
        title: 'Language',
        dataIndex: ['assessment', 0, 'language'],
        key: 'id',
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
        // onFilter: (value: string, record) => record.language.indexOf(value) === 0,  // Not fixed the filter in language column
    },
    {
        title: 'Status',
        dataIndex: ['assessment', 0, 'status'],
        key: 'id',
        sorter: {
            compare: (a, b) => a.status - b.status,
            multiple: 3,
        },
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'id',
        render: (timestamp: string) => formatTimestamp(timestamp),
        sorter: (a, b) => compareTimestamps(formatTimestamp(a.created_at), formatTimestamp(b.created_at)),
    },
];
