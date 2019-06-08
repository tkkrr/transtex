import * as React from "react"

import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MainArea, RightArrow, TextAreaContainer, StyledTextArea, HorizontalFlex, Centering, CopyClipButton, GoogleButton} from "./styled"


export default () => {

    const [transStrings, stringsUpdate] = React.useState("")
    const [transOutput, outputUpdate] = React.useState("")
    let isChrome = false

    React.useEffect(() => {
        const agent = window.navigator.userAgent.toLowerCase()
        isChrome = (agent.indexOf('chrome') !== -1) && (agent.indexOf('edge') === -1)  && (agent.indexOf('opr') === -1)
    })
    

    /**
     * 文字列を受け取り，それを後の処理に投げるアクション
     * @param input 入力文字列．nullの場合は初期化を行う
     */
    const trans2tex = (input?: string) => {
        if( !input ) {
            outputUpdate("")
            stringsUpdate("")
            return
        }
        const out = input.replace(/(\n)/g, " ")

        let regStr: RegExp
        if(isChrome){
            regStr = new RegExp("(?<!al.)(?<!e.g)(?<!i.e)\\. ")
        } else {
            regStr = new RegExp("\\. ")
        }
        const sentences = out.split(regStr)
        stringsUpdate( sentences.join(".\n\n") )
        formatTemplate(sentences)
    }


    /**
     * 入力をテンプレートTeX形式に変換する
     * @param input splitした文章群
     */
    const formatTemplate = (input: string[]) => {
        const processData = input.map( item => {
            const check1 = item.replace(/(%|％)/g, "\\%")
            return check1
        } )
        const out = [] as string[]
        processData.forEach( item => {
            out.push(`\\newsentence
{${item}${item.slice(-1) === "." ? "" : "."}}
{}`)
        })
        outputUpdate(out.join("\n\n"))
    }


    /**
     * Google翻訳へのリンクへ飛ぶ
     * @param input 翻訳文字列
     */
    const gotoGoogleTranslate = (input?: string) => {
        if( !input )return
        const transStr = encodeURIComponent(input)
        const transURL = `https://translate.google.com/?hl=ja#view=home&op=translate&sl=en&tl=ja&text=${transStr}`
        window.open(transURL, '_blank')
    }


    /**
     * トースト通知を行う
     * @param status メッセージの種類
     * @param message メッセージ本文
     */
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


    /**
     * クリップボードに文字列をコピーする
     * @param string コピーする文字列
     */
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
            <HorizontalFlex>
                <CopyClipButton onClick={() => copyClip(transStrings)}>
                    Copy
                </CopyClipButton>
                <GoogleButton onClick={() => gotoGoogleTranslate(transStrings)}>
                    Translate
                </GoogleButton>
            </HorizontalFlex>
            <StyledTextArea 
                placeholder={"中間文章"}
                value={transStrings}
                readOnly={true}
                id={"strings"}
            />
        </TextAreaContainer>
        <TextAreaContainer>
            <HorizontalFlex>
                <CopyClipButton onClick={() => copyClip(transOutput)}>
                    Copy
                </CopyClipButton>
            </HorizontalFlex>
            <StyledTextArea 
                placeholder={"変換後の文章"}
                value={transOutput}
                readOnly={true}
                id={"output"}
            />
        </TextAreaContainer>
    </MainArea>
}