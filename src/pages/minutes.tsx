import * as React from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { MainArea, TextAreaContainer, StyledTextArea, HorizontalFlex, Centering, LineInput, StyledTable, FileInputLabel, CopyClipButton, RightArrow } from '../components/styled'


import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import '../day_picker.scss'

const weekday = ["日","月","火","水","木","金","土"]

interface MinutesState {
    date: Date,
    time: string,
    presenter: string,
    chairman: string,
    minutes: string,
    file?: File,
    fileContent: string,
}

export default class Minutes extends React.Component<{},MinutesState> {
    // const [date, changeDate] = React.useState(new Date())
    constructor(props: any){
        super(props)
        this.state = {
            date: new Date(),
            time: `${new Date().getHours()}:${("0" + new Date().getMinutes()).slice(-2)}`,
            presenter: "",
            chairman: "",
            minutes: "",
            fileContent: ""
        }
    }

    /**
     * トースト通知を行う
     * @param status メッセージの種類
     * @param message メッセージ本文
     */
    notify = (status: "info" | "error" | "success", message: string) => {
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
    copyClip = (string: string) => {
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

        this.notify(
            result ? "success" : "error", 
            result ? "Copy to Clipboard is Successful !!"
                   : "Oops... Something wrong..."
        )
    }

    handleChange = (e: Date|Date[]) => {
        if(e instanceof Date){
            this.setState({
                date: e
            })
        }else{
            console.log(e)
        }
    }

    handleInputChange = (state: "time" | "presenter" | "chairman" | "minutes", str?: string) => {
        const nonNullStr = str || ""
        switch(state){
            case "time": this.setState({ time: nonNullStr }); break;
            case "presenter": this.setState({ presenter: nonNullStr }); break;
            case "chairman": this.setState({ chairman: nonNullStr }); break;
            case "minutes": this.setState({ minutes: nonNullStr }); break;
            default: break;
        }
    }

    handleFileUpload = (files: FileList | null) => {
        if(files){
            const upload_file = files.item(0)
            if(upload_file){
                let reader = new FileReader()
                reader.onload = () => {
                    const content = typeof reader.result === "string" ? reader.result : ""

                    const formatter1 = content.split("\n").map( item => {
                        let remove_flag = false
                        remove_flag = item.search(/^%/) !== -1
                        return remove_flag ? "" : item
                    }).filter( item => {
                        return !!item 
                            && item.search(/^(\\newsentence|\\newboldsentence|\{)/) !== -1
                            && item.search(/[亜-熙ぁ-んァ-ヶ]/) !== -1
                    } ).map( (item, index) => {
                        const text = item.replace(/({|})/g, "")
                        return `(${index+1})
対訳：　${text}
改善：　`
                    } )

                    this.setState({
                        file: upload_file,
                        fileContent: formatter1.join(""),
                        date: new Date( parseInt( upload_file.name.slice(-12,-8) ), parseInt( upload_file.name.slice(-8,-6) )-1, parseInt( upload_file.name.slice(-6,-4) ))
                    })
                }
                reader.readAsText(upload_file)
            }
        }
    }


    formatoutput = () => {
        return `* ${this.state.date.getFullYear()}年${this.state.date.getMonth()+1}月${this.state.date.getDate()}日(${weekday[this.state.date.getDay()]})
開始：${this.state.time}
終了：

発表者：${this.state.presenter}
司会：${this.state.chairman}
議事録：${this.state.minutes}
欠席：
遅刻：

** 次回ゼミ
日時：
開始：13:00
場所：SB0911-1
発表者：
議事録：
司会：

* 事務連絡

* 内容
論文：

** 発表
${this.state.fileContent}
`
    }

    render() {
        return <Layout>
            <SEO
                title="Minutes"
                path="/minutes"
            />
            <MainArea>
                <TextAreaContainer>
                    <StyledTable >
                        <tbody>
                        <tr>
                            <td>
                                TeX
                            </td>
                            <td>
                                <FileInputLabel htmlFor="file_uploader">
                                    {this.state.file ? this.state.file.name : "TeXファイルを選択"}
                                    <input type="file" id="file_uploader" style={{display: "none"}}
                                        onChange={e => this.handleFileUpload(e.target.files)}
                                    />
                                </FileInputLabel>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                開始時刻
                            </td>
                            <td>
                                <LineInput
                                    type="text"
                                    value={this.state.time}
                                    onChange={e => this.handleInputChange("time", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                発表者
                            </td>
                            <td>
                                <LineInput
                                    type="text"
                                    value={this.state.presenter}
                                    onChange={e => this.handleInputChange("presenter", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                司会
                            </td>
                            <td>
                                <LineInput
                                    type="text"
                                    value={this.state.chairman}
                                    onChange={e => this.handleInputChange("chairman", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                議事録
                            </td>
                            <td>
                                <LineInput
                                    type="text"
                                    value={this.state.minutes}
                                    onChange={e => this.handleInputChange("minutes", e.target.value)}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </StyledTable>
                </TextAreaContainer>
                <RightArrow/>
                <TextAreaContainer>
                    <HorizontalFlex>
                        <CopyClipButton onClick={e => this.copyClip(this.formatoutput())}>
                            Copy
                        </CopyClipButton>
                    </HorizontalFlex>
                    <StyledTextArea
                        readOnly
                        value={this.formatoutput()}
                        style={{fontSize: "10px"}}
                    />
                </TextAreaContainer>
            </MainArea>
            <ToastContainer/>
        </Layout>
    }
}