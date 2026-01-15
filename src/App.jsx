import { useEffect, useState } from 'react'
import './App.css'
import { initEcho } from './lib/echo'
import { login, updateUser } from './lib/api_requests'

function App() {
  const [echoInstance, setEchoInstance] = useState(null);
  const [user, setUser] = useState({
    id: 2,
    name: 'Foster Amponsah Asante',
    email: 'fostersnt@gmail.com',
  });

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    if (echoInstance) {
      echoInstance.disconnect();
    }
    //! Ensure the below route is valid inside your react routes
    window.location.href = '/login';
  };

  useEffect(() => {
    async function setup() {
      const apiToken = localStorage.getItem('AUTH_TOKEN');
      await login(user.email, 'password');
      const echo = initEcho(apiToken);
      setEchoInstance(echo);

      await updateUser();

      echo.private(`user.${user.id}`)
        .listen(".user.updated", (e) => {
          console.log("HELLO WORLD");
          console.table(JSON.stringify(e.user));
          setUser(e.user);
        });
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
    </>
  )
}

export default App
