import http from 'k6/http'
import {check} from 'k6'

export let options={
   
    vus:10,
    duration : '10s'
    }

export default function(){
    // let resp= http.get('https://run.mocky.io/v3/566f77c8-97e9-4298-ad8a-4547abee4557')
    let resp= http.get('https://run.mocky.io/v3/42ed42a6-e916-4033-95f9-c4316b217bdd')
    console.log(`response body length ${resp.body.length} for VU = ${__VU} ITERA= ${__ITER}` )
    check(resp,{
        'is response status code 200:':(r)=>r.status===200,
        'body size is 47 bytes:':(r)=>r.body.length===47,
    })
}   