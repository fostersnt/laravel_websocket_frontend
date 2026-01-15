import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initEcho } from './lib/echo'
import { login, updateUser } from './lib/api_requests'

function App() {
  const [count, setCount] = useState(0)
  const [echoInstance, setEchoInstance] = useState(null);
  const [user, setUser] = useState({
    id: 2,
    name: 'Foster Amponsah Asante',
    email: 'fostersnt@gmail.com',
  });

  // const user = {
  //   id: 2,
  //   name: 'Foster Amponsah Asante',
  //   email: 'fostersnt@gmail.com',
  // };

  const logout = () => {
    // 1. Tell Laravel to revoke the token (optional but secure)
    // axios.post('/api/logout'); 

    // 2. Clear the token from React
    localStorage.removeItem('AUTH_TOKEN');

    // 3. Disconnect Echo so it stops listening to private channels
    if (echoInstance) {
        echoInstance.disconnect();
    }
    
    // 4. Redirect to login
    window.location.href = '/login';
};

  useEffect(() => {
    async function setup() {
      const apiToken = localStorage.getItem('AUTH_TOKEN');
      await login(user.email, 'password');  // Login first
      const echo = initEcho(apiToken);               // Then init Echo
      setEchoInstance(echo);

      await updateUser();

      echo.private(`user.${user.id}`)
        .listen(".user.updated", (e) => {
          console.log("HELLO WORLD");
          console.table(JSON.stringify(e.user));
          setUser(e.user);
        });

      // return () => echo.leave(`user.${user.id}`);
    }

    setup();

    return () => {
      if (echoInstance) echoInstance.leave(`user.${user.id}`);
    };
  }, [user.id]);

  return (
    <>
      <div className="">
        <h1 className="">WELCOME TO REACT WEBSOCKET</h1>
        <h1 className="">Hi {user.name}</h1>
      </div>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
