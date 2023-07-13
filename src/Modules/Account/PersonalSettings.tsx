import { Button, Col, Row, Switch } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PersonalSettings() {
    const [toggleValue, setToggleValue] = useState(false);
    const handleToggle = () => {
        setToggleValue((state) => !state);
    };
    return (
        <div>
            <Row>
                <Col span={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Email Notifications</h3>
                        <Switch checked={toggleValue} onChange={handleToggle} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <div>
                        <Button type="primary">Reset Password</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
