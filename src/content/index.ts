const getProductName = (): string | null => {
    const el = document.getElementById('productTitle')
    return el?.textContent?.trim() ?? null
}

const injectPanel = (): HTMLIFrameElement => {
    const iframe = document.createElement('iframe')
    iframe.src = chrome.runtime.getURL('src/panel/index.html')
    iframe.style.position = 'fixed'
    iframe.style.bottom = '0'
    iframe.style.right = '0'
    iframe.style.width = '400px'
    iframe.style.height = '300px'
    iframe.style.zIndex = '9999'
    iframe.style.border = 'none'
    document.body.appendChild(iframe)
    return iframe
}

const main = () => {
    const name = getProductName()
    if (!name) {
        console.warn('[Amazon Comparator] 商品名が取得できません')
        return
    }

    console.log('[Amazon Comparator] 商品名:', name)

    const iframe = injectPanel()
    iframe.onload = () => {
        setTimeout(() => {
            iframe.contentWindow?.postMessage({ type: 'productName', payload: name }, '*')
        }, 100)
    }
}

main()