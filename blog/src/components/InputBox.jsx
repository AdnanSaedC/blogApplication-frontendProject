import React ,{useId}from 'react'


// we have used here foreward ref what it does is simple it look you hve a component a inside that you have another component B now you want to the component B to be a part of component A not just values and variables

// in order to handle that we have forward ref it helps to pass referemce between components

// problem the parent component wants to control the DOM inside the child like onclick etc
// the funcvtion name has to be same as the component name and it will help while debugging and since useRef has its own focus so it does not matter
const InputBox = React.forwardRef( function InputBox({
        label,
        type="text",
        className="",
        ...props
    },ref)
    {
        const id = useId()
        return(
            <div className='w-full'>
                { //it will only work if the label part is true
                    label && 
                    <label 
                        className='inline-block mb-1 pl-1 text-black'
                        htmlFor={id}
                    >
                        {label}
                    </label>
                }
                <input
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                    ref={ref}
                    // what is ref it is nothing but a container whose job is to avoid the react to render things when the state(value changes okay)
                    // now in the ref container we provide the html element whose state should persist across the rendersp
                    {...props}
                    id={id}
                />
            </div>
        )
    }
)

export default InputBox