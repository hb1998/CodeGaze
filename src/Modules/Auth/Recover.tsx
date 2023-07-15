import React from 'react';
import { supabase } from '../API/supabase';

export default function Recover() {
    return (
        <div>
            Recover
            <div>
                <button
                    onClick={async () => {
                        let data = await supabase.auth.resetPasswordForEmail('keerthivasannataraj@gmail.com', {
                            redirectTo: 'http://example.com/account/update-password',
                        });
                        console.log(data);
                    }}
                >
                    submit
                </button>
            </div>
        </div>
    );
}
