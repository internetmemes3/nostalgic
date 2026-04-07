export default function StockContent() {
  return (
    <div className="font-['VT323'] space-y-4">
      <div className="win95-button p-2">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left p-1">Symbol</th>
              <th className="text-right p-1">Price</th>
              <th className="text-right p-1">Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1">AAPL</td>
              <td className="text-right p-1">$150.23</td>
              <td className="text-right p-1 text-green-600">+2.3%</td>
            </tr>
            <tr>
              <td className="p-1">MSFT</td>
              <td className="text-right p-1">$290.45</td>
              <td className="text-right p-1 text-red-600">-1.2%</td>
            </tr>
            <tr>
              <td className="p-1">GOOGL</td>
              <td className="text-right p-1">$2,750.12</td>
              <td className="text-right p-1 text-green-600">+1.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
} 