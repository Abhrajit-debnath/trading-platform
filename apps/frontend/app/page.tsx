
'use client'

import Navbar from "./src/components/ui/HeaderSection/Navbar.ui";
import TradingControls from "./src/components/ui/TradingControlPanel/TradingControls.ui";
import PriceChart from "./src/components/ui/ChartPanel/PriceChart.ui";
import PositionsPanel from "./src/components/ui/TradingPairspanel/TradingPanel.ui";
import axios from "axios";
import { useQuery } from '@tanstack/react-query'
import { useMemo, } from "react";
import { useAppSelector } from "./hook";
import SocketProvider from "./src/components/providers/Socket.Provider";
import AccountDetails from "./src/components/ui/AccountDetailsPanel/AccountDetails.ui";


interface TradingPair {
  symbol: string,
  baseAsset: string
  quoteAsset: string
  status: string
  isSpotTradingAllowed: boolean
}



export default function Home() {




  // const { data: exchangeData, isLoading } = useQuery({
  //   queryKey: ["exchangeInfo"],
  //   queryFn: async () => {
  //     const res = await axios.get("https://testnet.binance.vision/api/v3/exchangeInfo");
  //     if (res.status == 200) {
  //       console.log("hh");

  //       return res.data

  //     }
  //   },
  //   staleTime: 1000 * 60 * 5

  // })

  // console.log("exchange data", exchangeData);






  // const commonPairs = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "ADAUSDT", "DOGEUSDT", "AVAXUSDT", "LTCUSDT", "LINKUSDT", "SOLUSDT"]


  // const allPairs = useMemo(() => {

  //   if (!exchangeData || !priceData) {
  //     return []
  //   }

  //   const priceMap = new Map(
  //     priceData.map((s: any) => [s.symbol, s.price])
  //   )

  //   const filteredPair = exchangeData.symbols.filter((s: TradingPair) => s.status === 'TRADING' && commonPairs.includes(s.symbol))

  //   return filteredPair.map((s: TradingPair) => ({
  //     symbol: s.symbol,
  //     baseAsset: s.baseAsset,
  //     quoteAsset: s.quoteAsset,
  //     price: priceMap.get(s.symbol) ?? "-"
  //   }))

  // },
  //   [exchangeData, priceData]
  // );






  return (
    <SocketProvider>
      <div className="w-screen h-screen p-2 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="shrink-0">
          <Navbar />
        </div>
        <div className="flex items-center py-4">
          <h1 className="text-xl md:text-2xl capitalize font-poppins font-medium">portfolio</h1>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden flex flex-col">

          {/* Top row */}
          <div className="shrink-0 flex flex-col-reverse lg:flex-row md:gap-5">

            <div className="w-full lg:w-[35%]">
              <TradingControls />
            </div>
            <div className="w-full lg:w-[65%]">
              <PriceChart />
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col-reverse gap-12 lg:flex-row lg:gap-5 mt-2
                      lg:flex-1 lg:min-h-0">

            {/* AccountPanel */}
            <div className="w-full lg:w-[35%] lg:h-full">
              <div className="h-44 lg:h-full">
                <AccountDetails />
              </div>
            </div>

            {/* PositionsPanel */}
            <div className="w-full lg:w-[65%] lg:h-full max-h-125">
              <PositionsPanel />
            </div>

          </div>
        </div>
      </div>
    </SocketProvider>

  );
}