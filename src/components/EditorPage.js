import React, { useRef, useState, useEffect } from 'react'
import Client from './Client'
import Editor from './Editor';
import { initSocket } from '../socket';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';


const EditorPage = () => {

    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const reactNavigator = useNavigate();
    const { roomId } = useParams();

    const [clients, setclients] = useState([]);




    useEffect(() => {

        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('Socket Error', e);
                toast.error('Socket Connection Failed, Try Again Later');
                reactNavigator('/');

            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            //Listening for joined event
            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state.username) {
                    toast.success(`${username} joined the room.`);
                    console.log(`${username} joined`);
                }

                setclients(clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                });
            })


            //listening for disconnected
            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room`);
                setclients((prev) => {
                    return prev.filter(client => client.socketId !== socketId);
                });
            })
        };
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        }
    }, [])

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success("Room ID successfully copied to clipboard");
        }
        catch (err) {
            toast.error("Could not copy Room ID");
            console.log(err);
        }
    }

    const leaveRoom = () => {
        reactNavigator("/");
        toast.success("Left Room.");
    }

    if (!location.state) {
        return <Navigate to="/" />
    }

    return (
        <div className='mainWrap row'>
            <div className="aside col-2" >
                <div className="asideInner">
                    <div className="logo">
                        <img src="/Logo.png" alt="" className='logoImage' />
                    </div>
                    <h4 className='connectedHead'>CONNECTED</h4>
                    <div className="clientList">
                        {clients.map((client) => (
                            <Client key={client.socketId} username={client.username} />
                        ))}
                    </div>
                </div>

                <button className='btn btn-success copyBtn' onClick={copyRoomId} >Copy Room ID</button>
                <button className='btn btn-success leaveBtn' onClick={leaveRoom} >Leave Room</button>
            </div>
            <div className="editorWrap col-10" >

                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }} className='' />
            </div>

        </div>
    )
}

export default EditorPage