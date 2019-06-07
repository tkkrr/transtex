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

/** 右矢印を表示する */
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

/** テキストエリアのコンテナ． */
const TextAreaContainer = styled.div`
    width: 28%;
    margin: 24px auto;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

/** パディング管理がされているテキストエリアの描画 */
const StyledTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    padding: 12px;
    border-radius: 12px;
    border: none;
    box-shadow: 2px 2px 12px #ccc;  
    font-size: 16px;
    resize: none;
    outline: none;
    box-sizing: border-box;
`

/** flexboxのレイアウトを使用 */
const HorizontalFlex = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;
`

/** コピーボタン */
const CopyClipButton = styled.button`
    width: 100%;
    height: 32px;
    font-size: 16px;
    background-color: #33ccee;
    border: none;
    border-radius: 4px;
    color: white;
    padding: 4px 16px;
    box-shadow: 2px 2px 4px #999;
    transition: opacity 0.4s;
    &:hover {
        opacity: 0.6;
    }
`

/** Go to Google Translation ボタン */
const GoogleButton = styled(CopyClipButton)`
    background-color: #3366aa;
    margin-left: 24px;
`

/** 中心寄せを行う */
const Centering = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default () => {

    const [transStrings, stringsUpdate] = React.useState("")
    const [transOutput, outputUpdate] = React.useState("")

    /** ページを何で開いているかを判定するための情報を格納する */
    const agent = window.navigator.userAgent.toLowerCase()
    /** Chromeだけが最新の正規表現に対応しているので，仕分けを行う */
    const chrome = (agent.indexOf('chrome') !== -1) && (agent.indexOf('edge') === -1)  && (agent.indexOf('opr') === -1)
    

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
        if(chrome){
            regStr = new RegExp("(?<!al)\\.")
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
        const out = [] as string[]
        input.forEach( item => {
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