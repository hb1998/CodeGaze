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

export const candidateColumn = [
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
