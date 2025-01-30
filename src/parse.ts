import { T, PT, Z, sanitize_plus_term, p, n } from "./code";

export class Scanner {
    str: string;
    pos: number;
    constructor(str: string) {
        this.str = str.replace(/\s/g, ""); // 空白は無視
        this.pos = 0;
    }

    // 次の文字が期待した文字なら1文字進め、trueを返す。
    // 次の文字が期待した文字でないなら何もせず、falseを返す。
    consume(op: string): boolean {
        if (this.str[this.pos] !== op) return false;
        this.pos += 1;
        return true;
    }

    // 次の文字が期待した文字なら1文字進める。
    // 次の文字が期待した文字でないなら例外を投げる。
    expect(op: string): void {
        const ch = this.str[this.pos];
        if (ch === undefined)
            throw Error(
                `${this.pos + 1}文字目に${op}が期待されていましたが、これ以上文字がありません`,
            );
        if (ch !== op)
            throw Error(`${this.pos + 1}文字目に${op}が期待されていましたが、${ch}が見つかりました`);
        this.pos += 1;
    }

    // 式をパース
    parse_term(): T {
        if (this.str === "") throw Error(`Empty string`);
        if (this.consume("0")) {
            return Z;
        } else {
            let list: PT[] = [];
            const first = this.parse_principal();
            list.push(first);
            while (this.consume("+")) {
                const term = this.parse_term();
                if (term.type === "zero") {
                    throw Error(`0は+で接続できません`);
                } else if (term.type === "plus") {
                    list = list.concat(term.add);
                } else {
                    list.push(term);
                }
            }
            return sanitize_plus_term(list);
        }
    }

    parse_principal(): PT {
        if (this.consume("p")) {
            this.expect("(");
            const arg = this.parse_term();
            this.expect(")");
            return p(arg);
        }
        this.expect("n");
        this.expect("(");
        const arg = this.parse_term();
        this.expect(")");
        return n(arg);
    }
}