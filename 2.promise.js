async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = []
  let executing = []
  for (const item of source) {
    console.log('item', item)
    // 异步代码
    const p = Promise.resolve().then(() => {
      const r = iteratorFn(item, source)
      return r
    })
    ret.push(p)
    if (maxConcurrency <= source.length) {
      const e = p.then(() => {
        // 这一步是移动的逻辑也是一个异步的
        const r = executing.splice(executing.indexOf(e), 1)
        console.log('r', r)
      })
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        console.log('开始等待任务完成')
        // 是等待左右的都执行完
        await Promise.race(executing)
        executing = []

        console.log('任务完成')
      }
    }
  }
  console.log('end ->', ret)
  return Promise.all(ret)
}

const maxConcurrency = 5
const source = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
function iteratorFn(item, source) {
  return new Promise((resolve, reject) => {
    console.log('iteratorFn item ->', item)
    console.log('iteratorFn source ->', source)
    setTimeout(() => {
      resolve('1111')
    }, 0)
  })
}

runParallel(maxConcurrency, source, iteratorFn)