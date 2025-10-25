import React, { useEffect, useState } from 'react'

type YahooItem = {
    code: string;
    name: string;
    price: number;
    image?: {
        medium?: string;
    } | null;
};

const App = () => {
    const [items, setItems] = useState<YahooItem[]>([]);
    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if (e.data?.type === 'productName') {
                chrome.runtime.sendMessage(
                    { type: 'fetchYahooItems', query: e.data.payload },
                    (response) => {
                        if (response.success) {
                            setItems(response.data.hits)
                        } else {
                            console.error('Yahoo fetch failed:', response.error)
                        }
                    }
                )
            }
        }
        window.addEventListener('message', handler)
        return () => window.removeEventListener('message', handler)
    }, []);

    return (
        <div
            style={{
                padding: '1rem',
                backgroundColor: '#ffffff',
                fontFamily: 'sans-serif',
                boxShadow: '0 0 8px rgba(0,0,0,0.2)',
                height: '100%',
                overflowY: 'auto'
            }}
        >
            <h2 style={{ marginTop: 0 }}>Yahoo!価格比較</h2>
            <div>
                {items.map((item) => (
                    <div key={item.code}>
                        <p>{item.name}</p>
                        <p>{item.price}円</p>
                        <img src={item.image?.medium} alt={item.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;