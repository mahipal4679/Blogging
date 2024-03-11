import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { db } from "./Firebaseconfig"
import { collection, setDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";


function BlogApp() {

    const [formdata, setFormdata] = useState({ title: "", content: "" })
    const [blog, setBlog] = useState([]);

    const inputRef = useRef()

    //this is compoenetDidMount when our app render it will focuse on title field..by using useRef()
    useEffect(() => {
        inputRef.current.focus();

    }, []);

    //we are change title if we update our blog 
    useEffect(() => {
        if (blog.length > 0) {
            document.title = blog[0].title;
        }
        else {
            document.title = "no-title";
        }
        // console.log(blog)
        // console.log(blog.length)
    }, [blog])

    /**..................................fetchin th data .................................................................... */

    // Fetch data from Firebase when the component mounts
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "blog"), (snapshot) => {
            const blogs = snapshot.docs.map((docs) => {
                return {
                    id: docs.id,
                    ...docs.data()
                }

            })

            setBlog(blogs)
        });


    }, []); // Empty dependency array to run the effect only once on mount.

    async function handleSubmit(e) {
        e.preventDefault()
        /*
           *doc()
           In some cases, it can be useful to create a document reference with an auto-generated ID,
            then use the reference later. 
           For this use case, you can call doc():
        */
        const newRef = doc(collection(db, "blog"));
        await setDoc(newRef, {
            title: formdata.title,
            content: formdata.content,
            createdON: new Date(),
        });

        //console.log(blog)
        setFormdata({ title: "", content: "" })
        inputRef.current.focus();

    }


    async function handleClick(id) {
        //setBlog(blog.filter((blog, index) => i !== index))
        //now, we are deleting data from Db so

        const delRef = doc(db, "blog", id);
        await deleteDoc(delRef);

    }


    return (
        <>
            <div className='block-container'>
            <h1>Blogging Application</h1>

                <form className='block-input' onSubmit={handleSubmit}>

                    <label>Name</label>
                    <input
                        ref={inputRef}
                        onChange={(e) => { setFormdata({ title: e.target.value, content: formdata.content }) }}
                        value={formdata.title}
                        type='text'
                        placeholder='Please Give Title' />

                    <label >Text-Area</label>
                    <textarea
                        onChange={(e) => { setFormdata({ title: formdata.title, content: e.target.value }) }}
                        required
                        value={formdata.content}
                        className='text-1'
                        placeholder='write your text!!'
                    />

                    <div className='btn-box'>
                        <button className='btn' >Add</button>
                    </div>

                </form>

            </div>
            <hr />
            <h2>Blog Content</h2>
            {blog.map((res, i) => {
                return (
                    <div key={i} className='blog'>
                        <h3>{res.title}</h3>
                        <p>{res.content}</p>
                        <div className='blog-btn'>
                            <button onClick={() => { handleClick(res.id) }} className='remove'>Remove</button>
                        </div>

                    </div>

                )
            })}

        </>
    )
}

export default BlogApp