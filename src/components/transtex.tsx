import * as React from "react"
import styled from "styled-components"

import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainArea = styled.div`
    padding: 0 24px;
    height: 100%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
`

const RightArrow = styled.div`
    background-color: #666;
    height: 24px;
    width: 32px;
    margin-left: 16px;
    margin-right: 32px;

    &::after{
        content: "";
        position: relative;
        display: block;
        right: -32px;
        bottom: 6px;
        height: 0;
        width: 0;
        background-color: transparent;
        border: 18px solid transparent;
        border-left: 18px solid #666;
    }
`

const StyledTextArea = styled.textarea`
    border-radius: 12px;
    border: none;
    box-shadow: 2px 2px 12px #ccc;
    width: 35%;
    padding: 12px;
    margin: 48px auto;
    font-size: 16px;
    resize: none;
    align-self: stretch;
`

const Centering = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default () => {

    const [transInput, inputUpdate] = React.useState("")
    const [transOutput, outputUpdate] = React.useState("")
    const [transMode, changeMode] = React.useState("chomp" as "chomp" | "tex")
    
    const trans2tex = (mode: "chomp" | "tex", input?: string) => {
        if( !input ) {
            outputUpdate("")
            return
        }
        const out = input.replace (/(\n)/g, " ")
        
        console.log(transMode)
        console.log(transInput)

        if(mode === "chomp"){
            outputUpdate(out)
        }else if(mode === "tex"){
            chompPeriod(out)
        }
    }

    const chompPeriod = (input: string) => {
        const sentences = input.split(". ")
        const out = sentences.map( item => {
            return `\\newsentence
{${item}${item.slice(-1) === "." ? "" : "."}}
{}`
        })
        outputUpdate(out.join("\n\n"))
    }
    
    const notify = (status: "info" | "error" | "success", message: string) => {
        switch(status){
            case "info":
                toast.info(message, {
                    transition: Slide,
                    pauseOnHover: false,
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                break
            case "error":
                toast.error(message, {
                    transition: Slide,
                    pauseOnHover: false,
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                break
            case "success":
                toast.success(message, {
                    transition: Slide,
                    pauseOnHover: false,
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                break
            default:
                break
        }
    }

    const copyClip = (string: string) => {
        var temp = document.createElement('textarea');

        temp.value = string;
        temp.selectionStart = 0;
        temp.selectionEnd = temp.value.length;

        const s = temp.style;
        s.position = 'fixed';
        s.left = '-100%';

        document.body.appendChild(temp);
        temp.focus();
        const result = document.execCommand('copy');
        temp.blur();
        document.body.removeChild(temp);

        notify(
            result ? "success" : "error", 
            result ? "Copy to Clipboard is Successful !!"
                   : "Oops... Something wrong..."
        )
    }

    return <MainArea>
        <StyledTextArea 
            placeholder={"変換したい文章"}
            onChange={e => {
                inputUpdate(e.target.value)
                trans2tex(transMode, e.target.value)
            }}
        />
        <Centering>
            <p>{transMode}</p>
            <RightArrow/>
            <br/>
            <div>
                <p>モード変更</p>
                <button 
                    onClick={() => {
                        changeMode("chomp")
                        trans2tex("chomp", transInput)
                        notify(
                            "info", 
                            "Change to Chomp output mode"
                        )
                    }}>
                    chomp
                </button>
                <button
                    onClick={ () => {
                        changeMode("tex")
                        trans2tex("tex", transInput)
                        notify(
                            "info", 
                            "Change to LaTeX output mode"
                        )
                    }}>
                    tex
                </button>
            </div>
            <button onClick={() => copyClip(transOutput)}>
                変換後の文章をコピー
            </button>
            <ToastContainer />
        </Centering>
        <StyledTextArea 
            placeholder={"変換後の文章"}
            value={transOutput}
            readOnly={true}
            id={"output"}
        />
    </MainArea>
}