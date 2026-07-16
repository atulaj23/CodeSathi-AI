import { useRef } from "react";


export default function HealthInput({

    message,
    setMessage,
    sendMessage,
    file,
    setFile

}){


    const fileRef = useRef();



    return (

        <div className="health-input">



            {
                file && (

                    <div className="selected-file">

                        📄 {file.name}

                        <button

                            onClick={()=>setFile(null)}

                        >

                            ❌

                        </button>


                    </div>

                )
            }






            <div className="health-box">



                <button

                    onClick={()=>fileRef.current.click()}

                    className="attach-btn"

                >

                    📎

                </button>





                <input

                    ref={fileRef}

                    type="file"

                    hidden

                    accept=".pdf,.jpg,.jpeg,.png"

                    onChange={(e)=>

                        setFile(e.target.files[0])

                    }

                />







                <textarea

                    placeholder="Apni health problem likhe..."

                    value={message}

                    onChange={(e)=>

                        setMessage(e.target.value)

                    }

                />







                <button

                    onClick={sendMessage}

                    className="health-send"

                >

                    ➤

                </button>



            </div>




        </div>

    )

}