import React,{useMemo, useEffect, useState}  from 'react';
import './App.css';
import {Col, Row, Layout,Typography,Collapse,Card,Checkbox,Image} from 'antd';
import {TrophyOutlined} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import {useMediaQuery} from '@react-hook/media-query'     
 
export function SearchJobs(props) {
  let history = useHistory();

  const [result, setResult] = useState()
  const [params, setParams] = useState( {
      offset: 0,
      size: 20,
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
              <Typography.Title level={5} style={{textAlign:'left', paddingTop: 20, color: 'rgba(255, 255, 255, 0.90)',fontSize: '20px' ,background: 'hsla(0,0%,100%,.06)',margin: '0', padding: '12px 10px' }}>
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
        {item.organizations.slice(0,1).map(organization  => <Image className="result-image" src={organization.picture}/> )}   
      </Col>
      <Col className="result-col"flex="auto">
        <h4 className="result-title">{item.objective}</h4>
        <span className="result-span-1">{item.type} <br /></span>
        {item.organizations.map(organization  =><span className="result-span-1">{organization.name}<br /> </span>)}  
        {item.remote && <span className="result-span-1">Remote<br /></span>}
        {item.compensation.visible && <span  style={{marginTop: '4%'}}>{item.compensation.data.currency} {item.compensation.data.minAmount}
        -{item.compensation.data.maxAmount}/{item.compensation.data.periodicity}</span>}
        {!item.compensation.visible && <span  style={{marginTop: '4%'}}>Compensation: hidden</span>}
      </Col>
    </Row> 
    <Row className="row-result" style={{marginLeft:'10%',marginTop:'2%',color: 'rgba(255, 255, 255, 0.65)'}}>
      <Col flex="65px">
      <p>Members:</p>
      </Col>
      <Col className="result-col"flex="auto" style={{margin:'0%',marginTop:'2%'}}>
      <MembersToComponet list={item.members || []} />
      </Col>
    </Row>
    <SkillsComponet list={item.skills || []} />
    <a className="button-style-2" href=""> VIEW </a> 
  </Card>
  )}
  </Col>  
} 


function SkillsComponet(props) {
  console.log(".skills: ", props.list) 
  var obj = props.list;
  obj.sort((a,b) => b.experience.substr(0,1) - a.experience.substr(0,1)); 
  return <Col  style= {{display: 'flex', marginLeft:'10%'}}> 
      { props.list.slice(0, 3).map(skill  =>
      <Card   className="card-result-skills"> 
      {skill.experience!="potential-to-develop" && 
        <span className="result-span-skills" > {skill.name}  - +{skill.experience.substr(0,1)} 
        {skill.experience.substr(0,1)!=1 && <span className="result-span-skills" > years</span>}
        {skill.experience.substr(0,1)==1 && <span className="result-span-skills" > year</span>}
        </span> 
      }
      {skill.experience=="potential-to-develop" && 
        <span className="result-span-skills" > {skill.name} </span>  
      }
      </Card> 
      )}
  </Col>  

}

function MembersToComponet(props) {
  console.log("Members: ", props.list)   
  return <Col  style= {{display: 'flex', marginLeft:'2%'}}>
      { props.list.map(members  =>
      <Image className="members-image" src={members.picture}/> 
      )}
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