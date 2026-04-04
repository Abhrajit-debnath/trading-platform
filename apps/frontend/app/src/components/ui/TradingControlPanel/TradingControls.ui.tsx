
import PriceControls from "./PriceControls.ui"
import TradingPairSelector from "./TradingPairSelector.ui"
import { useAppDispatch, useAppSelector } from "@/app/hook"
import { setSide } from "@/app/src/store/slices/sideSlice"


const TradingControls = () => {
    const dispatch = useAppDispatch()
    const side = useAppSelector((state) => state.side.value)
    return (
        <div className='rounded-3xl p-4 mt-5 md:mt-0 border border-gray-300 lg:w-full'>
            <div className="flex justify-between items-center">
                <div className="">
                    <button className={`rounded-l-2xl text-sm font-poppins font-medium cursor-pointer border px-5 py-1 uppercase md:text-sm ${side == 'BUY' ? "bg-green-700 border text-white border-green-700 " : "bg-gray-100 border-gray-300 "}`} onClick={() => {
                        dispatch(setSide("BUY"))
                    }}>buy</button>
                    <button className={`rounded-r-2xl text-sm font-poppins font-medium   border-l-0 cursor-pointer border border-gray-300 px-5 py-1 uppercase md:text-sm ${side == 'SELL' ? "bg-red-700 border text-white border-red-700 " : "bg-gray-100 border-gray-300"}`} onClick={() => {
                        dispatch(setSide("SELL"))
                    }}>sell</button>
                </div>
                <TradingPairSelector />
            </div>
            <PriceControls />
        </div>
    )
}

export default TradingControls
