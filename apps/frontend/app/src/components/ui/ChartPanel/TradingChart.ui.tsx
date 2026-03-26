'use client'
import { ColorType, createChart, CandlestickSeries, UTCTimestamp } from 'lightweight-charts'
import { useRef, useEffect } from 'react'


type klineRow = [number, string, string, string, string, string, number, string, number, string, string, string]
type TradingChartProps = {
    chartData: klineRow[],
    symbol: string
}

const TradingChart = ({ chartData, symbol }: TradingChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (!chartRef.current || !chartData) return

        const chart = createChart(chartRef.current, {
            autoSize: true,
            rightPriceScale: { visible: false },
            leftPriceScale: { visible: true },
            layout: {
                textColor: 'black',
                background: { type: ColorType.Solid, color: 'white' },
            },
        })

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        })


        const formattedChartData = chartData.map((k: any[]) => ({
            time: (parseFloat(k[0]) / 1000) as UTCTimestamp,
            open: parseFloat(k[1]),
            high: parseFloat(k[2]),
            low: parseFloat(k[3]),
            close: parseFloat(k[4])
        })
        )

        candlestickSeries.setData(formattedChartData)
        chart.timeScale().fitContent()

        return () => chart.remove()
    }, [chartData, symbol])

    return (
        <div className="w-full">
            <div className="w-full h-96" ref={chartRef} />
        </div>
    )
}

export default TradingChart