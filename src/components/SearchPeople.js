import React,{useMemo}  from 'react';
import './App.css';
import {Col, Input, Row, Layout,Typography,Collapse,Card} from 'antd';
import { useHistory } from "react-router-dom";
import {useMediaQuery} from '@react-hook/media-query'   
import {
  DataSearch,
  MultiList,
  ReactiveBase 
} from '@appbaseio/reactivesearch';
export function SearchPeople() {
  let history = useHistory();

  const isSmall = useMediaQuery('only screen and (max-width: 768px)');

  const filter = useMemo(() => <Filter/>, []);
  return (
    <div className="App"> 
    <ReactiveBase url="https://1b7cf0bcaa7d41499e33bdc7d7ef0ce7.us-west1.gcp.cloud.es.io:9243" app="torre-elastic"> 
      <Layout>
            {!isSmall && <Layout.Sider width="20vw">
                <Typography.Title level={5} style={{textAlign: 'center', paddingTop: 20}}>
                    Filters
                </Typography.Title>
                {filter}
            </Layout.Sider>} 
                <Layout.Content className="content-padding" >
                    {isSmall && <Row>
                        <Col xs={{span: 24}}>
                            <Collapse defaultActiveKey={['2']} bordered={false}>
                                <Collapse.Panel header="More Filters" key="1">
                                    {filter}
                                </Collapse.Panel>
                            </Collapse>
                        </Col>
                    </Row>}
                    <Row>
                        <Card className="card-style card-fts-search"  style={{width: '100%'}}>
                            <div className="fts-search-input-wrapper">
                             
                             <DataSearch componentId="query"
                                            URLParams
                                            enableQuerySuggestions={false}
                                            enablePopularSuggestions={false}
                                            debounce={300}
                                            autosuggest={false}
                                            innerClass={{
                                                input: 'fts-search-input'
                                            }}
                                            placeholder="Search by name"
                                            dataField={['name', 'document']}/>
                            </div>
                        </Card>
                    </Row>
                    <Row>
                        Current Filters Row
                    </Row>
                    <ResultComponent isSmall={isSmall}/>
                </Layout.Content> 
          </Layout>

    </ReactiveBase>
      </div>
  );
}
 
function Filter() {             
  return <Col xs={{span: 24}} style={{padding: 5}}> 
  <Card title="Desired Salary" className="card-style">
            <MultiList componentId="Salary"
                       dataField="charges.keyword"
                       queryFormat="or"
                       showCount
                       URLParams
                       showSearch={false}
                       react={{
                           and: ['query', 'filter 2', 'filter 3', 'filter 4'],
                       }}
            />
        </Card>
  <Card title="filter 2" className="card-style" >
      
  </Card>

  <Card title="filter 3" className="card-style" >
       
  </Card>
  <Card title="filter 4"  className="card-style">
       
  </Card>
</Col>
}
function ResultComponent(props: { isSmall: boolean }) {

  return <Col xs={{span: 24}}>
      <Card title="Results" className="card-style">
          <Col xs={{span: 24}}>   
          <Row>
            Results Row 1
          </Row>
          <Row>
            Results Row 2
          </Row>
          </Col>
      </Card>
  </Col>
} 