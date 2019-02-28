import {LOOM_SERVER} from './CONFIG';

const http = require('http')


export function getIndexed(type) {
  return new Promise((resolve, reject) => {
    function reqListener () {
      if (this.status == 200) {
        const result = JSON.parse(this.responseText).hits.hits
        resolve(result.map(result => result._source))
      } else {
        reject(Error('No results'))
      }
    }

    let oReq = new XMLHttpRequest()
    oReq.addEventListener('load', reqListener)
    oReq.open('GET', `http://${LOOM_SERVER}:8081/${type}`)
    oReq.send()
  })
}
