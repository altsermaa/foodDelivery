import { CirclePlus } from "lucide-react"

export const AddBox =() => {
    return <div className="border border-dashed border-red-800 rounded-2xl w-[270px] h-[241px] flex flex-col justify-center items-center">
        <CirclePlus className="text-red-900" />
        <p>Add new dish</p>

    </div>
}