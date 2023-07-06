
import { Table ,Layout } from "antd"
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const dataSource =[
  {"key": '1', "name":"John Smith", "age": 45,  "email":"Abc@genImagePreviewStyle.com",
  "address":'New York City',"tags":["engineer","developer"]},
  {"key": '2', "name":"Jane Doe",   "age": 38
  ,"address":'San Francisco','tags':["designer"]}

]
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Joined',
    dataIndex: 'joined',
    key: 'joined',
  },
  {
    title: 'TimeTaken',
    dataIndex: 'timetaken',
    key: 'timetaken',
  },
  {
    title: 'Cheating',
    dataIndex: 'cheating',
    key: 'cheating',
  }

];
const Analytics = () => {
    return (
      <div>
      <Layout>
      <Table dataSource={dataSource} columns={columns}> 
      </Table>
      </Layout>
      </div>
    )
  }
  
  export default Analytics