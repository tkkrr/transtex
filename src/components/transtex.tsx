import * as React from "react"

import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MainArea, RightArrow, TextAreaContainer, StyledTextArea, HorizontalFlex, Centering, CopyClipButton, DeeplButton, PlaceHolderForStyledTextArea, ClearButton} from "./styled"

export const Adsense = ( props: any ) => {
    const { currentPath } = props
    
    React.useEffect(() => {
        if (window) {
            window.adsbygoogle = window.adsbygoogle || []
            window.adsbygoogle.push({})
            // (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, [currentPath])
  
    return (
        <>
            <ins
                className="adsbygoogle"
                style={{ 
                    display: 'block',
                    width: '100%',
                    marginTop: '20px',
                    height: '35vh'
                }}
                data-ad-client="ca-pub-7365926503878687"
                data-ad-slot="3257229592"
                data-ad-format="auto"
                data-full-width-responsive="true" />
        </>
    )
}


interface textAreas {
    left?: React.ReactNode,
    center?: React.ReactNode,
    right?: React.ReactNode
}

/**
 * 境界線を移動できる3つのエリアを提供
 */
const ResizableThreeArea: React.FC<textAreas> = props => {
    const [startPosX1, setStartPosX1] = React.useState(0)
    const [startPosX2, setStartPosX2] = React.useState(0)
    const [delta1X, setDelta1X] = React.useState(0)
    const [delta2X, setDelta2X] = React.useState(0)
    const [isDragging1, setDragging1] = React.useState(false)
    const [isDragging2, setDragging2] = React.useState(false)

    const div1Ref: React.LegacyRef<HTMLDivElement> = React.useRef(null)
    const div2Ref: React.LegacyRef<HTMLDivElement> = React.useRef(null)

    React.useEffect(() => {
        // 境界線の初期位置を保存する
        if (!div1Ref.current) return
        setStartPosX1(div1Ref.current.getBoundingClientRect().left)
        if (!div2Ref.current) return
        setStartPosX2(div2Ref.current.getBoundingClientRect().left)

        // ウィンドウサイズが変更されたときも，境界線の初期位置を記憶する
        window.addEventListener('resize', () => {
            if (!div1Ref.current) return
            setStartPosX1(div1Ref.current.getBoundingClientRect().left)
            if (!div2Ref.current) return
            setStartPosX2(div2Ref.current.getBoundingClientRect().left)
        });
    }, [])

    // 2つのテキストエリアの境界線を移動するためhandler
    const dragHandler: React.MouseEventHandler = (ev) => {
        ev.preventDefault()
        if(isDragging1) setDelta1X(ev.clientX - startPosX1)
        if(isDragging2) setDelta2X(ev.clientX - startPosX2)
    }

    // 親要素内であれば，境界線を移動できる
    return <div style={{height: "100%", width: "100%", display: "flex"}}
        onMouseMove={ev => { if(isDragging1 || isDragging2) dragHandler(ev) }}
        onMouseUp={() => {
            setDragging1(false)
            setDragging2(false)
        }}>
        <div style={{width: `calc(34% + ${delta1X}px)`, minWidth: "250px"}}>
            {props.left}
        </div>
        <div style={{
                height: "100%", width: "5px", cursor: "col-resize", background: "#333",
                display: "flex", justifyContent: "center", alignItems: "center"
            }} 
            ref={div1Ref}
            onMouseDown={() => setDragging1(true)}>
            <RightArrow></RightArrow>
        </div>
        <div style={{width: `calc(33% - ${delta1X}px - 5px + ${delta2X}px)`, minWidth: "250px"}}>
            {props.center}
        </div>
        <div style={{
                height: "100%", width: "5px", cursor: "col-resize", background: "#333",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}
            ref={div2Ref}
            onMouseDown={() => setDragging2(true)}>
            <RightArrow></RightArrow>
        </div>
        <div style={{width: `calc(33% - ${delta2X}px - 5px)`, minWidth: "250px"}}>
            {props.right}
        </div>
    </div>
}

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
            regStr = new RegExp("(?<!al)(?<!vs)(?<!e\\.g)(?<!i\\.e)\\. ")
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
    }


    /**
     * Deepl翻訳へのリンクへ飛ぶ
     * @param input 翻訳文字列
     */
    const gotoDeeplTranslate = (input?: string) => {
        if( !input )return
        const transStr = encodeURIComponent(input)
        const transURL = `https://www.deepl.com/translator#en/ja/${transStr}`
        window.open(transURL, '_blank')
    }

    /**
     * TexTraから翻訳結果を取得する
     * @param input 翻訳文字列
     */
    const doTranslateLocal = async (input?: string) => {
        if( !input )return
        setTexStrings("現在翻訳中です...")

        const data = await fetch("/.netlify/functions/translate", {
            method: "POST",
            body: input
        })
        .then(res => res.text())

        setTexStrings(data)
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
        <ToastContainer />
        <TextAreaContainer>
            <ResizableThreeArea 
                left={<>
                    <div style={{position: "relative", width: "100%", height: "100%"}}>
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
                    </div>
                </>}
                center={<>
                    <div style={{position: "relative", width: "100%", height: "100%"}}>
                        <PlaceHolderForStyledTextArea hidden={!!formatStrings}>
                            <p>
                                フォーマットされた文章がここに表示されます
                            </p>
                                
                            <ul>
                                <li>Translate (Loacl)を押すと，右エリアに翻訳文で出力されます</li>
                                <li>Translate (DeepL)を押すと，Deepl翻訳へ飛びます</li>
                            </ul>
                        </PlaceHolderForStyledTextArea>
                        <StyledTextArea 
                            value={formatStrings}
                            readOnly={true}
                        />
                        <HorizontalFlex>
                            <CopyClipButton onClick={() => doTranslateLocal(formatStrings)}>
                                Translate (Local)
                            </CopyClipButton>
                            <DeeplButton onClick={() => gotoDeeplTranslate(formatStrings)}>
                                Translate (DeepL)
                            </DeeplButton>
                        </HorizontalFlex>
                    </div>
                </>}
                right={<>
                    <div style={{position: "relative", width: "100%", height: "100%"}}>
                        <PlaceHolderForStyledTextArea hidden={!!formatStrings}>
                            <p>
                                中央エリアのTranslate (Local) ボタンを押すと，<br/>
                                ここに翻訳文が出力されます
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
                        <HorizontalFlex >
                            <CopyClipButton onClick={() => copyClip(texStrings)}>
                                Copy
                            </CopyClipButton>
                        </HorizontalFlex>
                    </div>
                </>}/>
        </TextAreaContainer>
    </MainArea>
}
