import React from 'react'
import  Container  from '../container/Container.jsx'
import { PostForm} from "../index.js"

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost