const CountBox = ({value, title, amountRaised}) => {

    return (
        <div className="flex flex-col items-center sm:w-[150px] ">
            <h4 className="font-epilogue font-bold text-[30px] bg-[#1c1c24] p-3 text-white rounded-t-[10px] ${} text-center w-full"> {value} { amountRaised && "ETH" } </h4>
            <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] rounded-b-[10px] w-full px-3 py-3 text-center "> {title} </p>
        </div>
    )
}

export default CountBox