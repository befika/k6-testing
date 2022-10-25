import http from 'k6/http'

export let options={
    // vus:10,
    // duration : '10s'

    stages :[
        {duration:'10s', target:5},
        {duration:'20s', target:3}
    ]

}

export default function(){
    http.get('https://www.google.com')
}