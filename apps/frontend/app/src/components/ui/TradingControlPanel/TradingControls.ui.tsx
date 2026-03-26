import { useState } from "react"
import PriceControls from "./PriceControls.ui"
import TradingPairSelector from "./TradingPairSelector.ui"


// interface TradingPair {
//     symbol: string,
//     baseAsset: string
//     quoteAsset: string
//     status: string
//     price: number
//     isSpotTradingAllowed: boolean
// }
// type TradingControlsProps = {
//     pairs: TradingPair[]
//     isLoading: boolean
// }

const TradingControls = () => {
    const [active, setActive] = useState<string>("")


    return (
        <div className='rounded-3xl p-4 mt-5 md:mt-0 border border-gray-300 lg:w-full'>
            <div className="flex justify-between items-center">
                <div className="">
                    <button className={`rounded-l-2xl text-xs cursor-pointer border border-gray-300 px-5 py-1 uppercase md:text-sm ${active == 'Buy' ? "bg-gray-100" : ""}`} onClick={() => {
                        setActive("Buy")
                    }}>buy</button>
                    <button className={`rounded-r-2xl text-xs  border-l-0 cursor-pointer border border-gray-300 px-5 py-1 uppercase md:text-sm ${active == 'Sell' ? "bg-gray-100" : ""}`} onClick={() => {
                        setActive("Sell")
                    }}>sell</button>
                </div>
                <TradingPairSelector />
            </div>
            <PriceControls />
        </div>
    )
}

export default TradingControls
