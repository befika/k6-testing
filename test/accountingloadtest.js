import http from 'k6/http'
import encoding from 'k6/encoding';
import {check} from 'k6'

const username = 'b7a45a93-7efe-460c-8cbf-730cbe3bfbf0';
const password = '12345';

const credentials = `${username}:${password}`;

const encodedCredentials = encoding.b64encode(credentials);

export let options={
    vus:10,
    duration : '1m',
    headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },

}

export default function(){

   
    let data = {
        "ledger_entries": [
          {
            "account_id": "2000-82aba458-2048-4d7d-8d8f-63aa110a90ea",
            "amount": 10,
            "credit_debit_indicator": "DEBIT",
          },
          {
            "account_id": "2b3b982b-07a1-4d76-9ed5-fa05f76340aa",
            "amount": 10,
            "credit_debit_indicator": "CREDIT",
          }
        ],
        "transaction": {
          "note": "Test Transaction",
        }
      };

  // Using a JSON string as body
  let res = http.post("http://localhost:9091/v1/transactions", JSON.stringify(data),options);

  console.log(res); // Bert

  check(res, { 'status was 200': (r) => r.status == 200 });

}