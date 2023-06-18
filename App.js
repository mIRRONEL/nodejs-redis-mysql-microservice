import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const baseUrl = "http://localhost:5001"
  const getDataUrl = `${baseUrl}/data`

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleSaveData = async () => {
    try {
      await axios.post('http://localhost:5001/create', { username, id });
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleQueryData = async () => {
    try {
      const { data } = await axios.get(getDataUrl, { params:{username: username, id: id}});
      setQueryResult(data);
      console.log('The Data is', data);
    } catch (error) {
      console.error('Error querying data:', error);
    }
  };

  return (
    <div>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        ID:
        <input type="text" value={id} onChange={handleIdChange} />
      </label>
      <br />
      <button onClick={handleSaveData}>Save Data</button>
      <button onClick={handleQueryData}>Query Data</button>
      <div>
        <h3>Query Result:</h3>
        {queryResult && (
          <React.Fragment>
            <p>Username: {queryResult.username}</p>
            <p>ID: {queryResult.id}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default App;

