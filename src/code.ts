export type T = ZT | PT | AT;
export type ZT = { readonly type: "zero" };
export type AT = { readonly type: "plus", readonly add: PT[] };
export type PT = PPT | PNT;
export type PPT = { readonly type: "p", readonly arg: T };
export type PNT = { readonly type: "n", readonly arg: T };

export const Z: ZT = { type: "zero" };

export function p(arg: T): PT {
    return { type: "p", arg: arg };
}

export function n(arg: T): PT {
    return { type: "n", arg: arg };
}

export function sanitize_plus_term(add: PT[]): PT | AT {
    if (add.length === 1) {
        return add[0];
    } else {
        return { type: "plus", add: add };
    }
}

export function le(s: T,t: T): boolean {
    if (s.type === "zero") return true;
    if (t.type === "zero") return false;
    else if (t.type === "plus") {
        const a = t.add[0];
        const b = sanitize_plus_term(t.add.slice(1));
        return le(s,a) || le(s,b);
    } else if (t.type === "p") {
        const a = t.arg;
        if (s.type === "plus") {
            const b = s.add[0];
            const c = sanitize_plus_term(s.add.slice(1));
            return le(b,t) && le(c,t);
        } else if (s.type === "p") {
            const b = s.arg;
            return le(b,a);
        } else {
            const b = s.arg;
            return le(b,t);
        }
    } else {
        const a = t.arg;
        if (s.type === "plus") {
            const b = s.add[0];
            const c = sanitize_plus_term(s.add.slice(1));
            return le(b,t) && le(c,t);
        } else if (s.type === "p") {
            const b = s.arg;
            return le(b,t);
        } else {
            const b = s.arg;
            return le(b,a);
        }
    }
}