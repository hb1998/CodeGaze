import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../API/supabase';
function Auth() {
    return (
        <div>
            <h1>Welcome to Lumel Assessment </h1>
            <div>
                <Link to="/Login">
                    <Button style={{ marginRight: 10 }}>Login</Button>
                </Link>

                <Link to="/Register">
                    <Button>Register</Button>
                </Link>
            </div>
        </div>
    );
}

export default Auth;
