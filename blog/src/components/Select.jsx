import React,{useId} from 'react'

function Select({
    options=[],
    label,
    className,
    ...props
},ref) {
    const id = useId()
  return (
    <div className="w-full">
        {
            label && 
            <label htmlFor={id}></label> //we will check lable thing later
        }
        {
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                // if we dont provide className it will be null
            >
                {
                    options?.map(
                        (eachValue)=>(
                            <options key={eachValue} value={eachValue}>eachValue</options>
                        )
                    )
                }
            </select>
        }
    </div>
  )
}

export default React.forwardRef(Select)