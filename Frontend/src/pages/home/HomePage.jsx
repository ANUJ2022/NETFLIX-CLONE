import React from 'react';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { useSelector } from 'react-redux';


const HomePage = () => {
    
    const user = useSelector((state) => state.auth.user);
    return (
        <div>
            {user ? <HomeScreen /> : <AuthScreen />}
        </div>
    );
};

export default HomePage;
