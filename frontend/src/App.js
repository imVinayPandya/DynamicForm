import './App.css';
import { Button, Layout } from 'antd';
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
          <Header>header</Header>
          <Layout>
            <Sider>left sidebar</Sider>
            <Content>
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
            <Sider>right sidebar</Sider>
          </Layout>
          {/* <Footer>footer</Footer> */}
        </Layout>
      </Router>
    </div>
  );
}

export default App;
