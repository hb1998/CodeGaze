 
 import React from 'react';
 import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
 import type { MenuProps } from 'antd';
 import {  Layout, Menu, theme } from 'antd';
import Card from 'antd/es/card/Card';
 
 const { Content, Sider } = Layout;
 
 const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
   key,
   label: `nav ${key}`,
 }));
 
 const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
   (icon, index) => {
     const key = String(index + 1);
 
     return {
       key: `sub${key}`,
       icon: React.createElement(icon),
       label: `subnav ${key}`,
 
       children: new Array(4).fill(null).map((_, j) => {
         const subKey = index * 4 + j + 1;
         return {
           key: subKey,
           label: `option${subKey}`,
         };
       }),
     };
   },
 );
 
 const ChallengesAssessment: React.FC = () => {
   const {
     token: { colorBgContainer },
   } = theme.useToken();
 
   return (
     <Layout>
      
       <Content style={{ padding: '0 50px' }}>       
         <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
           <Sider style={{ background: colorBgContainer }} width={200}>
             <Menu
               mode="inline"
               defaultSelectedKeys={['1']}
               defaultOpenKeys={['sub1']}
               style={{ height: '100%' }}
               items={items2}
             />
           </Sider>
           <Content style={{ padding: '0 24px', minHeight: 280 }}>Content
            <Card> </Card>
            </Content>
         </Layout>
       </Content>
       {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
     </Layout>
   );
 };
 
 
 
 
 
 
 
 
 
 
 
 
 


 export default ChallengesAssessment;