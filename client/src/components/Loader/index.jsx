import { loader } from "../../assets"

const Loader = ({transaction}) => {
    return (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0, 0, 0, 0.9)] flex flex-col justify-center items-center ">
            <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            <p className="mt-[20px] font-epilogue font-semibold text-[#fff] text-[20px]"> {transaction} </p>
        </div>
    )
}


export default Loader;