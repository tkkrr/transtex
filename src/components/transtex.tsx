import * as React from "react"

import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MainArea, RightArrow, TextAreaContainer, StyledTextArea, HorizontalFlex, Centering, CopyClipButton, GoogleButton, PlaceHolderForStyledTextArea, ClearButton} from "./styled"

export default () => {

    const [inputStrings, setInputStrings] = React.useState("")
    const [formatStrings, setFormatStrings] = React.useState("")
    const [texStrings, setTexStrings] = React.useState("")
    let isChrome = false    // chromeのみ正規表現の「否定後読み」を使うことができる．isChromeは切分け用の変数

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
            setInputStrings("")
            setTexStrings("")
            setFormatStrings("")
            return
        }
        setInputStrings(input)

        const out = input
            .replace(/(\n)/g, " ")  // 文章中に含まれる意味のない改行を削除
            .replace(/- /g, "")     // ハイフネーションを修正
            .replace(/’/g, "'")     // アポストロフィをシングルクォートへ変換

        let regStr: RegExp
        if(isChrome){
            regStr = new RegExp("(?<!al)(?<!e.g)(?<!i.e)\\. ")
        } else {
            regStr = new RegExp("\\. ")
        }
        const sentences = out.split(regStr)
        setFormatStrings( sentences.join(".\n\n") )
        formatTemplate( sentences )
    }


    /**
     * 入力をテンプレートTeX形式に変換する
     * @param input 文末のピリオドごとにsplitした文章群
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
        setTexStrings(out.join("\n\n"))
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

    return <MainArea>
        <TextAreaContainer>
            <HorizontalFlex>
                <ClearButton onClick={() => trans2tex("")}>
                    Clear
                </ClearButton>
            </HorizontalFlex>
            <PlaceHolderForStyledTextArea hidden={!!formatStrings}>
                <p>
                    変換したい文章を入力してください or<br/>
                    英語論文PDFの文章をコピペしてください
                </p>
                    
                <ul>
                    <li>TeansTexにてフォーマットする文章例 ↓
                        <ul>
                            <li>1行ごとに改行が入ってしまう文章</li>
                            <li>行末にハイフネーションがある文</li>
                            <li>「’」と「'」が混ざっている文章</li>
                        </ul>
                    </li>
                </ul>
            </PlaceHolderForStyledTextArea>
            <StyledTextArea
                value={inputStrings}
                onChange={e => trans2tex(e.target.value)}
            />
        </TextAreaContainer>
        <Centering>
            <RightArrow/>
            <ToastContainer />
        </Centering>
        <TextAreaContainer>
            <HorizontalFlex>
                <CopyClipButton onClick={() => copyClip(formatStrings)}>
                    Copy
                </CopyClipButton>
                <GoogleButton onClick={() => gotoGoogleTranslate(formatStrings)}>
                    Translate
                </GoogleButton>
            </HorizontalFlex>
            <PlaceHolderForStyledTextArea hidden={!!formatStrings}>
                <p>
                    フォーマットされた文章がここに表示されます
                </p>
                    
                <ul>
                    <li>Copyボタンでクリップボードへコピーできます</li>
                    <li>TranslateボタンからGoogle翻訳へ飛びます</li>
                </ul>
            </PlaceHolderForStyledTextArea>
            <StyledTextArea 
                // placeholder={secondPlaceHolder}
                value={formatStrings}
                readOnly={true}
                // id={"strings"}
            />
        </TextAreaContainer>
        <TextAreaContainer>
            <HorizontalFlex>
                <CopyClipButton onClick={() => copyClip(texStrings)}>
                    Copy
                </CopyClipButton>
            </HorizontalFlex>
            <PlaceHolderForStyledTextArea hidden={!!formatStrings}>
                <p>
                    テンプレートに合わせた文章が表示されます<br/>
                    （例：{"\\newsentence{ [入力した文章] }{}"}）
                </p>
                    
                <ul>
                    <li>Copyボタンでクリップボードへコピーできます</li>
                </ul>
            </PlaceHolderForStyledTextArea>
            <StyledTextArea 
                value={texStrings}
                readOnly={true}
                id={"output"}
            />
        </TextAreaContainer>
    </MainArea>
}