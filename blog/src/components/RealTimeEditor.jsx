import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"


//here what is control
//this is the thing which comes from react-hook-form  and it is responsibleto transfer the state of the component into the form

// so basically the control does the job of forward ref where it gives the state of this component to the parent component which calls this one

function RealTimeEditor({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {
                label && <label className="inline-block mb-1 pl-1">
                    {label}
                </label>
            }

            <Controller
                name={name || "content"}
                control={control} //this is to get control from the parent component
                // it gives a callback here it refers to render

                // what we are trying to acheive is if onchange event happens to this filed then inform me
                // A function that returns a React element and provides the ability to attach events and value into the component. here field is the bundler which is used to get the values and set the values and it is used toattach functions as well
                render={
                    ({ field: { onChange } }) => {
                        //here we are returning an editor 
                        return <Editor
                            initialValue={defaultValue}
                            init={
                                {
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic underline | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help',
                                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                                }
                            }
                            onEditorChange={onChange}
                        />
                    }
                }
            />

        </div>
    )
}

export default RealTimeEditor