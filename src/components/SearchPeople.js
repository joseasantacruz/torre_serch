import React,{useMemo, useEffect, useState}  from 'react';
import './App.css';
import {Col, Row, Layout,Typography,Collapse,Card,Checkbox,Image} from 'antd';
import {TrophyOutlined} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import {useMediaQuery} from '@react-hook/media-query'     

export function SearchPeople(props) {
  let history = useHistory();

  const [result, setResult] = useState()
  const [params, setParams] = useState( {
      offset: 0,
      size: 20,
      aggregate: true
  })
  const [limit, setLimit] = useState(5)
  const [filters, setFilters] = useState( { })
  const isSmall = useMediaQuery('only screen and (max-width: 768px)');
 
  useEffect(() =>{
    doQuery(params,filters)
        .then(d => setResult(d))
}, [params,filters])
  return (
    <div className="App">  
      <Layout>
            {!isSmall && <div className="layout-div">
              <Layout.Sider  >
                  <Typography.Title level={5} style={{textAlign:'left', paddingTop: 20, color: 'rgba(255, 255, 255, 0.90)',fontSize: '20px' ,background: 'hsla(0,0%,100%,.06)',margin: '0', padding: '12px 10px' }}>
                      People Filters
                  </Typography.Title>
                  <Col xs={{span: 24}} style={{padding: 5}}> 
                    <Card title="Open To" className="card-style"> 
                      <SearchFilter list={result?.aggregators?.opento || []}
                          onChange={e => setFilters({...filters, opento: e})}  />
                    </Card>
                    <Card title="Remote" className="card-style"> 
                      <SearchFilter list={result?.aggregators?.remoter || []}
                          onChange={e => setFilters({...filters, remoter: e})}  />
                    </Card>
                    <Card title="Skills" className="card-style"> 
                      <SearchFilterLimit list={result?.aggregators?.skill || []}
                          onChange={e => setFilters({...filters, skill: e})}  
                          limit={limit} />  
                          <button className="button-style" onClick={() => setLimit(limit + 10)}> SEE MORE</button>
                          {limit>5 &&   
                            <button className="button-style" onClick={() => setLimit(limit - 10)}> SEE LESS</button>} 
                    </Card>
                    <Card title="Compensation Ranges" className="card-style"> 
                      <SearchFilter list={result?.aggregators?.compensationrange || []}
                          onChange={e => setFilters({...filters, compensationrange: e})}  />    
                    </Card>
                  </Col> 
              </Layout.Sider>
              <Layout className="site-layout" > 
                <Row  > 
                  <Card className="card-style card-fts-search"  style={{width: '100%'}}>
                      <div className="fts-search-input-wrapper">
                      Current Filters Row 
                      </div>
                  </Card>
                </Row>  

                <ResultComponent list={result?.results || []} />
              </Layout>
            </div>}
                <Layout.Content className="content-padding" >
                    {isSmall && <Row>
                        <Col xs={{span: 24}}>
                            <Collapse defaultActiveKey={['2']} bordered={false}>
                                <Collapse.Panel header="See Filters" key="1">
                                  <Col xs={{span: 24}} style={{padding: 5}}> 
                                    <Card title="Open To" className="card-style"> 
                                      <SearchFilter list={result?.aggregators?.opento || []}
                                          onChange={e => setFilters({...filters, opento: e})}  />
                                    </Card>
                                    <Card title="Remote" className="card-style"> 
                                      <SearchFilter list={result?.aggregators?.remoter || []}
                                          onChange={e => setFilters({...filters, remoter: e})}  />
                                    </Card>
                                    <Card title="Skills" className="card-style"> 
                                      <SearchFilterLimit list={result?.aggregators?.skill || []}
                                          onChange={e => setFilters({...filters, skill: e})} 
                                          limit={limit} />  
                                          <button className="button-style" onClick={() => setLimit(limit + 10)}> SEE MORE</button>
                                          {limit>5 &&   
                                            <button className="button-style" onClick={() => setLimit(limit - 10)}> SEE LESS</button>}   
                                    </Card>
                                    <Card title="Compensation Ranges" className="card-style"> 
                                      <SearchFilter list={result?.aggregators?.compensationrange || []}
                                          onChange={e => setFilters({...filters, compensationrange: e})}/>
                                    </Card>
                                  </Col>
                                </Collapse.Panel>
                            </Collapse>
                        </Col> 
                        <Col  > 
                          <Card className="card-style card-fts-search"  style={{width: '100%'}}>
                              <div className="fts-search-input-wrapper">
                              Current Filters Row 
                              </div>
                          </Card>
                        </Col>  

                        <ResultComponent list={result?.results || []} />
                    </Row>} 
                </Layout.Content> 
          </Layout> 
      </div>
  );
} 
 
function ResultComponent(props) {

  console.log(".result: ", props.list) 
  return <Col xs={{span: 24}}> 
  { props.list.map(item  =>
  <Card   className="card-result"> 
    <Row className="row-result">
      <Col flex="100px">
        <Image className="result-image" src={item.picture}/> 
      </Col>
      <Col className="result-col"flex="auto">
        <h4 className="result-title">{item.name}</h4>
        <span className="result-span-1">{item.professionalHeadline} <br /></span>
        <span className="result-span-2">{item.locationName}</span>
      </Col>
    </Row>
    <SkillsComponet list={item.skills || []} />
    <Row className="row-result" style={{marginLeft:'10%',marginTop:'2%',color: 'rgba(255, 255, 255, 0.65)'}}>
      <Col flex="65px">
      <p>Open To:</p>
      </Col>
      <Col className="result-col"flex="auto" style={{margin:'0%',marginTop:'2%'}}>
        <OpenToComponet list={item.openTo || []} />
      </Col>
    </Row>
    <a className="button-style-2" href=""> VIEW GENOMA</a> 
  </Card>
  )}
  </Col>  
} 

function OpenToComponet(props) {
  console.log(".openTo: ", props.list)   
  return <Card style={{ width: 300 }}> 
      { props.list.map(opento  =>
      
      <p style={{ margin:'0%' }}>{opento}</p> 
      )}
  </Card> 

}


function SkillsComponet(props) {
  console.log(".skills: ", props.list) 
  var obj = props.list;
  obj.sort((a,b) => b.weight - a.weight); 
  return <Col  style= {{display: 'flex', marginLeft:'10%'}}> 
      { obj.slice(0, 3).map(skill  =>
      <Card   className="card-result-skills"> 
      {skill.weight>0 && 
        <span className="result-span-skills" > {skill.name}  <TrophyOutlined /> {skill.weight}</span>  
      }
      {!skill.weight>0 && 
        <span className="result-span-skills" > {skill.name} </span>  
      }
      </Card> 
      )}
  </Col>  

}

function SearchFilter(props) {
  console.log(".filters: ", props.list)
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
function doQuery(params,filters) {
  console.log("filters:", filters)
  var requestOptions = {
      method: 'POST',
      redirect: 'follow',
     // body: JSON.stringify({ agregamePorOpen: filters.openTo })
    };
    
  return fetch(`https://search.torre.co/people/_search/?offset=${params.offset}&size=${params.size}&aggregate=${params.aggregate}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
}