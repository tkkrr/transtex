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
    height: 16px;
    width: 24px;
    margin-left: 12px;
    margin-right: 24px;

    &::after{
        content: "";
        position: relative;
        display: block;
        right: -24px;
        bottom: 6px;
        height: 0;
        width: 0;
        background-color: transparent;
        border: 14px solid transparent;
        border-left: 18px solid #666;
    }
`

const TextAreaContainer = styled.div`
    width: 28%;
    margin: 24px auto;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledTextArea = styled.textarea`
    width: 100%;
    height: calc(100% - 12px * 2 );
    padding: 12px;
    border-radius: 12px;
    border: none;
    box-shadow: 2px 2px 12px #ccc;  
    font-size: 16px;
    resize: none;
    outline: none;
`

const CopyClipButton = styled.button`
    width: 100%;
    height: 32px;
    font-size: 16px;
    background-color: #33ccee;
    border: none;
    border-radius: 4px;
    color: white;
    margin-top: 16px;
    box-shadow: 2px 2px 4px #999;
    transition: opacity 0.4s;
    &:hover {
        opacity: 0.6;
    }
`

const Centering = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default () => {

    const [transStrings, stringsUpdate] = React.useState("")
    const [transOutput, outputUpdate] = React.useState("")
    

    const trans2tex = (input?: string) => {
        if( !input ) {
            outputUpdate("")
            stringsUpdate("")
            return
        }
        const out = input.replace(/(\n)/g, " ")
        const sentences = out.split(". ")

        stringsUpdate( sentences.join(".\n\n") )
        formatTemplate(sentences)
    }


    const formatTemplate = (input: string[]) => {
        const out = [] as string[]
        input.forEach( item => {
            out.push(`\\newsentence
{${item}${item.slice(-1) === "." ? "" : "."}}
{}`)
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

    return <MainArea >
        <TextAreaContainer>
            <StyledTextArea 
                placeholder={"変換したい文章"}
                onChange={e => {
                    trans2tex(e.target.value)
                }}
            />
        </TextAreaContainer>
        <Centering>
            <RightArrow/>
            <ToastContainer />
        </Centering>
        <TextAreaContainer>
            <StyledTextArea 
                placeholder={"中間文章"}
                value={transStrings}
                readOnly={true}
                id={"strings"}
            />
            <CopyClipButton onClick={() => copyClip(transStrings)}>
                Copy to clipboard
            </CopyClipButton>
        </TextAreaContainer>
        <TextAreaContainer>
            <StyledTextArea 
                placeholder={"変換後の文章"}
                value={transOutput}
                readOnly={true}
                id={"output"}
            />
            <CopyClipButton onClick={() => copyClip(transOutput)}>
                Copy to clipboard
            </CopyClipButton>
        </TextAreaContainer>
    </MainArea>
}