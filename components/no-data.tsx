import {SVGAttributes} from "react";

export default function NoDataComponent() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <GalleryHorizontalEndIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                <h3 className="text-2xl font-bold">No Data Available</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
                    It looks like you haven{"\'"}t added any data yet
                </p>

            </div>
        </div>
    )
}

const GalleryHorizontalEndIcon : React.FC<SVGAttributes<{}>> =  (props)  => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 7v10" />
            <path d="M6 5v14" />
            <rect width="12" height="18" x="10" y="3" rx="2" />
        </svg>
    )
}
