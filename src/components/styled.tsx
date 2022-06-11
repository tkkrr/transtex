import styled from "styled-components"

export const MainArea = styled.div`
    padding: 0 24px;
    height: 100%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
`

/** 右矢印を表示する */
export const RightArrow = styled.div`
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
export const TextAreaContainer = styled.div`
    width: 100%;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

/** パディング管理がされているテキストエリアの描画 */
export const StyledTextArea = styled.textarea`
    opacity: 0.7;
    width: 100%;
    height: 100%;
    padding: 12px;
    border: none;
    font-size: 16px;
    resize: none;
    outline: none;
    box-sizing: border-box;
`

/** flexboxのレイアウトを使用 */
export const HorizontalFlex = styled.div`
    position: absolute;
    z-index: 10;
    bottom: 0;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;
`

/** StyledTextAreaにPlaceHolderを表示するために使用 */
export const PlaceHolderForStyledTextArea = styled.div`
    position: absolute;
    font-size: 14px;
    font-weight: normal;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    p {
        line-height: 1.4;
        margin-bottom: 1rem;
    }
    ul {
        margin-left: 32px;
        line-height: 1.4;
    }
`

/** コピーボタン */
export const CopyClipButton = styled.button`
    width: 100%;
    height: 32px;
    font-size: 16px;
    background-color: #33ccee;
    border: none;
    border-radius: 4px;
    color: white;
    padding: 4px 16px;
    box-shadow: 2px 2px 4px #999;
    transition-duration: 0.4s;
    transition-property: opacity, background-color;
    &:hover {
        opacity: 0.6;
    }
`

/** Go to Deepl Translation ボタン */
export const DeeplButton = styled(CopyClipButton)`
    background-color: #0F2B46;
    margin-left: 24px;
`

/** 入力文字列をclearするボタン */
export const ClearButton = styled(CopyClipButton)`
    background-color: white;
    color: grey;
    &:hover {
        background-color: ghostwhite;
        opacity: 1;
    }
`

/** 中心寄せを行う */
export const Centering = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

/** 一行の入力 */
export const LineInput = styled.input`
    background: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    box-shadow: 2px 2px 12px #ccc;
`

/** ファイル選択input */
export const FileInputLabel = styled.label`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 2px 2px 12px #ccc;
`

/** テーブル */
export const StyledTable = styled.table`
    margin-bottom: 16px;
    tbody {
        tr {
            td {
                padding-bottom: 12px;
                padding-right: 16px;
                &:last-child {
                    padding-right: 0;
                }
            }
        }
    }
`