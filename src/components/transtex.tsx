import * as React from "react"
import styled from "styled-components"

import { ToastContainer, toast } from 'react-toastify'
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

    const [transOutput, outputUpdate] = React.useState("")
    
    const trans2tex = (input?: string) => {
        if( !input ) {
            outputUpdate("")
            return
        }
        const out = input.replace (/(\n)/g, " ")
        outputUpdate(out)
    }

    
    const notify = (success: boolean) => {
        if(success){
            toast.success("Copy to Clipboard is Successful !!", {
                pauseOnHover: false,
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }else{
            toast.error("Oops... Something wrong...", {
                pauseOnHover: false,
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
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

        notify(result)

        // if(result) {
        //     alert("copy to clipboard")
        // }else{
        //     alert("Oops... something wring...")
        // }
    }

    return <MainArea>
        <StyledTextArea 
            placeholder={"変換したい文章"}
            onChange={e => trans2tex(e.target.value)}
        />
        <Centering>
            <RightArrow/>
            <br/>
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