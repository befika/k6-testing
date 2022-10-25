import http from 'k6/http'
import {check} from 'k6'
import {Rate} from 'k6/metrics'

export let errorRate = new Rate('errors')

export let options={

    thrresholds:{
        errors:['rate<0.1']
    },  
    vus:10,
    duration : '10s'
    }

export default function(){
    // let resp= http.get('https://run.mocky.io/v3/566f77c8-97e9-4298-ad8a-4547abee4557')
    let resp= http.get('localhost:9091/accounts')
    console.log(`response body length ${resp.body.length} for VU = ${__VU} ITERA= ${__ITER}` )
    const check1= check(resp,{
        'is response status code 200:':(r)=>r.status===200,
    })
    errorRate.add(!check1)
    let body= JSON.parse(resp.body)

  console.log(`responce message is: ${JSON.stringify(body)}` )

  const check2= check(resp,{
    'the responce messabe is:':(r)=>JSON.parse(r.body).Message==="200",
})

}   