import { ShareIcon } from "../icons/ShareIcon";

export function Card(){
    return <div>
        <div className="p-8 bg-white rounded-md border-gray-200 max-w-72 border shadow-md">
            <div className="flex justify-between text-md">
                <div className="flex items-center">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon/>
                    </div>
                    Project Ideas
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <ShareIcon/>
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}