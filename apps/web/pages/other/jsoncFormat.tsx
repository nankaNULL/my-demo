import { jsonText } from '../../components/test';
import { format, Edit, applyEdits, parse } from 'jsonc-parser';

export default function Web() {
    let range = undefined;
    const o: any = {};
    const options = {
        tabSize: o ? o.tabSize : 2,
        insertSpaces: o?.insertSpaces === true,
        insertFinalNewline: o?.insertFinalNewline === true,
        eol: '\n',
        keepLines: o?.keepLines === true
    };
    const text = jsonText;
    const formatList = format(text, range, options);
    // let result = text;

    // const result = formatList.map(e => {
    // 	return TextEdit.replace(JSONRange.create(d.positionAt(e.offset), d.positionAt(e.offset + e.length)), e.content);
    // })
    const result = formatList.map((item: Edit, index: number) => {
        if (index === 0) {
            return text.slice(0, item.offset) + item.content + text.slice(item.offset + item.length, formatList[index + 1].offset);
        }
        if (index === formatList.length - 1) {
            return item.content + text.slice(item.offset + item.length);
        }
        return item.content + text.slice(item.offset + item.length, formatList[index + 1].offset);
    })
    console.log('applyEdits', applyEdits(text, formatList));
    console.log('parser', parse(text))
    return (
        <div style={{ padding: 20 }}>
            Format
        </div>
    );
}


