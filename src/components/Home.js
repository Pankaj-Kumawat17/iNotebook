import React,{useState} from 'react'
import {motion,useInView,UseAnimation} from 'framer-motion'
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [roomId, setRoomId] = useState("");
    const [username, setusername] = useState('');
    const navigate = useNavigate();

    //creating a new room
    const createNewRoom = (e)=>{
        e.preventDefault();
        const id=uuidv4();
        setRoomId(id);
        toast.success("Created a new room successfully.");
    }

    // join button listener - joining a new room
    const joinRoom = ()=>{
        if(!roomId || !username){
            toast.error("Enter Correct Room ID and Username");
            return;
        }

        // redirect
        navigate(`/editor/${roomId}`,{
            state:{username}
        });
    }

    // This function ensures that we join the room even if we press enter key
    const handleInput = (e)=>{
        if(e.code==='Enter'){
            joinRoom();
        }
    }
    
    return (
        <>
            <div className='homePageWrapper'>
                <div className="formWrapper">
                    <div className="header">
                        <img src="/Logo.png" alt="" className='mainImage' />
                        
                        <motion.h1  variants={{
                            hidden: {opacity:0,x:5},
                            visible:{ opacity: 1 , x : 40 },
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{duration:0.5, delay:0.5}} >Code on the GO!</motion.h1>
                    </div>
                    <div className="InputGroup">
                        <input type="text" onKeyUp={handleInput} className='InputBox' placeholder='Enter Room Id' value={roomId} onChange={(e)=>{setRoomId(e.target.value)}}/>
                        <input type="text" onKeyUp={handleInput} className='InputBox' placeholder='Enter Username' value={username}  onChange={(e)=>{setusername(e.target.value)}}/>
                        <button className="btn joinBtn btn-success" onClick={joinRoom}>Join</button>
                        <span className='createInfo'>
                            <a href="" className='createNew' onClick={createNewRoom}>Create a room</a> &nbsp;
                            if you do not have an invite.
                        </span>
                    </div>
                </div>
                <footer>
                        <p>All rights reserved.&nbsp; Created by <a href="">Rashi</a></p>
                        <p></p>
                </footer>

            </div>

        </>
    )
}

export default Home