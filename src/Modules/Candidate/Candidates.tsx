import { useState, useEffect } from "react";
import { Table } from "antd";
import { CandidateAPIService } from "./services/Candidate.API";
import Search from "antd/es/input/Search";
import { Typography } from "antd";
// import Main from "../common/CodeEditor/Main";

const { Title } = Typography;

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const onSearch = (value: string) => console.log(value);

  const fetchCandidates = async () => {
    try {
      const data = await CandidateAPIService.getAll();
      // const assessmentData = data.map();
      console.log(
        "🚀 ~ file: Candidates.tsx:16 ~ fetchCandidates ~ data:",
        data
      );
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "emailId",
      key: "id",
    },
    {
      title: "Language",
      dataIndex: ["assessment", 0, "language"],
      key: "id",
    },
    {
      title: "Status",
      dataIndex: ["assessment", 0, "status"],
      key: "id",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "id",
      render: (timestamp: string) => formatTimestamp(timestamp),
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <Title>Candidates</Title>
      <Search
        placeholder="Search Candidate"
        style={{ width: 200, marginBottom: "10px" }}
        onSearch={onSearch}
        enterButton
      />
      <Table dataSource={candidates} columns={columns} />
    </div>
  );
  return <div>{/* <Main /> */}</div>;
};

export default Candidates;
