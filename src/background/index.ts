const YAHOO_APP_ID = import.meta.env.YAHOO_APP_ID

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'fetchYahooItems') {
        const url = new URL('https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch')
        url.searchParams.set('appid', YAHOO_APP_ID)
        url.searchParams.set('query', message.query)
        url.searchParams.set('results', '10')

        fetch(url.toString())
        .then(res => res.json())
        .then(data => sendResponse({ success: true, data }))
        .catch(err => sendResponse({ success: false, error: err.message }))

        return true // keep sendResponse alive
    }
})