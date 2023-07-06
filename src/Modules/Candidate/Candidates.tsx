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
    },
  ];

  return (
    <div>
      <Title>Candidates</Title>
      <Search
        placeholder="Search Candidate"
        style={{ width: 200 }}
        onSearch={onSearch}
        enterButton
      />
      <Table dataSource={candidates} columns={columns} />
    </div>
  );
  return <div>{/* <Main /> */}</div>;
};

export default Candidates;
