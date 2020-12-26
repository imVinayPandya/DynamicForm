import './App.css';
import { Layout, Divider, Typography } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddNewForm from './components/AddNewForm/AddNewForm';
import FormList from './components/FormList/FormList';
import ViewForm from './components/ViewForm/ViewForm';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Header></Header>
          <Layout>
            <Sider></Sider>
            <Content style={{ minHeight: '1000px' }}>
              <Divider>
                <Typography.Title>Create Dynamic Form</Typography.Title>
              </Divider>
              <Switch>
                <Route path="/:formId">
                  <ViewForm />
                </Route>
                <Route path="/">
                  <AddNewForm />
                  <FormList />
                </Route>
              </Switch>
            </Content>
            <Sider></Sider>
          </Layout>
          <Footer>Created by Vinay Pandya</Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
