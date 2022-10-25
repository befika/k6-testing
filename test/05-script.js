import http from 'k6/http'
import {check} from 'k6'

export let options={
   

    stages :[
        {duration:'10s', target:5},
        {duration:'20s', target:3}
        
    ]
}

export default function(){
    let resp= http.get('https://www.google.com')
    console.log(`response body length ${resp.body.length} for VU = $(_VU)` )
    check(resp,{
        'is response status code 200:':(r)=>r.status===200,
    })
}