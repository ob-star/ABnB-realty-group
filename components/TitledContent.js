import React from 'react'

function TitledContent({title,desc}) {
  return (
    <div>
       <div className="items-center justify-center flex flex-col lg:gap-x-8  mt-5">
          <div className="lg:pr-4">
            <div className="lg:max-w-xl">
              <h1 className="mt-2 text-pretty text-5xl font-semibold tracking-tight text-[#000000] ">
              {title}
              </h1>
              <p className=" mt-6 text-lg text-[#949494]">
                {desc}
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TitledContent
