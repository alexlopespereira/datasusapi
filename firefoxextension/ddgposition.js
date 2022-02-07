2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
	
// get the GET variables in the URL
const queryString = window.location.search;
 
const urlParams = new URLSearchParams(queryString);
 
// check if it has a q GET paramater, which represents the search term.
if (urlParams.has('q')) {
  const searchQuery = urlParams.get('q');
 
  // setup the HTTP request to get ddg results
  let xhr = new XMLHttpRequest();
 
  xhr.onload = function () {
    // this function will be called when the results come in, this line gets a list of links
    let results = Array.from(this.responseXML.getElementsByClassName('result')).map(result => result.getElementsByClassName('result__a')[0].href);
    // remove links that are ads
    results = results.filter((result) => !result.startsWith('https://duckduckgo.com/y.js'));
    // pass the array of links to the applyResults function
    applyResults(results);
  };
 
  xhr.onerror = function () {
    console.log('An error occurred');
  }
 
  // open and send the request.
  xhr.open('GET', 'https://duckduckgo.com/html/?q=' + searchQuery, true);
  xhr.responseType = 'document';
  xhr.send();
 
} else {
  console.log('Couldn\'t get query');
}
 
function applyResults(results) {
  // this is for debugging
  console.log(results);
 
  // get a list of 'a' elements that are google search results
  let googleResults = Array.from(document.getElementsByClassName('r')).map(result => result.getElementsByTagName('a')[0]);
 
  for (const gResult of googleResults) {
    // establish result URL. Some results are links to google.com/url, while others are direct.
    let url = gResult.href;
    if (url.startsWith(window.location.origin + '/url')) {
      const _urlParams = new URLSearchParams(url);
      if (_urlParams.has('url')) {
        url = _urlParams.get('url');
      } else {
        // this url seems to be malformed, just move on
        continue;
      }
    }
 
    // Check if URL appears in DDG results, if so, get position and create the div for the little orange box.
    const ddgPosition = results.findIndex((element) => element === url);
    if (ddgPosition >= 0)
      gResult.insertAdjacentHTML('beforeend', '<div style="background-color: #de5833; position: absolute; top:0; right:0;"><p style="font-size: 15px; color: white; margin: 0; padding: 2px 9px 2px 9px;">'+(ddgPosition+1)+'</p></div>');
 
  }
}