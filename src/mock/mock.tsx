import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config: AxiosRequestConfig) => [number, any];
faker.setLocale('zh_CN');
export const mockItemIndexBalance: Mock = config => {
  return [200, {
    expenses: 9900,
    income: 9900,
    balance: 0
  }]
}
export const mockItemIndex: Mock = (config) => {
  //设置记账项种类和页码
  const { kind, page } = config.params;
  //设置每页记账项数量为25
  const per_Page = 25;
  //设置记账项数量为26
  const count = 26;
  //创建页码
  const createPaper = (page = 1) => ({
    page,
    per_Page,
    count
  })
  //创建记账标签信息
  const createTag = (attrs?: any) => ({
    id: createId(),//Tagid
    name: faker.lorem.word(),//Tag名称
    sign: faker.internet.emoji(),//Tag图标
    kind: 'expenses',//Tag种类
  })
  //创建记账项信息
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tags_id: [createId()],
      tags: [createTag()],
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind
    }))
  //创建记账首页信息
  const createBody=(n = 1, attrs?: any)=>({
    //记账项,n为记账项的数量
    resource:createItem(n),
    //页码
    pager:createPaper(page),
    //收入支出净收入表头信息
    summary: {
      //收入
      income: 9900,
      //支出
      expenses: 9900,
      //净收入
      balance: 0
    }
  })
  //判断当前页码
  switch(true)
  {
    //如果页码为1或者无
    case (!page||page===1):{
      //创建并返回记账首页信息,且设置记账项数量为25
      return [200,createBody(25)];
    };
    //如果页码为2
    case (page===2):{
      //创建并返回记账首页信息,且设置记账项数量为1
      return [200,createBody(1)];
    };
    //如果页码为其他
    default:{
     //则返回空信息
     return [200,{}]
    }
  }
}
export const mockTagEdit:Mock=config=>{

  const createTag=(attrs?:any)=>({
    //标签id
    id:createId(),
    //标签名称
    name:faker.lorem.word(),
    //标签符号
    sign:faker.internet.emoji(),
    //标签种类
    kind: 'expenses',
    ...attrs
  })
  return [200,{resource:createTag()}]
}
export const mockTagInput:Mock=config=>{
  const createTag=(attrs?:any)=>({
    //标签id
    id:createId(),
    //标签名称
    name:faker.lorem.word(),
    //标签符号
    sign:faker.internet.emoji(),
    //标签种类
    kind: 'expenses',
    ...attrs
  })
  return [200,{resource:createTag()}]
}
export const mockTagShow:Mock=config=>{
  const createTag=(attrs?:any)=>({
    //标签id
    id:createId(),
    //标签名称
    name:faker.lorem.word(),
    //标签符号
    sign:faker.internet.emoji(),
    //标签种类
    kind: 'expenses',
    ...attrs
  })
  return [200, {resource: createTag()}];
}
export const mockItemCreate: Mock = config => {
  return [200, {
    resource: {
      "id": 2264,
      "user_id": 1312,
      "amount": 9900,
      "note": null,
      "tags_id": [3508],
      "happen_at": "2020-10-29T16:00:00.000Z",
      "created_at": "2022-07-03T15:35:56.301Z",
      "updated_at": "2022-07-03T15:35:56.301Z",
      "kind": "expenses"
    }
  }]
}
export const mockSession: Mock = (config) => {
  return [200, {
    jwt: faker.random.word()
  }]
}
//全局变量id
let id = 0;
//创建id
const createId = () => {
  id += 1;
  return id;
}
//创建标签
export const mockTagIndex: Mock = (config) => {
  //设置标签种类和页码
  const { kind, page } = config.params;
  //设置每页标签项数量为25
  const per_page = 25;
  //设置标签项数量为26
  const count = 26;
  //创建页码
  const createPaper = (page = 1) => ({
    page, per_page, count
  });
  //创建标签
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      //标签id
      id: createId(),
      //标签名
      name: faker.lorem.word(),
      //标签符号
      sign: faker.internet.emoji(),
      //标签类型
      kind: config.params.kind,
      ...attrs
    }))
  //创建标签页信息
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n), pager: createPaper(page)
  })
  switch(true)
  {
    case(kind === 'expenses' && (!page || page === 1)):{
      return [200, createBody(25)];
    };
    case(kind === 'expenses' && page === 2):{
      return [200, createBody(1)];
    };
    case(kind === 'income' && (!page || page === 1)):{
      return [200, createBody(25)];
    };
    default:{
     
      return [200, createBody(1)];
    }
  }
}
