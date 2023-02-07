// import type { AjaxResponse } from "rxjs/ajax";
// import { ajax } from "rxjs/ajax";
// import { map, filter, switchMap, debounceTime } from "rxjs/operators";
// import type { BehaviorSubject, Observable } from "rxjs";
//
// export interface Suggestion {
//   symbol: string;
//   name: string;
//   type: string;
//   region: string;
//   marketOpen: string;
//   marketClose: string;
//   timezone: string;
//   currency: string;
//   matchScore: string;
// }
//
// // use alphavantage API instead of respone.json to see real results
// // https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${YOUR_API_KEI}`
// //TODO: replace hardcoding
// const getApiUrl = (value: string) =>
//   `https://www.googleapis.com/books/v1/volumes?q=isbn:${value}&key=AIzaSyCUvnosRtoQlB8Br25-ozT7Oq00x0FI50o`;
//
// const transformResponse = ({ response }: AjaxResponse) => {
//   return response.bestMatches.map((item) => ({
//     symbol: item["items"]["1. symbol"],
//     name: item["2. name"],
//     type: item["3. type"],
//     region: item["4. region"],
//     marketOpen: item["5. marketOpen"],
//     marketClose: item["6. marketClose"],
//     timezone: item["7. timezone"],
//     currency: item["8. currency"],
//     matchScore: item["9. matchScore"],
//   }));
// };
//
// export const getSuggestions = <S>(
//   subject: BehaviorSubject<string>
// ): Observable<S[]> => {
//   return subject.pipe(
//     debounceTime(500),
//     filter((v) => v.length > 2),
//     map(getApiUrl),
//     switchMap((url) => ajax(url)),
//     map(transformResponse)
//   );
// };
