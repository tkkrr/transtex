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
    width: 28%;
    margin: 24px auto;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

/** パディング管理がされているテキストエリアの描画 */
export const StyledTextArea = styled.textarea`
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
export const HorizontalFlex = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;
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
    transition: opacity 0.4s;
    &:hover {
        opacity: 0.6;
    }
`

/** Go to Google Translation ボタン */
export const GoogleButton = styled(CopyClipButton)`
    background-color: #3366aa;
    margin-left: 24px;
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