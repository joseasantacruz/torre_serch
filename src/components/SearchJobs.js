import React,{useMemo, useEffect, useState}  from 'react';
import './App.css';
import {Col, Row, Layout,Typography,Collapse,Card,Checkbox} from 'antd';
import { useHistory } from "react-router-dom";
import {useMediaQuery} from '@react-hook/media-query'
 
export function SearchJobs(props) {
  let history = useHistory();

  const [result, setResult] = useState()
  const [params, setParams] = useState( {
      offset: 0,
      size: 0,
      aggregate: true
  })

  
  const [organization_limit, setOrganizationLimit] = useState(5)
  const [skill_limit, setSkillLimit] = useState(5)
  const [filters, setFilters] = useState( { })
  const isSmall = useMediaQuery('only screen and (max-width: 768px)');
 
  useEffect(() =>{
    doQuery(params,filters)
        .then(d => setResult(d))
}, [params,filters])
  return (
    <div className="App">  
      <Layout>
            {!isSmall &&  <div className="layout-div">
              <Layout.Sider >
                <Typography.Title level={5} style={{textAlign: 'center', paddingTop: 20, color: 'white',fontSize: '20px'  }}>
                    Jobs Filters
                </Typography.Title>
                <Col xs={{span: 24}} style={{padding: 5}}> 
                  <Card title="Remote" className="card-style"> 
                    <SearchFilter list={result?.aggregators?.remote || []}
                        onChange={e => setFilters({...filters, remote: e})}  />
                  </Card>
                  <Card title="Organizations" className="card-style"> 
                    <SearchFilterLimit list={result?.aggregators?.organization || []}
                        onChange={e => setFilters({...filters, organization: e})}  
                        limit={organization_limit} />  
                        <button className="button-style" onClick={() => setOrganizationLimit(organization_limit + 10)}> SEE MORE</button>
                        {organization_limit>5 &&   
                          <button className="button-style" onClick={() => setOrganizationLimit(organization_limit - 10)}> SEE LESS</button>} 
                  </Card>
                  <Card title="Skills" className="card-style"> 
                    <SearchFilterLimit list={result?.aggregators?.skill || []}
                        onChange={e => setFilters({...filters, skill: e})}  
                        limit={skill_limit} />  
                        <button className="button-style" onClick={() => setSkillLimit(skill_limit + 10)}> SEE MORE</button>
                        {skill_limit>5 &&   
                          <button className="button-style" onClick={() => setSkillLimit(skill_limit - 10)}> SEE LESS</button>} 
                  </Card>
                  <Card title="Compensation Ranges" className="card-style"> 
                    <SearchFilter list={result?.aggregators?.compensationrange || []}
                        onChange={e => setFilters({...filters, compensationrange: e})}  />
                  </Card>
                  <Card title="Types" className="card-style"> 
                    <SearchFilter list={result?.aggregators?.type || []}
                        onChange={e => setFilters({...filters, type: e})}  />
                  </Card>
                  <Card title="status" className="card-style"> 
                    <SearchFilter list={result?.aggregators?.status || []}
                        onChange={e => setFilters({...filters, status: e})}  />
                  </Card>
                </Col>
            </Layout.Sider>
              <Layout className="site-layout" >
                <Row  > 
                  <Card className="card-style card-fts-search"  style={{width: '100%'}}>
                      <div className="fts-search-input-wrapper">
                        
                        input to Search jobs
                      </div>
                  </Card>
                </Row>  
                <Row  > 
                  <Card className="card-style card-fts-search"  style={{width: '100%'}}>
                      <div className="fts-search-input-wrapper">
                      Current Filters Row 
                      </div>
                  </Card>
                </Row>  

                <ResultComponent isSmall={isSmall}/>
              </Layout>
            </div>} 
                <Layout.Content className="content-padding" >
                    {isSmall && <Row>
                        <Col xs={{span: 24}}>
                            <Collapse defaultActiveKey={['2']} bordered={false}>
                                <Collapse.Panel header="More Filters" key="1">
                                  <Col xs={{span: 24}} style={{padding: 5}}> 
                                    <Card title="Remote" className="card-style"> 
                                      <SearchFilter list={result?.aggregators?.remote || []}
                                          onChange={e => setFilters({...filters, remote: e})}  />
                                    </Card>
                                    <Card title="Organizations" className="card-style"> 
                                      <SearchFilterLimit list={result?.aggregators?.organization || []}
                                          onChange={e => setFilters({...filters, organization: e})}  
                                          limit={organization_limit} />  
                                          <button className="button-style" onClick={() => setOrganizationLimit(organization_limit + 10)}> SEE MORE</button>
                                          {organization_limit>5 &&   
                                            <button className="button-style" onClick={() => setOrganizationLimit(organization_limit - 10)}> SEE LESS</button>} 
                                    </Card>
                                    <Card title="Skills" className="card-style"> 
                                      <SearchFilterLimit list={result?.aggregators?.skill || []}
                                          onChange={e => setFilters({...filters, skill: e})}  
                                          limit={skill_limit} />  
                                          <button className="button-style" onClick={() => setSkillLimit(skill_limit + 10)}> SEE MORE</button>
                                          {skill_limit>5 &&   
                                            <button className="button-style" onClick={() => setSkillLimit(skill_limit - 10)}> SEE LESS</button>} 
                                    </Card>
                                    

                                    <Card title="Compensation Ranges" className="card-style"> 
                                      <SearchFilter list={result?.aggregators?.compensationrange || []}
                                          onChange={e => setFilters({...filters, compensationrange: e})}  />
                                    </Card>
                                    <Card title="Types" className="card-style"> 
                                      <SearchFilter list={result?.aggregators?.type || []}
                                          onChange={e => setFilters({...filters, type: e})}  />
                                    </Card>
                                    <Card title="status" className="card-style"> 
                                      <SearchFilter list={result?.aggregators?.status || []}
                                          onChange={e => setFilters({...filters, status: e})}  />
                                    </Card>
                                  </Col>
                                </Collapse.Panel>
                            </Collapse>
                        </Col>
                        <Col  > 
                          <Card className="card-style card-fts-search"  style={{width: '100%'}}>
                              <div className="fts-search-input-wrapper">
                                
                                input to Search people
                              </div>
                          </Card>
                        </Col>  
                        <Col  > 
                          <Card className="card-style card-fts-search"  style={{width: '100%'}}>
                              <div className="fts-search-input-wrapper">
                              Current Filters Row 
                              </div>
                          </Card>
                        </Col>  

                        <ResultComponent isSmall={isSmall}/>
                    </Row>}
                     
                </Layout.Content> 
          </Layout>
 
      </div>
  );
} 
function ResultComponent(props) {

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

function SearchFilter(props) {
  const options = props.list.map(item  => {
      return {
          label: `${item.value} (${item.total})`, value: item.value
      }
  })
  return <Checkbox.Group  options={options} 
          onChange={props.onChange} />
}


function SearchFilterLimit(props) {
  console.log(".limit: ", props.limit)
  const options = props.list.slice(0, props.limit).map(item  => {
      return {
          label: `${item.value} (${item.total})`, value: item.value
      }
  })
  return <Checkbox.Group  options={options} 
          onChange={props.onChange} />
}

/* 
{

  offset::::::::::::::::::::::::::::::::::::::    number
  size: nubmer
  aggreate: boolean,
  openTo: Array de strings

  other: {

  }
}

*/
function doQuery(params,filters) {

  console.log("filters:", filters)

  var requestOptions = {
      method: 'POST',
      redirect: 'follow',
     // body: JSON.stringify({ agregamePorOpen: filters.openTo })
    };
    
  return fetch(`https://search.torre.co/opportunities/_search/?offset=${params.offset}&size=${params.size}&aggregate=${params.aggregate}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
}

/*function CurrentSelecteFilter(props) {
  const options = props.list.map(item  => {
      return {
          label: `${item}`, value: item
      }
  })
  return <Checkbox.Group style={{ width: '100%' }} options={options}   />
}*/