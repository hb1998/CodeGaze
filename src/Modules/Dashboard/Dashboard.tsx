
import { useEffect } from 'react'

// Create a single supabase client for interacting with your database

const Dashboard = () => {

  useEffect(() => {
    async function fetchData() {
      let { data: candidate, error } = await supabase
        .from('candidate')
        .select('id')
        console.log(candidate);
    }
    fetchData();

  }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard