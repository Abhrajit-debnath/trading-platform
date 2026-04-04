import UseReactQuery from '@/app/src/hooks/UseReactQuery.hook'

const AccountDetails = () => {
const data  = UseReactQuery("/api/account","accountInfo")
  console.log(data);
  
    const fields = [
        { label: "Margin Ratio", value: "0.00%" },
        { label: "Maintenance Margin", value: "0.000000 USDT" },
        { label: "Margin Balance", value: "0.000000 USDT" },
    ]

    return (
        <div className='rounded-xl p-4  border border-gray-300 h-full'>
            <div className="font-poppins font-semibold text-xl">Account</div>
            <div className="flex flex-col gap-5 lg:gap-15 lg:justify-center lg:h-full">
                {fields.map((field) => (
                    <div key={field.label} className="flex justify-between items-center">
                        <div className="text-md text-gray-500 font-roboto">{field.label}</div>
                        <div className="text-md font-roboto">{field.value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AccountDetails
