import React from "react";

function LayoutContainer({children}) {
    return(
        <>
            <div className="min-h-dvh w-screen flex justify-center items-center dark:bg-zinc-900 overflow-hidden ">
                <div className="h-[calc(100vh-50px)] w-full mx-6 lg:mx-6 lg:w-1/4 md:w-1/2">
                 {children}
                </div>
            </div>
        </>
    )
}

export default LayoutContainer;