import React,{useState,useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries/getUser';

const Dashboard = () => {
  const {  data } = useQuery(GET_USER);
  const [error, setError] = useState(null)
  const [loading,setLoading] = useState(true)
  const [userData, setUserData] = useState(null)


  useEffect(()=>{
    if(data) {
      if(data.me) {
        setUserData(data.me)
        setLoading(false)
        setError(null)
      }
    } else {
      setLoading(false)
      setError('User not authenticated')
    }
  },[data])

  if(loading) {
    return <div>Loading....</div>
  }

  if(error) {
    return <div>Error: {error}</div>
  }


  



  return (
    <div>
      <h2>Welcome to dashboard, {userData.email}</h2>
      {/* Render additional content for the Dashboard */}
    </div>
  );
};

export default Dashboard;
