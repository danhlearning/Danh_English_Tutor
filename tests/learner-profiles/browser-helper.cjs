async function initLearner(context) {
  await context.addInitScript(() => {
    let raw;try{raw=window.localStorage;}catch{raw=window.sessionStorage;}
    const id='grammar-test',tab='grammar-test-tab';
    window.name=JSON.stringify({danhTab:tab});
    if(!raw.getItem('danh-learner-info:'+id))raw.setItem('danh-learner-info:'+id,JSON.stringify({version:1,id,name:'Kiểm thử',avatar:'🐱',created:1}));
    sessionStorage.setItem('danh-learner-session-v1',JSON.stringify({id,tab,at:Date.now()}));
  });
}
async function seedLearning(page,key,value) {
  await page.addInitScript(({key,value})=>{let raw;try{raw=window.localStorage;}catch{raw=window.sessionStorage;}raw.setItem('danh-learner-data:grammar-test:'+key,value);},{key,value});
}
module.exports={initLearner,seedLearning};
