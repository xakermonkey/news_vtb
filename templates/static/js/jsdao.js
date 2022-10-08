if (!window.jsdao_) {
    window.jsdao_ = {};
    (function () {/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
        var l;

        function aa(a) {
            var c = 0;
            return function () {
                return c < a.length ? {done: !1, value: a[c++]} : {done: !0}
            }
        }

        function ba(a) {
            var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
            return c ? c.call(a) : {next: aa(a)}
        }

        var ca = "function" == typeof Object.create ? Object.create : function (a) {
            function c() {
            }

            c.prototype = a;
            return new c
        }, da = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, b) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[c] = b.value;
            return a
        };

        function ea(a) {
            a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
            for (var c = 0; c < a.length; ++c) {
                var b = a[c];
                if (b && b.Math == Math) return b
            }
            throw Error("Cannot find global object");
        }

        var fa = ea(this);

        function ha(a, c) {
            if (c) a:{
                for (var b = fa, d = a.split("."), e = 0; e < d.length - 1; e++) {
                    var f = d[e];
                    if (!(f in b)) break a;
                    b = b[f]
                }
                d = d[d.length - 1];
                e = b[d];
                f = c(e);
                f != e && null != f && da(b, d, {configurable: !0, writable: !0, value: f})
            }
        }

        var ia;
        if ("function" == typeof Object.setPrototypeOf) ia = Object.setPrototypeOf; else {
            var ka;
            a:{
                var la = {T: !0}, ma = {};
                try {
                    ma.__proto__ = la;
                    ka = ma.T;
                    break a
                } catch (a) {
                }
                ka = !1
            }
            ia = ka ? function (a, c) {
                a.__proto__ = c;
                if (a.__proto__ !== c) throw new TypeError(a + " is not extensible");
                return a
            } : null
        }
        var na = ia;
        ha("Symbol", function (a) {
            function c(e) {
                if (this instanceof c) throw new TypeError("Symbol is not a constructor");
                return new b("jscomp_symbol_" + (e || "") + "_" + d++, e)
            }

            function b(e, f) {
                this.a = e;
                da(this, "description", {configurable: !0, writable: !0, value: f})
            }

            if (a) return a;
            b.prototype.toString = function () {
                return this.a
            };
            var d = 0;
            return c
        });
        ha("Symbol.iterator", function (a) {
            if (a) return a;
            a = Symbol("Symbol.iterator");
            for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) {
                var d = fa[c[b]];
                "function" === typeof d && "function" != typeof d.prototype[a] && da(d.prototype, a, {
                    configurable: !0,
                    writable: !0,
                    value: function () {
                        return oa(aa(this))
                    }
                })
            }
            return a
        });

        function oa(a) {
            a = {next: a};
            a[Symbol.iterator] = function () {
                return this
            };
            return a
        }

        function pa(a, c) {
            return Object.prototype.hasOwnProperty.call(a, c)
        }

        ha("WeakMap", function (a) {
            function c(k) {
                this.o = (h += Math.random() + 1).toString();
                if (k) {
                    k = ba(k);
                    for (var m; !(m = k.next()).done;) m = m.value, this.set(m[0], m[1])
                }
            }

            function b() {
            }

            function d(k) {
                var m = typeof k;
                return "object" === m && null !== k || "function" === m
            }

            function e(k) {
                if (!pa(k, g)) {
                    var m = new b;
                    da(k, g, {value: m})
                }
            }

            function f(k) {
                var m = Object[k];
                m && (Object[k] = function (p) {
                    if (p instanceof b) return p;
                    Object.isExtensible(p) && e(p);
                    return m(p)
                })
            }

            if (function () {
                if (!a || !Object.seal) return !1;
                try {
                    var k = Object.seal({}), m = Object.seal({}),
                        p = new a([[k, 2], [m, 3]]);
                    if (2 != p.get(k) || 3 != p.get(m)) return !1;
                    p["delete"](k);
                    p.set(m, 4);
                    return !p.has(k) && 4 == p.get(m)
                } catch (v) {
                    return !1
                }
            }()) return a;
            var g = "$jscomp_hidden_" + Math.random();
            f("freeze");
            f("preventExtensions");
            f("seal");
            var h = 0;
            c.prototype.set = function (k, m) {
                if (!d(k)) throw Error("Invalid WeakMap key");
                e(k);
                if (!pa(k, g)) throw Error("WeakMap key fail: " + k);
                k[g][this.o] = m;
                return this
            };
            c.prototype.get = function (k) {
                return d(k) && pa(k, g) ? k[g][this.o] : void 0
            };
            c.prototype.has = function (k) {
                return d(k) &&
                    pa(k, g) && pa(k[g], this.o)
            };
            c.prototype["delete"] = function (k) {
                return d(k) && pa(k, g) && pa(k[g], this.o) ? delete k[g][this.o] : !1
            };
            return c
        });
        ha("Map", function (a) {
            function c() {
                var h = {};
                return h.A = h.next = h.head = h
            }

            function b(h, k) {
                var m = h.a;
                return oa(function () {
                    if (m) {
                        for (; m.head != h.a;) m = m.A;
                        for (; m.next != m.head;) return m = m.next, {done: !1, value: k(m)};
                        m = null
                    }
                    return {done: !0, value: void 0}
                })
            }

            function d(h, k) {
                var m = k && typeof k;
                "object" == m || "function" == m ? f.has(k) ? m = f.get(k) : (m = "" + ++g, f.set(k, m)) : m = "p_" + k;
                var p = h.b[m];
                if (p && pa(h.b, m)) for (var v = 0; v < p.length; v++) {
                    var x = p[v];
                    if (k !== k && x.key !== x.key || k === x.key) return {id: m, list: p, index: v, l: x}
                }
                return {
                    id: m,
                    list: p, index: -1, l: void 0
                }
            }

            function e(h) {
                this.b = {};
                this.a = c();
                this.size = 0;
                if (h) {
                    h = ba(h);
                    for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
                }
            }

            if (function () {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var h = Object.seal({x: 4}), k = new a(ba([[h, "s"]]));
                    if ("s" != k.get(h) || 1 != k.size || k.get({x: 4}) || k.set({x: 4}, "t") != k || 2 != k.size) return !1;
                    var m = k.entries(), p = m.next();
                    if (p.done || p.value[0] != h || "s" != p.value[1]) return !1;
                    p = m.next();
                    return p.done || 4 != p.value[0].x ||
                    "t" != p.value[1] || !m.next().done ? !1 : !0
                } catch (v) {
                    return !1
                }
            }()) return a;
            var f = new WeakMap;
            e.prototype.set = function (h, k) {
                h = 0 === h ? 0 : h;
                var m = d(this, h);
                m.list || (m.list = this.b[m.id] = []);
                m.l ? m.l.value = k : (m.l = {
                    next: this.a,
                    A: this.a.A,
                    head: this.a,
                    key: h,
                    value: k
                }, m.list.push(m.l), this.a.A.next = m.l, this.a.A = m.l, this.size++);
                return this
            };
            e.prototype["delete"] = function (h) {
                h = d(this, h);
                return h.l && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.b[h.id], h.l.A.next = h.l.next, h.l.next.A = h.l.A, h.l.head = null,
                    this.size--, !0) : !1
            };
            e.prototype.clear = function () {
                this.b = {};
                this.a = this.a.A = c();
                this.size = 0
            };
            e.prototype.has = function (h) {
                return !!d(this, h).l
            };
            e.prototype.get = function (h) {
                return (h = d(this, h).l) && h.value
            };
            e.prototype.entries = function () {
                return b(this, function (h) {
                    return [h.key, h.value]
                })
            };
            e.prototype.keys = function () {
                return b(this, function (h) {
                    return h.key
                })
            };
            e.prototype.values = function () {
                return b(this, function (h) {
                    return h.value
                })
            };
            e.prototype.forEach = function (h, k) {
                for (var m = this.entries(), p; !(p = m.next()).done;) p =
                    p.value, h.call(k, p[1], p[0], this)
            };
            e.prototype[Symbol.iterator] = e.prototype.entries;
            var g = 0;
            return e
        });
        ha("Set", function (a) {
            function c(b) {
                this.a = new Map;
                if (b) {
                    b = ba(b);
                    for (var d; !(d = b.next()).done;) this.add(d.value)
                }
                this.size = this.a.size
            }

            if (function () {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var b = Object.seal({x: 4}), d = new a(ba([b]));
                    if (!d.has(b) || 1 != d.size || d.add(b) != d || 1 != d.size || d.add({x: 4}) != d || 2 != d.size) return !1;
                    var e = d.entries(), f = e.next();
                    if (f.done || f.value[0] != b || f.value[1] != b) return !1;
                    f = e.next();
                    return f.done || f.value[0] == b || 4 != f.value[0].x ||
                    f.value[1] != f.value[0] ? !1 : e.next().done
                } catch (g) {
                    return !1
                }
            }()) return a;
            c.prototype.add = function (b) {
                b = 0 === b ? 0 : b;
                this.a.set(b, b);
                this.size = this.a.size;
                return this
            };
            c.prototype["delete"] = function (b) {
                b = this.a["delete"](b);
                this.size = this.a.size;
                return b
            };
            c.prototype.clear = function () {
                this.a.clear();
                this.size = 0
            };
            c.prototype.has = function (b) {
                return this.a.has(b)
            };
            c.prototype.entries = function () {
                return this.a.entries()
            };
            c.prototype.values = function () {
                return this.a.values()
            };
            c.prototype.keys = c.prototype.values;
            c.prototype[Symbol.iterator] = c.prototype.values;
            c.prototype.forEach = function (b, d) {
                var e = this;
                this.a.forEach(function (f) {
                    return b.call(d, f, f, e)
                })
            };
            return c
        });
        var n = this || self, ra = /^[\w+/_-]+[=]{0,2}$/, sa = null;

        function ta(a) {
            return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && ra.test(a) ? a : ""
        }

        function ua() {
        }

        function va(a) {
            a.J = void 0;
            a.i = function () {
                return a.J ? a.J : a.J = new a
            }
        }

        function wa(a) {
            var c = typeof a;
            return "object" != c ? c : a ? Array.isArray(a) ? "array" : c : "null"
        }

        function xa(a) {
            var c = wa(a);
            return "array" == c || "object" == c && "number" == typeof a.length
        }

        function ya(a) {
            return "function" == wa(a)
        }

        function q(a) {
            var c = typeof a;
            return "object" == c && null != a || "function" == c
        }

        var za = "closure_uid_" + (1E9 * Math.random() >>> 0), Aa = 0;

        function Ba(a, c, b) {
            return a.call.apply(a.bind, arguments)
        }

        function Ca(a, c, b) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var e = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(e, d);
                    return a.apply(c, e)
                }
            }
            return function () {
                return a.apply(c, arguments)
            }
        }

        function Da(a, c, b) {
            Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Da = Ba : Da = Ca;
            return Da.apply(null, arguments)
        }

        var Fa = Date.now || function () {
            return +new Date
        };

        function r(a, c) {
            var b = a.split("."), d = n;
            b[0] in d || "undefined" == typeof d.execScript || d.execScript("var " + b[0]);
            for (var e; b.length && (e = b.shift());) b.length || void 0 === c ? d[e] && d[e] !== Object.prototype[e] ? d = d[e] : d = d[e] = {} : d[e] = c
        }

        function t(a, c) {
            function b() {
            }

            b.prototype = c.prototype;
            a.prototype = new b;
            a.prototype.constructor = a
        }

        function Ga(a) {
            return a
        };

        function Ha(a) {
            return void 0 !== a
        }

        function u(a) {
            return "string" == typeof a
        }

        function Ja(a) {
            return "boolean" == typeof a
        }

        function y(a) {
            return "number" == typeof a
        }

        function Ka(a) {
            return "array" === wa(a)
        }

        function z(a) {
            return "function" === wa(a)
        };

        function La(a) {
            if (Error.captureStackTrace) Error.captureStackTrace(this, La); else {
                var c = Error().stack;
                c && (this.stack = c)
            }
            a && (this.message = String(a))
        }

        t(La, Error);
        La.prototype.name = "CustomError";
        var Ma = Array.prototype.indexOf ? function (a, c) {
            return Array.prototype.indexOf.call(a, c, void 0)
        } : function (a, c) {
            if ("string" === typeof a) return "string" !== typeof c || 1 != c.length ? -1 : a.indexOf(c, 0);
            for (var b = 0; b < a.length; b++) if (b in a && a[b] === c) return b;
            return -1
        }, Na = Array.prototype.forEach ? function (a, c, b) {
            Array.prototype.forEach.call(a, c, b)
        } : function (a, c, b) {
            for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && c.call(b, e[f], f, a)
        }, Oa = Array.prototype.filter ? function (a, c) {
            return Array.prototype.filter.call(a,
                c, void 0)
        } : function (a, c) {
            for (var b = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < b; g++) if (g in f) {
                var h = f[g];
                c.call(void 0, h, g, a) && (d[e++] = h)
            }
            return d
        }, Pa = Array.prototype.some ? function (a, c) {
            return Array.prototype.some.call(a, c, void 0)
        } : function (a, c) {
            for (var b = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < b; e++) if (e in d && c.call(void 0, d[e], e, a)) return !0;
            return !1
        };

        function Qa(a) {
            return Array.prototype.concat.apply([], arguments)
        }

        function Sa(a) {
            var c = a.length;
            if (0 < c) {
                for (var b = Array(c), d = 0; d < c; d++) b[d] = a[d];
                return b
            }
            return []
        }

        function Ta(a, c, b) {
            return 2 >= arguments.length ? Array.prototype.slice.call(a, c) : Array.prototype.slice.call(a, c, b)
        };

        function Ua(a, c) {
            for (var b in a) c.call(void 0, a[b], b, a)
        }

        var Va = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

        function Wa(a, c) {
            for (var b, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (b in d) a[b] = d[b];
                for (var f = 0; f < Va.length; f++) b = Va[f], Object.prototype.hasOwnProperty.call(d, b) && (a[b] = d[b])
            }
        };var Xa;

        function Ya(a, c) {
            this.a = a === Za && c || "";
            this.b = ab
        }

        Ya.prototype.X = !0;
        Ya.prototype.W = function () {
            return this.a.toString()
        };

        function bb(a) {
            return a instanceof Ya && a.constructor === Ya && a.b === ab ? a.a : "type_error:TrustedResourceUrl"
        }

        var ab = {}, Za = {};
        var cb = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
        }, db = /&/g, eb = /</g, fb = />/g, gb = /"/g, hb = /'/g, ib = /\x00/g, jb = /[\x00&<>"']/;
        var kb;
        a:{
            var lb = n.navigator;
            if (lb) {
                var mb = lb.userAgent;
                if (mb) {
                    kb = mb;
                    break a
                }
            }
            kb = ""
        }

        function nb(a) {
            return -1 != kb.indexOf(a)
        };

        function ob(a, c) {
            a.src = bb(c);
            var b;
            (b = a.ownerDocument && a.ownerDocument.defaultView) && b != n ? b = ta(b.document) : (null === sa && (sa = ta(n.document)), b = sa);
            b && a.setAttribute("nonce", b)
        };

        function B(a) {
            return 0 == a.length
        }

        function pb(a) {
            jb.test(a) && (-1 != a.indexOf("&") && (a = a.replace(db, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(eb, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(fb, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(gb, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(hb, "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace(ib, "&#0;")));
            return a
        };

        function qb() {
            this.a = rb("a0.smi2.ru, a1.smi2.ru, a2.smi2.ru, a3.smi2.ru, a4.smi2.ru, a5.smi2.ru, a6.smi2.ru, a7.smi2.ru");
            this.b = rb("exad.stat.media")
        }

        va(qb);

        function sb() {
            return "JsDao Library 3.6.0"
        }

        function tb(a) {
            return a.a[Math.random() * a.a.length >> 0]
        }

        function ub(a) {
            return a.b[Math.random() * a.b.length >> 0]
        }

        function rb(a) {
            var c = [];
            a = Ka(a) ? a : a.split(",");
            for (var b = 0; b < a.length; b++) {
                var d = a[b];
                u(d) && !/^[\s\xa0]*$/.test(d) && c.push(cb(d))
            }
            return c
        };

        function vb(a) {
            a = Math.ceil(a / 8);
            for (var c = Array(a), b = 0; b < a; b++) c[b] = 0;
            this.a = c
        }

        vb.prototype.get = function (a) {
            return 0 != (this.a[a / 8 >> 0] & 1 << a % 8)
        };
        vb.prototype.set = function (a) {
            return this.get(a) ? !1 : (this.a[a / 8 >> 0] |= 1 << a % 8, !0)
        };

        function wb() {
            this.a = new vb(1024)
        }

        function xb(a, c) {
            for (var b = C(8 * a.a.a.length), d = c.b, e = c.a, f = 0; 2 > f; f++) a.a.set(yb(e.and(zb), b).g), e = e.add(d)
        };

        function Ab(a, c) {
            var b = Bb;
            return Object.prototype.hasOwnProperty.call(b, a) ? b[a] : b[a] = c(a)
        };

        function Cb(a, c) {
            this.g = a | 0;
            this.a = c | 0
        }

        function Db(a) {
            return 4294967296 * a.a + (a.g >>> 0)
        }

        l = Cb.prototype;
        l.toString = function (a) {
            a = a || 10;
            if (2 > a || 36 < a) throw Error("radix out of range: " + a);
            var c = this.a >> 21;
            if (0 == c || -1 == c && (0 != this.g || -2097152 != this.a)) return c = Db(this), 10 == a ? "" + c : c.toString(a);
            c = 14 - (a >> 2);
            var b = Math.pow(a, c), d = E(b, b / 4294967296);
            b = Eb(this, d);
            d = Math.abs(Db(this.add(Fb(Gb(b, d)))));
            var e = 10 == a ? "" + d : d.toString(a);
            e.length < c && (e = "0000000000000".substr(e.length - c) + e);
            d = Db(b);
            return (10 == a ? d : d.toString(a)) + e
        };

        function Hb(a) {
            return 0 == a.g && 0 == a.a
        }

        function Ib(a, c) {
            return a.g == c.g && a.a == c.a
        }

        function Jb(a, c) {
            return a.a == c.a ? a.g == c.g ? 0 : a.g >>> 0 > c.g >>> 0 ? 1 : -1 : a.a > c.a ? 1 : -1
        }

        function Fb(a) {
            var c = ~a.g + 1 | 0;
            return E(c, ~a.a + !c | 0)
        }

        l.add = function (a) {
            var c = this.a >>> 16, b = this.a & 65535, d = this.g >>> 16, e = a.a >>> 16, f = a.a & 65535,
                g = a.g >>> 16;
            a = (this.g & 65535) + (a.g & 65535);
            g = (a >>> 16) + (d + g);
            d = g >>> 16;
            d += b + f;
            c = (d >>> 16) + (c + e) & 65535;
            return E((g & 65535) << 16 | a & 65535, c << 16 | d & 65535)
        };

        function Gb(a, c) {
            if (Hb(a)) return a;
            if (Hb(c)) return c;
            var b = a.a >>> 16, d = a.a & 65535, e = a.g >>> 16, f = a.g & 65535, g = c.a >>> 16, h = c.a & 65535,
                k = c.g >>> 16, m = c.g & 65535;
            var p = f * m;
            var v = (p >>> 16) + e * m;
            var x = v >>> 16;
            v = (v & 65535) + f * k;
            x += v >>> 16;
            x += d * m;
            var w = x >>> 16;
            x = (x & 65535) + e * k;
            w += x >>> 16;
            x = (x & 65535) + f * h;
            w = w + (x >>> 16) + (b * m + d * k + e * h + f * g) & 65535;
            return E((v & 65535) << 16 | p & 65535, w << 16 | x & 65535)
        }

        function Eb(a, c) {
            if (Hb(c)) throw Error("division by zero");
            if (0 > a.a) {
                if (Ib(a, Nb)) {
                    if (Ib(c, Ob) || Ib(c, Pb)) return Nb;
                    if (Ib(c, Nb)) return Ob;
                    var b = F(Eb(Qb(a, 1), c), 1);
                    if (Ib(b, Rb)) return 0 > c.a ? Ob : Pb;
                    var d = a.add(Fb(Gb(c, b)));
                    return b.add(Eb(d, c))
                }
                return 0 > c.a ? Eb(Fb(a), Fb(c)) : Fb(Eb(Fb(a), c))
            }
            if (Hb(a)) return Rb;
            if (0 > c.a) return Ib(c, Nb) ? Rb : Fb(Eb(a, Fb(c)));
            var e = Rb;
            for (d = a; 0 <= Jb(d, c);) {
                b = Math.max(1, Math.floor(Db(d) / Db(c)));
                var f = Math.ceil(Math.log(b) / Math.LN2);
                f = 48 >= f ? 1 : Math.pow(2, f - 48);
                for (var g = Sb(b), h = Gb(g,
                    c); 0 > h.a || 0 < Jb(h, d);) b -= f, g = Sb(b), h = Gb(g, c);
                Hb(g) && (g = Ob);
                e = e.add(g);
                d = d.add(Fb(h))
            }
            return e
        }

        function yb(a, c) {
            var b = Gb(Eb(a, c), c);
            return a.add(Fb(b))
        }

        l.and = function (a) {
            return E(this.g & a.g, this.a & a.a)
        };
        l.or = function (a) {
            return E(this.g | a.g, this.a | a.a)
        };
        l.xor = function (a) {
            return E(this.g ^ a.g, this.a ^ a.a)
        };

        function F(a, c) {
            c &= 63;
            if (0 == c) return a;
            var b = a.g;
            return 32 > c ? E(b << c, a.a << c | b >>> 32 - c) : E(0, b << c - 32)
        }

        function Qb(a, c) {
            c &= 63;
            if (0 == c) return a;
            var b = a.a;
            return 32 > c ? E(a.g >>> c | b << 32 - c, b >> c) : E(b >> c - 32, 0 <= b ? 0 : -1)
        }

        function Tb(a, c) {
            c &= 63;
            if (0 == c) return a;
            var b = a.a;
            return 32 > c ? E(a.g >>> c | b << 32 - c, b >>> c) : 32 == c ? E(b, 0) : E(b >>> c - 32, 0)
        }

        function C(a) {
            a |= 0;
            return -128 <= a && 128 > a ? Ub(a) : new Cb(a, 0 > a ? -1 : 0)
        }

        function Sb(a) {
            return 0 < a ? 0x7fffffffffffffff <= a ? zb : new Cb(a, a / 4294967296) : 0 > a ? -9223372036854775808 >= a ? Nb : Fb(new Cb(-a, -a / 4294967296)) : Rb
        }

        function E(a, c) {
            return new Cb(a, c)
        }

        var Bb = {};

        function Ub(a) {
            return Ab(a, function (c) {
                return new Cb(c, 0 > c ? -1 : 0)
            })
        }

        var Rb = E(0, 0), Ob = E(1, 0), Pb = E(-1, -1), zb = E(4294967295, 2147483647), Nb = E(0, 2147483648);

        function Vb() {
            this.a = C(0);
            this.b = C(0);
            this.c = Rb
        }

        var Wb = C(16), Xb = new Cb(289559509, 2277735313), Yb = new Cb(658871167, 1291169091),
            Zb = new Cb(3981806797, 4283543511), $b = new Cb(444984403, 3301882366), ac = C(1390208809),
            bc = C(944331445), cc = C(5);

        function dc(a) {
            var c = new Vb;
            a = null != a ? a : 0;
            for (var b = [], d = 0; 4 > d; d++) b[d] = a >>> 8 * d & 255;
            for (a = Sa(b); 0 <= Jb(C(a.length), Wb);) {
                b = c;
                var e = a;
                d = ec(e);
                e = ec(e);
                b.a = b.a.xor(fc(d));
                b.a = gc(b.a, 27);
                b.a = b.a.add(b.b);
                b.a = Gb(b.a, cc).add(ac);
                b.b = b.b.xor(hc(e));
                b.b = gc(b.b, 31);
                b.b = b.b.add(b.a);
                b.b = Gb(b.b, cc).add(bc);
                b.c = b.c.add(Wb)
            }
            if (0 < a.length) {
                d = b = Rb;
                c.c = c.c.add(C(a.length));
                switch (a.length) {
                    case 15:
                        d = d.xor(F(C(a[14]), 48));
                    case 14:
                        d = d.xor(F(C(a[13]), 40));
                    case 13:
                        d = d.xor(F(C(a[12]), 32));
                    case 12:
                        d = d.xor(F(C(a[11]), 24));
                    case 11:
                        d = d.xor(F(C(a[10]), 16));
                    case 10:
                        d = d.xor(F(C(a[9]), 8));
                    case 9:
                        d = d.xor(C(a[8]));
                    case 8:
                        b = b.xor(ec(a));
                        break;
                    case 7:
                        b = b.xor(F(C(a[6]), 48));
                    case 6:
                        b = b.xor(F(C(a[5]), 40));
                    case 5:
                        b = b.xor(F(C(a[4]), 32));
                    case 4:
                        b = b.xor(F(C(a[3]), 24));
                    case 3:
                        b = b.xor(F(C(a[2]), 16));
                    case 2:
                        b = b.xor(F(C(a[1]), 8));
                    case 1:
                        b = b.xor(C(a[0]));
                        break;
                    default:
                        throw Error("Should never get here.");
                }
                c.a = c.a.xor(fc(b));
                c.b = c.b.xor(hc(d))
            }
            c.a = c.a.xor(c.c);
            c.b = c.b.xor(c.c);
            c.a = c.a.add(c.b);
            c.b = c.b.add(c.a);
            c.a = ic(c.a);
            c.b = ic(c.b);
            c.a =
                c.a.add(c.b);
            c.b = c.b.add(c.a);
            return new jc(c.a, c.b)
        }

        function ic(a) {
            a = a.xor(Tb(a, 33));
            a = Gb(a, Zb);
            a = a.xor(Tb(a, 33));
            a = Gb(a, $b);
            return a = a.xor(Tb(a, 33))
        }

        function fc(a) {
            a = Gb(a, Xb);
            a = gc(a, 31);
            return a = Gb(a, Yb)
        }

        function hc(a) {
            a = Gb(a, Yb);
            a = gc(a, 33);
            return a = Gb(a, Xb)
        }

        function gc(a, c) {
            return F(a, c).or(Tb(a, -c))
        }

        function ec(a) {
            return new Cb(kc(a), kc(a))
        }

        function kc(a) {
            return a.shift() & 255 | (a.shift() & 255) << 8 | (a.shift() & 255) << 16 | (a.shift() & 255) << 24
        }

        function jc(a, c) {
            this.a = a;
            this.b = c
        };

        function lc(a, c) {
            this.b = {};
            this.a = [];
            this.c = 0;
            var b = arguments.length;
            if (1 < b) {
                if (b % 2) throw Error("Uneven number of arguments");
                for (var d = 0; d < b; d += 2) this.set(arguments[d], arguments[d + 1])
            } else if (a) if (a instanceof lc) for (b = a.D(), d = 0; d < b.length; d++) this.set(b[d], a.get(b[d])); else for (d in a) this.set(d, a[d])
        }

        l = lc.prototype;
        l.F = function () {
            mc(this);
            for (var a = [], c = 0; c < this.a.length; c++) a.push(this.b[this.a[c]]);
            return a
        };
        l.D = function () {
            mc(this);
            return this.a.concat()
        };

        function mc(a) {
            if (a.c != a.a.length) {
                for (var c = 0, b = 0; c < a.a.length;) {
                    var d = a.a[c];
                    nc(a.b, d) && (a.a[b++] = d);
                    c++
                }
                a.a.length = b
            }
            if (a.c != a.a.length) {
                var e = {};
                for (b = c = 0; c < a.a.length;) d = a.a[c], nc(e, d) || (a.a[b++] = d, e[d] = 1), c++;
                a.a.length = b
            }
        }

        l.get = function (a, c) {
            return nc(this.b, a) ? this.b[a] : c
        };
        l.set = function (a, c) {
            nc(this.b, a) || (this.c++, this.a.push(a));
            this.b[a] = c
        };
        l.forEach = function (a, c) {
            for (var b = this.D(), d = 0; d < b.length; d++) {
                var e = b[d], f = this.get(e);
                a.call(c, f, e, this)
            }
        };

        function nc(a, c) {
            return Object.prototype.hasOwnProperty.call(a, c)
        };

        function oc(a, c) {
            if (a) for (var b = a.split("&"), d = 0; d < b.length; d++) {
                var e = b[d].indexOf("="), f = null;
                if (0 <= e) {
                    var g = b[d].substring(0, e);
                    f = b[d].substring(e + 1)
                } else g = b[d];
                c(g, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
            }
        };

        function pc() {
            this.f = this.b = "";
            this.c = !1;
            this.a = new qc(null, this.c)
        }

        pc.prototype.toString = function () {
            var a = [], c = this.b;
            c && (a.push("//"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")));
            if (c = this.f) this.b && "/" != c.charAt(0) && a.push("/"), a.push(rc(c, "/" == c.charAt(0) ? sc : tc, !0));
            (c = this.a.toString()) && a.push("?", c);
            return a.join("")
        };

        function rc(a, c, b) {
            return "string" === typeof a ? (a = encodeURI(a).replace(c, uc), b && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
        }

        function uc(a) {
            a = a.charCodeAt(0);
            return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
        }

        var tc = /[#\?:]/g, sc = /[#\?]/g, vc = /[#\?@]/g;

        function qc(a, c) {
            this.b = this.a = null;
            this.c = a || null;
            this.f = !!c
        }

        function wc(a) {
            a.a || (a.a = new lc, a.b = 0, a.c && oc(a.c, function (c, b) {
                a.add(decodeURIComponent(c.replace(/\+/g, " ")), b)
            }))
        }

        l = qc.prototype;
        l.add = function (a, c) {
            wc(this);
            this.c = null;
            a = xc(this, a);
            var b = this.a.get(a);
            b || this.a.set(a, b = []);
            b.push(c);
            this.b += 1;
            return this
        };

        function yc(a, c) {
            wc(a);
            c = xc(a, c);
            if (nc(a.a.b, c)) {
                a.c = null;
                a.b -= a.a.get(c).length;
                var b = a.a, d = c;
                nc(b.b, d) && (delete b.b[d], b.c--, b.a.length > 2 * b.c && mc(b))
            }
        }

        function zc(a, c) {
            wc(a);
            c = xc(a, c);
            return nc(a.a.b, c)
        }

        l.forEach = function (a, c) {
            wc(this);
            this.a.forEach(function (b, d) {
                Na(b, function (e) {
                    a.call(c, e, d, this)
                }, this)
            }, this)
        };
        l.D = function () {
            wc(this);
            for (var a = this.a.F(), c = this.a.D(), b = [], d = 0; d < c.length; d++) for (var e = a[d], f = 0; f < e.length; f++) b.push(c[d]);
            return b
        };
        l.F = function (a) {
            wc(this);
            var c = [];
            if ("string" === typeof a) zc(this, a) && (c = Qa(c, this.a.get(xc(this, a)))); else {
                a = this.a.F();
                for (var b = 0; b < a.length; b++) c = Qa(c, a[b])
            }
            return c
        };
        l.set = function (a, c) {
            wc(this);
            this.c = null;
            a = xc(this, a);
            zc(this, a) && (this.b -= this.a.get(a).length);
            this.a.set(a, [c]);
            this.b += 1;
            return this
        };
        l.get = function (a, c) {
            if (!a) return c;
            var b = this.F(a);
            return 0 < b.length ? String(b[0]) : c
        };
        l.toString = function () {
            if (this.c) return this.c;
            if (!this.a) return "";
            for (var a = [], c = this.a.D(), b = 0; b < c.length; b++) {
                var d = c[b], e = encodeURIComponent(String(d));
                d = this.F(d);
                for (var f = 0; f < d.length; f++) {
                    var g = e;
                    "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                    a.push(g)
                }
            }
            return this.c = a.join("&")
        };

        function xc(a, c) {
            var b = String(c);
            a.f && (b = b.toLowerCase());
            return b
        }

        function Ac(a, c) {
            c && !a.f && (wc(a), a.c = null, a.a.forEach(function (b, d) {
                var e = d.toLowerCase();
                d != e && (yc(this, d), yc(this, e), 0 < b.length && (this.c = null, this.a.set(xc(this, e), Sa(b)), this.b += b.length))
            }, a));
            a.f = c
        };var Bc = nb("Opera"), Cc = nb("Trident") || nb("MSIE"), Dc = nb("Edge"),
            Ec = nb("Gecko") && !(-1 != kb.toLowerCase().indexOf("webkit") && !nb("Edge")) && !(nb("Trident") || nb("MSIE")) && !nb("Edge"),
            Fc = -1 != kb.toLowerCase().indexOf("webkit") && !nb("Edge");

        function Gc() {
            var a = n.document;
            return a ? a.documentMode : void 0
        }

        var Hc;
        a:{
            var Ic = "", Jc = function () {
                var a = kb;
                if (Ec) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (Dc) return /Edge\/([\d\.]+)/.exec(a);
                if (Cc) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (Fc) return /WebKit\/(\S+)/.exec(a);
                if (Bc) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();
            Jc && (Ic = Jc ? Jc[1] : "");
            if (Cc) {
                var Kc = Gc();
                if (null != Kc && Kc > parseFloat(Ic)) {
                    Hc = String(Kc);
                    break a
                }
            }
            Hc = Ic
        }
        var Lc;
        if (n.document && Cc) {
            var Mc = Gc();
            Lc = Mc ? Mc : parseInt(Hc, 10) || void 0
        } else Lc = void 0;
        var Nc = Lc;
        var Oc = !Cc || 9 <= Number(Nc);

        function Pc() {
            var a = document;
            return a.querySelectorAll && a.querySelector ? a.querySelectorAll("LINK") : a.getElementsByTagName("LINK")
        }

        function Qc(a, c) {
            Ua(c, function (b, d) {
                b && "object" == typeof b && b.X && (b = b.W());
                "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : Rc.hasOwnProperty(d) ? a.setAttribute(Rc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
            })
        }

        var Rc = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        };

        function Sc(a, c, b) {
            var d = arguments, e = document, f = String(d[0]), g = d[1];
            if (!Oc && g && (g.name || g.type)) {
                f = ["<", f];
                g.name && f.push(' name="', pb(g.name), '"');
                if (g.type) {
                    f.push(' type="', pb(g.type), '"');
                    var h = {};
                    Wa(h, g);
                    delete h.type;
                    g = h
                }
                f.push(">");
                f = f.join("")
            }
            f = Tc(e, f);
            g && ("string" === typeof g ? f.className = g : Array.isArray(g) ? f.className = g.join(" ") : Qc(f, g));
            2 < d.length && Uc(e, f, d);
            return f
        }

        function Uc(a, c, b) {
            function d(h) {
                h && c.appendChild("string" === typeof h ? a.createTextNode(h) : h)
            }

            for (var e = 2; e < b.length; e++) {
                var f = b[e];
                if (!xa(f) || q(f) && 0 < f.nodeType) d(f); else {
                    a:{
                        if (f && "number" == typeof f.length) {
                            if (q(f)) {
                                var g = "function" == typeof f.item || "string" == typeof f.item;
                                break a
                            }
                            if (ya(f)) {
                                g = "function" == typeof f.item;
                                break a
                            }
                        }
                        g = !1
                    }
                    Na(g ? Sa(f) : f, d)
                }
            }
        }

        function Tc(a, c) {
            c = String(c);
            "application/xhtml+xml" === a.contentType && (c = c.toLowerCase());
            return a.createElement(c)
        };

        function Vc() {
            this.a = qb.i()
        }

        va(Vc);

        function Wc(a, c, b, d) {
            var e = sb(), f = Vc.i();
            try {
                if (c(), b) try {
                    b()
                } catch (m) {
                }
            } catch (m) {
                try {
                    var g = Xc(m);
                    c = "";
                    m.fileName && (c = m.fileName);
                    b = -1;
                    m.lineNumber && (b = m.lineNumber);
                    var h = -1;
                    m.columnNumber && (h = m.columnNumber);
                    Yc(f, "error", e, a, g, c, b, h)
                } catch (p) {
                    try {
                        var k = Xc(p);
                        g = "";
                        p.fileName && (g = p.fileName);
                        c = -1;
                        p.lineNumber && (c = p.lineNumber);
                        b = -1;
                        p.columnNumber && (b = p.columnNumber);
                        Yc(f, "error", e, a, k, g, c, b)
                    } catch (v) {
                        Yc(f, "error", e, a, v.toString() + "\n" + (v.stack || ""))
                    }
                } finally {
                    if (d) try {
                        d(m)
                    } catch (p) {
                    }
                }
            }
        }

        Vc.prototype.info = function (a, c, b) {
            Yc(this, "info", a, c, b)
        };
        Vc.prototype.error = function (a, c, b) {
            Yc(this, "error", a, c, b)
        };

        function Xc(a) {
            var c = a.toString();
            a.name && -1 == c.indexOf(a.name) && (c += ": " + a.name);
            a.message && -1 == c.indexOf(a.message) && (c += ": " + a.message);
            if (a.stack) {
                a = a.stack.toString();
                var b = c;
                try {
                    -1 == a.indexOf(b) && (a = b + "\n" + a);
                    for (var d; a != d;) d = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                    c = a.replace(/\n */g, "\n")
                } catch (e) {
                    c = b
                }
            }
            return c
        }

        function Yc(a, c, b, d, e, f, g, h) {
            var k = new qc;
            Ha(b) && k.add("a", b.substr(0, 64));
            Ha(d) && k.add("c", d.substr(0, 64));
            Ha(e) && k.add("m", e.substr(0, 1024));
            Ha(f) && k.add("fn", f.substr(0, 256));
            Ha(g) && 0 < g && k.add("ln", g);
            Ha(h) && 0 < h && k.add("cn", h);
            k.add("u", document.URL.substr(0, 1024));
            b = (b = document) ? b.parentWindow || b.defaultView : window;
            try {
                b.jsapi_image_requests || (b.jsapi_image_requests = []);
                var m = new pc;
                m.b = tb(a.a);
                m.f = "/newdata/jsapi/" + c;
                a = k;
                a instanceof qc ? (m.a = a, Ac(m.a, m.c)) : (a = rc(a, vc), m.a = new qc(a, m.c));
                var p =
                    Sc("img", {src: m, alt: ""});
                b.jsapi_image_requests.push(p)
            } catch (v) {
            }
        };

        function Zc(a) {
            if (!a) return !1;
            try {
                return !!a.$goog_Thenable
            } catch (c) {
                return !1
            }
        };

        function $c(a, c) {
            this.c = a;
            this.f = c;
            this.b = 0;
            this.a = null
        }

        $c.prototype.get = function () {
            if (0 < this.b) {
                this.b--;
                var a = this.a;
                this.a = a.next;
                a.next = null
            } else a = this.c();
            return a
        };

        function ad(a, c) {
            a.f(c);
            100 > a.b && (a.b++, c.next = a.a, a.a = c)
        };

        function bd() {
            this.b = this.a = null
        }

        var dd = new $c(function () {
            return new cd
        }, function (a) {
            a.reset()
        });
        bd.prototype.add = function (a, c) {
            var b = dd.get();
            b.set(a, c);
            this.b ? this.b.next = b : this.a = b;
            this.b = b
        };

        function ed() {
            var a = fd, c = null;
            a.a && (c = a.a, a.a = a.a.next, a.a || (a.b = null), c.next = null);
            return c
        }

        function cd() {
            this.next = this.b = this.a = null
        }

        cd.prototype.set = function (a, c) {
            this.a = a;
            this.b = c;
            this.next = null
        };
        cd.prototype.reset = function () {
            this.next = this.b = this.a = null
        };

        function gd(a) {
            n.setTimeout(function () {
                throw a;
            }, 0)
        }

        var hd;

        function id() {
            var a = n.MessageChannel;
            "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !nb("Presto") && (a = function () {
                var e = Tc(document, "IFRAME");
                e.style.display = "none";
                document.documentElement.appendChild(e);
                var f = e.contentWindow;
                e = f.document;
                e.open();
                e.close();
                var g = "callImmediate" + Math.random(),
                    h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
                e = Da(function (k) {
                    if (("*" == h || k.origin == h) && k.data == g) this.port1.onmessage()
                }, this);
                f.addEventListener("message", e, !1);
                this.port1 = {};
                this.port2 = {
                    postMessage: function () {
                        f.postMessage(g, h)
                    }
                }
            });
            if ("undefined" !== typeof a && !nb("Trident") && !nb("MSIE")) {
                var c = new a, b = {}, d = b;
                c.port1.onmessage = function () {
                    if (void 0 !== b.next) {
                        b = b.next;
                        var e = b.L;
                        b.L = null;
                        e()
                    }
                };
                return function (e) {
                    d.next = {L: e};
                    d = d.next;
                    c.port2.postMessage(0)
                }
            }
            return function (e) {
                n.setTimeout(e, 0)
            }
        };

        function jd(a, c) {
            kd || ld();
            md || (kd(), md = !0);
            fd.add(a, c)
        }

        var kd;

        function ld() {
            if (n.Promise && n.Promise.resolve) {
                var a = n.Promise.resolve(void 0);
                kd = function () {
                    a.then(nd)
                }
            } else kd = function () {
                var c = nd;
                !ya(n.setImmediate) || n.Window && n.Window.prototype && !nb("Edge") && n.Window.prototype.setImmediate == n.setImmediate ? (hd || (hd = id()), hd(c)) : n.setImmediate(c)
            }
        }

        var md = !1, fd = new bd;

        function nd() {
            for (var a; a = ed();) {
                try {
                    a.a.call(a.b)
                } catch (c) {
                    gd(c)
                }
                ad(dd, a)
            }
            md = !1
        };

        function G(a) {
            this.a = od;
            this.s = void 0;
            this.f = this.b = this.c = null;
            this.h = this.j = !1;
            if (a != ua) try {
                var c = this;
                a.call(void 0, function (b) {
                    rd(c, sd, b)
                }, function (b) {
                    rd(c, td, b)
                })
            } catch (b) {
                rd(this, td, b)
            }
        }

        var od = 0, sd = 2, td = 3;

        function ud() {
            this.next = this.c = this.b = this.f = this.a = null;
            this.h = !1
        }

        ud.prototype.reset = function () {
            this.c = this.b = this.f = this.a = null;
            this.h = !1
        };
        var vd = new $c(function () {
            return new ud
        }, function (a) {
            a.reset()
        });

        function wd(a, c, b) {
            var d = vd.get();
            d.f = a;
            d.b = c;
            d.c = b;
            return d
        }

        function xd() {
            var a = new G(ua);
            rd(a, sd, void 0);
            return a
        }

        G.prototype.then = function (a, c, b) {
            return yd(this, ya(a) ? a : null, ya(c) ? c : null, b)
        };
        G.prototype.$goog_Thenable = !0;
        G.prototype.cancel = function (a) {
            if (this.a == od) {
                var c = new zd(a);
                jd(function () {
                    Ad(this, c)
                }, this)
            }
        };

        function Ad(a, c) {
            if (a.a == od) if (a.c) {
                var b = a.c;
                if (b.b) {
                    for (var d = 0, e = null, f = null, g = b.b; g && (g.h || (d++, g.a == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                    e && (b.a == od && 1 == d ? Ad(b, c) : (f ? (d = f, d.next == b.f && (b.f = d), d.next = d.next.next) : Bd(b), Cd(b, e, td, c)))
                }
                a.c = null
            } else rd(a, td, c)
        }

        function Dd(a, c) {
            a.b || a.a != sd && a.a != td || Ed(a);
            a.f ? a.f.next = c : a.b = c;
            a.f = c
        }

        function yd(a, c, b, d) {
            var e = wd(null, null, null);
            e.a = new G(function (f, g) {
                e.f = c ? function (h) {
                    try {
                        var k = c.call(d, h);
                        f(k)
                    } catch (m) {
                        g(m)
                    }
                } : f;
                e.b = b ? function (h) {
                    try {
                        var k = b.call(d, h);
                        void 0 === k && h instanceof zd ? g(h) : f(k)
                    } catch (m) {
                        g(m)
                    }
                } : g
            });
            e.a.c = a;
            Dd(a, e);
            return e.a
        }

        G.prototype.v = function (a) {
            this.a = od;
            rd(this, sd, a)
        };
        G.prototype.B = function (a) {
            this.a = od;
            rd(this, td, a)
        };

        function rd(a, c, b) {
            if (a.a == od) {
                a === b && (c = td, b = new TypeError("Promise cannot resolve to itself"));
                a.a = 1;
                a:{
                    var d = b, e = a.v, f = a.B;
                    if (d instanceof G) {
                        Dd(d, wd(e || ua, f || null, a));
                        var g = !0
                    } else if (Zc(d)) d.then(e, f, a), g = !0; else {
                        if (q(d)) try {
                            var h = d.then;
                            if (ya(h)) {
                                Fd(d, h, e, f, a);
                                g = !0;
                                break a
                            }
                        } catch (k) {
                            f.call(a, k);
                            g = !0;
                            break a
                        }
                        g = !1
                    }
                }
                g || (a.s = b, a.a = c, a.c = null, Ed(a), c != td || b instanceof zd || Gd(a, b))
            }
        }

        function Fd(a, c, b, d, e) {
            function f(k) {
                h || (h = !0, d.call(e, k))
            }

            function g(k) {
                h || (h = !0, b.call(e, k))
            }

            var h = !1;
            try {
                c.call(a, g, f)
            } catch (k) {
                f(k)
            }
        }

        function Ed(a) {
            a.j || (a.j = !0, jd(a.u, a))
        }

        function Bd(a) {
            var c = null;
            a.b && (c = a.b, a.b = c.next, c.next = null);
            a.b || (a.f = null);
            return c
        }

        G.prototype.u = function () {
            for (var a; a = Bd(this);) Cd(this, a, this.a, this.s);
            this.j = !1
        };

        function Cd(a, c, b, d) {
            if (b == td && c.b && !c.h) for (; a && a.h; a = a.c) a.h = !1;
            if (c.a) c.a.c = null, Hd(c, b, d); else try {
                c.h ? c.f.call(c.c) : Hd(c, b, d)
            } catch (e) {
                Id.call(null, e)
            }
            ad(vd, c)
        }

        function Hd(a, c, b) {
            c == sd ? a.f.call(a.c, b) : a.b && a.b.call(a.c, b)
        }

        function Gd(a, c) {
            a.h = !0;
            jd(function () {
                a.h && Id.call(null, c)
            })
        }

        var Id = gd;

        function zd(a) {
            La.call(this, a)
        }

        t(zd, La);
        zd.prototype.name = "cancel";/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
        function H(a, c) {
            this.h = [];
            this.G = a;
            this.C = c || null;
            this.f = this.a = !1;
            this.c = void 0;
            this.v = this.I = this.s = !1;
            this.j = 0;
            this.b = null;
            this.u = 0
        }

        H.prototype.cancel = function (a) {
            if (this.a) this.c instanceof H && this.c.cancel(); else {
                if (this.b) {
                    var c = this.b;
                    delete this.b;
                    a ? c.cancel(a) : (c.u--, 0 >= c.u && c.cancel())
                }
                this.G ? this.G.call(this.C, this) : this.v = !0;
                this.a || I(this, new Jd(this))
            }
        };
        H.prototype.B = function (a, c) {
            this.s = !1;
            Kd(this, a, c)
        };

        function Kd(a, c, b) {
            a.a = !0;
            a.c = b;
            a.f = !c;
            Ld(a)
        }

        function Md(a) {
            if (a.a) {
                if (!a.v) throw new Nd(a);
                a.v = !1
            }
        }

        function Od(a, c) {
            Md(a);
            Kd(a, !0, c)
        }

        function I(a, c) {
            Md(a);
            Kd(a, !1, c)
        }

        function Pd(a, c) {
            Qd(a, c, null, void 0)
        }

        function Rd(a, c) {
            Qd(a, null, c, void 0)
        }

        function Sd(a, c) {
            Qd(a, c, c, void 0)
        }

        function Qd(a, c, b, d) {
            a.h.push([c, b, d]);
            a.a && Ld(a)
        }

        H.prototype.then = function (a, c, b) {
            var d, e, f = new G(function (g, h) {
                d = g;
                e = h
            });
            Qd(this, d, function (g) {
                g instanceof Jd ? f.cancel() : e(g)
            });
            return f.then(a, c, b)
        };
        H.prototype.$goog_Thenable = !0;

        function Td(a) {
            return Pa(a.h, function (c) {
                return ya(c[1])
            })
        }

        function Ld(a) {
            if (a.j && a.a && Td(a)) {
                var c = a.j, b = Ud[c];
                b && (n.clearTimeout(b.o), delete Ud[c]);
                a.j = 0
            }
            a.b && (a.b.u--, delete a.b);
            c = a.c;
            for (var d = b = !1; a.h.length && !a.s;) {
                var e = a.h.shift(), f = e[0], g = e[1];
                e = e[2];
                if (f = a.f ? g : f) try {
                    var h = f.call(e || a.C, c);
                    void 0 !== h && (a.f = a.f && (h == c || h instanceof Error), a.c = c = h);
                    if (Zc(c) || "function" === typeof n.Promise && c instanceof n.Promise) d = !0, a.s = !0
                } catch (k) {
                    c = k, a.f = !0, Td(a) || (b = !0)
                }
            }
            a.c = c;
            d && (h = Da(a.B, a, !0), d = Da(a.B, a, !1), c instanceof H ? (Qd(c, h, d), c.I = !0) : c.then(h, d));
            b &&
            (c = new Vd(c), Ud[c.o] = c, a.j = c.o)
        }

        function Nd() {
            La.call(this)
        }

        t(Nd, La);
        Nd.prototype.message = "Deferred has already fired";
        Nd.prototype.name = "AlreadyCalledError";

        function Jd() {
            La.call(this)
        }

        t(Jd, La);
        Jd.prototype.message = "Deferred was canceled";
        Jd.prototype.name = "CanceledError";

        function Vd(a) {
            this.o = n.setTimeout(Da(this.b, this), 0);
            this.a = a
        }

        Vd.prototype.b = function () {
            delete Ud[this.o];
            throw this.a;
        };
        var Ud = {};

        function Wd(a, c) {
            var b = c || {}, d = b.document || document, e = bb(a).toString(), f = Tc(document, "SCRIPT"),
                g = {M: f, H: void 0}, h = new H(Xd, g), k = null, m = null != b.timeout ? b.timeout : 5E3;
            0 < m && (k = window.setTimeout(function () {
                Yd(f, !0);
                I(h, new Zd($d, "Timeout reached for loading script " + e))
            }, m), g.H = k);
            f.onload = f.onreadystatechange = function () {
                f.readyState && "loaded" != f.readyState && "complete" != f.readyState || (Yd(f, b.U || !1, k), Od(h, null))
            };
            f.onerror = function () {
                Yd(f, !0, k);
                I(h, new Zd(ae, "Error while loading script " + e))
            };
            g = b.attributes ||
                {};
            Wa(g, {type: "text/javascript", charset: "UTF-8"});
            Qc(f, g);
            ob(f, a);
            be(d).appendChild(f);
            return h
        }

        function be(a) {
            var c;
            return (c = (a || document).getElementsByTagName("HEAD")) && 0 != c.length ? c[0] : a.documentElement
        }

        function Xd() {
            if (this && this.M) {
                var a = this.M;
                a && "SCRIPT" == a.tagName && Yd(a, !0, this.H)
            }
        }

        function Yd(a, c, b) {
            null != b && n.clearTimeout(b);
            a.onload = ua;
            a.onerror = ua;
            a.onreadystatechange = ua;
            c && window.setTimeout(function () {
                a && a.parentNode && a.parentNode.removeChild(a)
            }, 0)
        }

        var ae = 0, $d = 1;

        function Zd(a, c) {
            var b = "Jsloader error (code #" + a + ")";
            c && (b += ": " + c);
            La.call(this, b);
            this.code = a
        }

        t(Zd, La);

        function ce() {
            this.H = 1E4
        }

        var de = 0;

        function ee(a, c, b, d, e) {
            b = "_" + b;
            n._jsapi_callbacks_ || (n._jsapi_callbacks_ = {});
            d && (n._jsapi_callbacks_[b] = fe(b, d));
            if (void 0 === Xa) {
                d = null;
                var f = n.trustedTypes;
                if (f && f.createPolicy) {
                    try {
                        d = f.createPolicy("goog#html", {createHTML: Ga, createScript: Ga, createScriptURL: Ga})
                    } catch (g) {
                        n.console && n.console.error(g.message)
                    }
                    Xa = d
                } else Xa = d
            }
            c = (d = Xa) ? d.createScriptURL(c) : c;
            a = Wd(new Ya(Za, c), {timeout: a.H, U: !0});
            Rd(a, ge(b, e))
        }

        ce.prototype.cancel = function (a) {
            a && (a.V && a.V.cancel(), a.o && he(a.o, !1))
        };

        function fe(a, c) {
            return function (b) {
                he(a, !0);
                c.apply(void 0, arguments)
            }
        }

        function ge(a, c) {
            return function () {
                he(a, !1);
                c && c()
            }
        }

        function he(a, c) {
            n._jsapi_callbacks_[a] && (c ? delete n._jsapi_callbacks_[a] : n._jsapi_callbacks_[a] = function () {
            })
        };var ie = {}, je = null;

        function ke(a) {
            var c = 4;
            void 0 === c && (c = 0);
            le();
            c = ie[c];
            for (var b = [], d = 0; d < a.length; d += 3) {
                var e = a[d], f = d + 1 < a.length, g = f ? a[d + 1] : 0, h = d + 2 < a.length, k = h ? a[d + 2] : 0,
                    m = e >> 2;
                e = (e & 3) << 4 | g >> 4;
                g = (g & 15) << 2 | k >> 6;
                k &= 63;
                h || (k = 64, f || (g = 64));
                b.push(c[m], c[e], c[g] || "", c[k] || "")
            }
            return b.join("")
        }

        function me(a) {
            var c = [];
            ne(a, function (b) {
                c.push(b)
            });
            return c
        }

        function oe(a) {
            var c = a.length, b = 3 * c / 4;
            b % 3 ? b = Math.floor(b) : -1 != "=.".indexOf(a[c - 1]) && (b = -1 != "=.".indexOf(a[c - 2]) ? b - 2 : b - 1);
            var d = new Uint8Array(b), e = 0;
            ne(a, function (f) {
                d[e++] = f
            });
            return d.subarray(0, e)
        }

        function ne(a, c) {
            function b(k) {
                for (; d < a.length;) {
                    var m = a.charAt(d++), p = je[m];
                    if (null != p) return p;
                    if (!/^[\s\xa0]*$/.test(m)) throw Error("Unknown base64 encoding at char: " + m);
                }
                return k
            }

            le();
            for (var d = 0; ;) {
                var e = b(-1), f = b(0), g = b(64), h = b(64);
                if (64 === h && -1 === e) break;
                c(e << 2 | f >> 4);
                64 != g && (c(f << 4 & 240 | g >> 2), 64 != h && c(g << 6 & 192 | h))
            }
        }

        function le() {
            if (!je) {
                je = {};
                for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), c = ["+/=", "+/", "-_=", "-_.", "-_"], b = 0; 5 > b; b++) {
                    var d = a.concat(c[b].split(""));
                    ie[b] = d;
                    for (var e = 0; e < d.length; e++) {
                        var f = d[e];
                        void 0 === je[f] && (je[f] = e)
                    }
                }
            }
        };

        function pe(a) {
            return a.constructor === Uint8Array ? a : a.constructor === ArrayBuffer ? new Uint8Array(a) : "undefined" != typeof Buffer && a.constructor === Buffer ? new Uint8Array(a) : a.constructor === Array ? new Uint8Array(a) : a.constructor === String ? oe(a) : new Uint8Array(0)
        };

        function qe(a) {
            this.f = null;
            this.a = this.c = this.h = 0;
            a && re(this, a)
        }

        var se = [];

        function re(a, c) {
            a.f = pe(c);
            a.h = 0;
            a.c = a.f.length;
            a.a = a.h
        }

        qe.prototype.reset = function () {
            this.a = this.h
        };
        qe.prototype.b = function () {
            var a = this.f;
            var c = a[this.a];
            var b = c & 127;
            if (128 > c) return this.a += 1, b;
            c = a[this.a + 1];
            b |= (c & 127) << 7;
            if (128 > c) return this.a += 2, b;
            c = a[this.a + 2];
            b |= (c & 127) << 14;
            if (128 > c) return this.a += 3, b;
            c = a[this.a + 3];
            b |= (c & 127) << 21;
            if (128 > c) return this.a += 4, b;
            c = a[this.a + 4];
            b |= (c & 15) << 28;
            if (128 > c) return this.a += 5, b >>> 0;
            this.a += 5;
            128 <= a[this.a++] && 128 <= a[this.a++] && 128 <= a[this.a++] && 128 <= a[this.a++] && this.a++;
            return b
        };
        qe.prototype.j = qe.prototype.b;

        function te(a) {
            if (se.length) {
                var c = se.pop();
                a && re(c, a);
                a = c
            } else a = new qe(a);
            this.a = a;
            this.b = this.c = -1;
            this.f = !1
        }

        te.prototype.reset = function () {
            this.a.reset();
            this.b = this.c = -1
        };

        function ue(a) {
            var c = a.a;
            (c = c.a == c.c) || (c = a.f) || (c = a.a, c = 0 > c.a || c.a > c.c);
            if (c) return !1;
            c = a.a.b();
            var b = c & 7;
            if (0 != b && 5 != b && 1 != b && 2 != b && 3 != b && 4 != b) return a.f = !0, !1;
            a.c = c >>> 3;
            a.b = b;
            return !0
        }

        function ve(a) {
            switch (a.b) {
                case 0:
                    if (0 != a.b) ve(a); else {
                        for (a = a.a; a.f[a.a] & 128;) a.a++;
                        a.a++
                    }
                    break;
                case 1:
                    1 != a.b ? ve(a) : (a = a.a, a.a += 8);
                    break;
                case 2:
                    if (2 != a.b) ve(a); else {
                        var c = a.a.b();
                        a = a.a;
                        a.a += c
                    }
                    break;
                case 5:
                    5 != a.b ? ve(a) : (a = a.a, a.a += 4);
                    break;
                case 3:
                    c = a.c;
                    do {
                        if (!ue(a)) {
                            a.f = !0;
                            break
                        }
                        if (4 == a.b) {
                            a.c != c && (a.f = !0);
                            break
                        }
                        ve(a)
                    } while (1)
            }
        }

        function we(a, c, b) {
            var d = a.a.c, e = a.a.b();
            e = a.a.a + e;
            a.a.c = e;
            b(c, a);
            a.a.a = e;
            a.a.c = d
        }

        function xe(a) {
            return a.a.b()
        }

        function ye(a) {
            var c = a.a.b();
            a = a.a;
            var b = a.f, d = a.a, e = d + c, f = [];
            for (c = ""; d < e;) {
                var g = b[d++];
                if (128 > g) f.push(g); else if (192 > g) continue; else if (224 > g) {
                    var h = b[d++];
                    f.push((g & 31) << 6 | h & 63)
                } else if (240 > g) {
                    h = b[d++];
                    var k = b[d++];
                    f.push((g & 15) << 12 | (h & 63) << 6 | k & 63)
                } else if (248 > g) {
                    h = b[d++];
                    k = b[d++];
                    var m = b[d++];
                    g = (g & 7) << 18 | (h & 63) << 12 | (k & 63) << 6 | m & 63;
                    g -= 65536;
                    f.push((g >> 10 & 1023) + 55296, (g & 1023) + 56320)
                }
                8192 <= f.length && (c += String.fromCharCode.apply(null, f), f.length = 0)
            }
            if (8192 >= f.length) f = String.fromCharCode.apply(null,
                f); else {
                b = "";
                for (e = 0; e < f.length; e += 8192) b += String.fromCharCode.apply(null, Ta(f, e, e + 8192));
                f = b
            }
            a.a = d;
            return c + f
        };

        function ze() {
            this.a = []
        }

        ze.prototype.length = function () {
            return this.a.length
        };

        function Ae(a) {
            var c = a.a;
            a.a = [];
            return c
        }

        function Be(a, c) {
            for (; 127 < c;) a.a.push(c & 127 | 128), c >>>= 7;
            a.a.push(c)
        }

        function Ce(a, c) {
            if (0 <= c) Be(a, c); else {
                for (var b = 0; 9 > b; b++) a.a.push(c & 127 | 128), c >>= 7;
                a.a.push(1)
            }
        };

        function De() {
            this.c = [];
            this.b = 0;
            this.a = new ze
        }

        function Ee(a, c) {
            Be(a.a, 8 * c + 2);
            var b = Ae(a.a);
            a.c.push(b);
            a.b += b.length;
            b.push(a.b);
            return b
        }

        function Fe(a, c) {
            var b = c.pop();
            for (b = a.b + a.a.length() - b; 127 < b;) c.push(b & 127 | 128), b >>>= 7, a.b++;
            c.push(b);
            a.b++
        }

        De.prototype.reset = function () {
            this.c = [];
            Ae(this.a);
            this.b = 0
        };

        function Ge(a) {
            for (var c = new Uint8Array(a.b + a.a.length()), b = a.c, d = b.length, e = 0, f = 0; f < d; f++) {
                var g = b[f];
                c.set(g, e);
                e += g.length
            }
            b = Ae(a.a);
            c.set(b, e);
            a.c = [c];
            return c
        }

        function K(a, c, b) {
            null != b && null != b && (Be(a.a, 8 * c), Ce(a.a, b))
        }

        function L(a, c, b) {
            null != b && null != b && (Be(a.a, 8 * c), Be(a.a, b))
        }

        function He(a, c, b) {
            null != b && (Be(a.a, 8 * c), a.a.a.push(b ? 1 : 0))
        }

        function Ie(a, c, b) {
            null != b && (Be(a.a, 8 * c), Ce(a.a, b))
        }

        function Je(a, c, b) {
            if (null != b) {
                c = Ee(a, c);
                for (var d = a.a, e = 0; e < b.length; e++) {
                    var f = b.charCodeAt(e);
                    if (128 > f) d.a.push(f); else if (2048 > f) d.a.push(f >> 6 | 192), d.a.push(f & 63 | 128); else if (65536 > f) if (55296 <= f && 56319 >= f && e + 1 < b.length) {
                        var g = b.charCodeAt(e + 1);
                        56320 <= g && 57343 >= g && (f = 1024 * (f - 55296) + g - 56320 + 65536, d.a.push(f >> 18 | 240), d.a.push(f >> 12 & 63 | 128), d.a.push(f >> 6 & 63 | 128), d.a.push(f & 63 | 128), e++)
                    } else d.a.push(f >> 12 | 224), d.a.push(f >> 6 & 63 | 128), d.a.push(f & 63 | 128)
                }
                Fe(a, c)
            }
        }

        function Ke(a, c, b) {
            null != b && (b = pe(b), Be(a.a, 8 * c + 2), Be(a.a, b.length), c = Ae(a.a), a.c.push(c), a.c.push(b), a.b += c.length + b.length)
        }

        function Le(a, c, b, d) {
            null != b && (c = Ee(a, c), d(b, a), Fe(a, c))
        }

        function Me(a, c, b, d) {
            if (null != b) for (var e = 0; e < b.length; e++) {
                var f = Ee(a, c);
                d(b[e], a);
                Fe(a, f)
            }
        };

        function M() {
        }

        var Ne = "function" == typeof Uint8Array;

        function N(a, c, b) {
            a.a = null;
            c || (c = []);
            a.j = void 0;
            a.c = -1;
            a.m = c;
            a:{
                if (c = a.m.length) {
                    --c;
                    var d = a.m[c];
                    if (!(null === d || "object" != typeof d || Array.isArray(d) || Ne && d instanceof Uint8Array)) {
                        a.f = c - a.c;
                        a.b = d;
                        break a
                    }
                }
                a.f = Number.MAX_VALUE
            }
            a.h = {};
            if (b) for (c = 0; c < b.length; c++) d = b[c], d < a.f ? (d += a.c, a.m[d] = a.m[d] || Oe) : (Pe(a), a.b[d] = a.b[d] || Oe)
        }

        var Oe = [];

        function Pe(a) {
            var c = a.f + a.c;
            a.m[c] || (a.b = a.m[c] = {})
        }

        function O(a, c) {
            if (c < a.f) {
                var b = c + a.c, d = a.m[b];
                return d === Oe ? a.m[b] = [] : d
            }
            if (a.b) return d = a.b[c], d === Oe ? a.b[c] = [] : d
        }

        function Qe(a) {
            return null == a || a instanceof Uint8Array ? a : "string" === typeof a ? oe(a) : null
        }

        function P(a, c, b) {
            a = O(a, c);
            return null == a ? b : a
        }

        function Re(a, c) {
            var b = O(a, c);
            b = null == b ? b : !!b;
            return null == b ? !1 : b
        }

        function Se(a, c, b) {
            c < a.f ? a.m[c + a.c] = b : (Pe(a), a.b[c] = b)
        }

        function Q(a, c, b) {
            R(a, c, b, 0)
        }

        function S(a, c, b) {
            R(a, c, b, "")
        }

        function R(a, c, b, d) {
            b !== d ? Se(a, c, b) : c < a.f ? a.m[c + a.c] = null : (Pe(a), delete a.b[c])
        }

        function Te(a, c, b) {
            a.a || (a.a = {});
            if (!a.a[b]) {
                var d = O(a, b);
                d && (a.a[b] = new c(d))
            }
            return a.a[b]
        }

        function Ue(a, c, b) {
            Ve(a, c, b);
            c = a.a[b];
            c == Oe && (c = a.a[b] = []);
            return c
        }

        function Ve(a, c, b) {
            a.a || (a.a = {});
            if (!a.a[b]) {
                for (var d = O(a, b), e = [], f = 0; f < d.length; f++) e[f] = new c(d[f]);
                a.a[b] = e
            }
        }

        function We(a, c, b) {
            a.a || (a.a = {});
            var d = b ? b.m : b;
            a.a[c] = b;
            Se(a, c, d)
        }

        function Xe(a, c) {
            a.a || (a.a = {});
            c = c || [];
            for (var b = [], d = 0; d < c.length; d++) b[d] = c[d].m;
            a.a[2] = c;
            Se(a, 2, b)
        }

        M.prototype.toString = function () {
            return this.m.toString()
        };

        function Ye(a) {
            N(this, a, null)
        }

        t(Ye, M);

        function Ze(a) {
            N(this, a, $e)
        }

        t(Ze, M);

        function af(a) {
            N(this, a, null)
        }

        t(af, M);

        function kf(a) {
            N(this, a, null)
        }

        t(kf, M);

        function lf(a) {
            N(this, a, null)
        }

        t(lf, M);

        function mf(a) {
            N(this, a, null)
        }

        t(mf, M);

        function nf(a) {
            N(this, a, null)
        }

        t(nf, M);

        function of(a) {
            N(this, a, null)
        }

        t(of, M);

        function pf(a) {
            N(this, a, qf)
        }

        t(pf, M);

        function rf(a) {
            N(this, a, null)
        }

        t(rf, M);

        function sf(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && L(c, 2, b);
            b = P(a, 3, 0);
            0 !== b && K(c, 3, b);
            b = P(a, 4, 0);
            0 !== b && K(c, 4, b);
            b = P(a, 5, 0);
            0 !== b && L(c, 5, b);
            b = P(a, 6, 0);
            0 !== b && L(c, 6, b);
            b = P(a, 7, 0);
            0 !== b && L(c, 7, b);
            return Ge(c)
        }

        var $e = [22];

        function tf(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && L(c, 2, b);
            b = P(a, 3, 0);
            0 !== b && K(c, 3, b);
            b = P(a, 4, 0);
            0 !== b && Ie(c, 4, b);
            b = P(a, 5, 0);
            0 !== b && Ie(c, 5, b);
            b = P(a, 6, 0);
            0 !== b && L(c, 6, b);
            b = P(a, 7, 0);
            0 !== b && L(c, 7, b);
            b = P(a, 8, 0);
            0 !== b && L(c, 8, b);
            b = P(a, 9, 0);
            0 !== b && L(c, 9, b);
            b = P(a, 10, 0);
            0 !== b && L(c, 10, b);
            b = P(a, 11, 0);
            0 !== b && L(c, 11, b);
            b = Qe(P(a, 12, ""));
            0 < b.length && Ke(c, 12, b);
            b = P(a, 13, 0);
            0 !== b && K(c, 13, b);
            b = Qe(P(a, 14, ""));
            0 < b.length && Ke(c, 14, b);
            b = P(a, 15, 0);
            0 !== b && K(c, 15, b);
            b = Qe(P(a, 16, ""));
            0 < b.length &&
            Ke(c, 16, b);
            b = O(a, 22);
            if (0 < b.length && null != b && b.length) {
                for (var d = Ee(c, 22), e = 0; e < b.length; e++) Ce(c.a, b[e]);
                Fe(c, d)
            }
            b = P(a, 17, 0);
            0 !== b && K(c, 17, b);
            b = P(a, 18, 0);
            0 !== b && K(c, 18, b);
            b = P(a, 19, 0);
            0 !== b && K(c, 19, b);
            b = P(a, 20, 0);
            0 !== b && K(c, 20, b);
            b = P(a, 21, 0);
            0 !== b && K(c, 21, b);
            b = P(a, 23, 0);
            0 !== b && K(c, 23, b);
            return Ge(c)
        }

        function uf(a, c) {
            R(a, 12, c, "")
        }

        function vf(a, c) {
            R(a, 14, c, "")
        }

        function wf(a, c) {
            R(a, 16, c, "")
        }

        function xf(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && K(c, 2, b);
            return Ge(c)
        }

        function yf(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && K(c, 2, b);
            return Ge(c)
        }

        function zf(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && L(c, 2, b);
            b = P(a, 3, 0);
            0 !== b && K(c, 3, b);
            b = P(a, 4, 0);
            0 !== b && K(c, 4, b);
            b = P(a, 5, 0);
            0 !== b && L(c, 5, b);
            b = P(a, 6, 0);
            0 !== b && L(c, 6, b);
            b = P(a, 7, 0);
            0 !== b && L(c, 7, b);
            b = P(a, 8, 0);
            0 !== b && K(c, 8, b);
            return Ge(c)
        }

        function Af(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && L(c, 2, b);
            b = P(a, 3, 0);
            0 !== b && K(c, 3, b);
            b = P(a, 4, 0);
            0 !== b && K(c, 4, b);
            b = P(a, 5, 0);
            0 !== b && K(c, 5, b);
            b = P(a, 6, 0);
            0 !== b && K(c, 6, b);
            b = P(a, 7, 0);
            0 !== b && K(c, 7, b);
            b = P(a, 8, 0);
            0 !== b && L(c, 8, b);
            b = P(a, 9, 0);
            0 !== b && L(c, 9, b);
            b = Qe(P(a, 10, ""));
            0 < b.length && Ke(c, 10, b);
            return Ge(c)
        }

        function Bf(a, c) {
            R(a, 10, c, "")
        }

        function Cf(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && K(c, 2, b);
            b = P(a, 3, 0);
            0 !== b && K(c, 3, b);
            b = P(a, 4, 0);
            0 !== b && Ie(c, 4, b);
            b = P(a, 5, 0);
            0 !== b && L(c, 5, b);
            return Ge(c)
        }

        function Df(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && K(c, 2, b);
            b = P(a, 3, 0);
            0 !== b && K(c, 3, b);
            return Ge(c)
        }

        var qf = [2];

        function Ef(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = Ue(a, rf, 2);
            0 < b.length && Me(c, 2, b, Ff);
            return Ge(c)
        }

        function Ff(a, c) {
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && K(c, 2, b);
            b = P(a, 3, 0);
            0 !== b && K(c, 3, b);
            b = P(a, 4, 0);
            0 !== b && L(c, 4, b);
            b = P(a, 5, 0);
            0 !== b && K(c, 5, b);
            b = P(a, 6, "");
            0 < b.length && Je(c, 6, b);
            (b = Re(a, 7)) && He(c, 7, b);
            b = P(a, 8, "");
            0 < b.length && Je(c, 8, b)
        };

        function T(a) {
            return y(a) && -2147483648 <= a && 2147483648 > a ? a : 0
        }

        function V(a) {
            return y(a) && 0 <= a && 4294967296 > a ? a : 0
        }

        function Gf(a) {
            return Ja(a) ? a : !1
        }

        function Hf(a) {
            return u(a) ? a : ""
        };

        function If(a, c) {
            this.a = a;
            this.b = c
        }

        function Jf() {
            var a = new Uint8Array(16), c = window.crypto;
            if (null != c) c.getRandomValues(a); else for (c = 0; 16 > c; c++) a[c] = 255 * Math.random() >>> 0 & 255;
            a[6] &= 15;
            a[6] |= 64;
            a[8] &= 63;
            a[8] |= 128;
            c = Kf(a, 0);
            a = Kf(a, 8);
            return new If(c, a)
        }

        If.prototype.version = function () {
            return Qb(this.a, 12).and(C(15)).g
        };
        If.prototype.toString = function () {
            return Lf(Qb(this.a, 32), 8) + "-" + Lf(Qb(this.a, 16), 4) + "-" + Lf(this.a, 4) + "-" + Lf(Qb(this.b, 48), 4) + "-" + Lf(this.b, 12)
        };

        function Lf(a, c) {
            var b = F(Ob, 4 * c);
            return b.or(a.and(b.add(Fb(Ob)))).toString(16).substring(1)
        }

        function Kf(a, c) {
            for (var b = Rb, d = c, e = c + 8; d < e; d++) b = F(b, 8).or(C(a[d] & 255));
            return b
        };

        function Mf(a) {
            N(this, a, Nf)
        }

        t(Mf, M);

        function Of(a) {
            N(this, a, null)
        }

        t(Of, M);

        function Pf(a) {
            N(this, a, null)
        }

        t(Pf, M);

        function Qf(a) {
            N(this, a, null)
        }

        t(Qf, M);

        function Rf(a) {
            N(this, a, null)
        }

        t(Rf, M);

        function Sf(a) {
            N(this, a, null)
        }

        t(Sf, M);

        function Tf(a) {
            N(this, a, null)
        }

        t(Tf, M);

        function Uf(a) {
            N(this, a, null)
        }

        t(Uf, M);
        var Nf = [7, 8];

        function Vf(a) {
            a = new te(a);
            for (var c = new Mf; ue(a) && 4 != a.b;) switch (a.c) {
                case 1:
                    var b = a.a.j();
                    Q(c, 1, b);
                    break;
                case 2:
                    b = ye(a);
                    Wf(c, b);
                    break;
                case 3:
                    b = new Of;
                    we(a, b, Xf);
                    Yf(c, b);
                    break;
                case 4:
                    b = new Pf;
                    we(a, b, Zf);
                    $f(c, b);
                    break;
                case 5:
                    b = new Qf;
                    we(a, b, ag);
                    bg(c, b);
                    break;
                case 6:
                    b = new Rf;
                    we(a, b, cg);
                    dg(c, b);
                    break;
                case 7:
                    b = a;
                    var d = a.a.b, e = b.a.b();
                    e = b.a.a + e;
                    for (var f = []; b.a.a < e;) f.push(d.call(b.a));
                    b = f;
                    Se(c, 7, b || []);
                    break;
                case 8:
                    b = new Sf;
                    we(a, b, eg);
                    fg(c, b);
                    break;
                case 9:
                    b = new Tf;
                    we(a, b, gg);
                    hg(c, b);
                    break;
                case 10:
                    b =
                        xe(a);
                    ig(c, b);
                    break;
                case 11:
                    b = xe(a);
                    jg(c, b);
                    break;
                case 12:
                    b = xe(a);
                    kg(c, b);
                    break;
                case 13:
                    b = ye(a);
                    lg(c, b);
                    break;
                default:
                    ve(a)
            }
            return c
        }

        function mg(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, "");
            0 < b.length && Je(c, 2, b);
            b = W(a);
            null != b && Le(c, 3, b, ng);
            b = X(a);
            null != b && Le(c, 4, b, og);
            b = pg(a);
            null != b && Le(c, 5, b, qg);
            b = Y(a);
            null != b && Le(c, 6, b, rg);
            b = O(a, 7);
            if (0 < b.length && null != b && b.length) {
                for (var d = Ee(c, 7), e = 0; e < b.length; e++) Be(c.a, b[e]);
                Fe(c, d)
            }
            b = Ue(a, Sf, 8);
            0 < b.length && Me(c, 8, b, sg);
            b = tg(a);
            null != b && Le(c, 9, b, ug);
            b = P(a, 10, 0);
            0 !== b && L(c, 10, b);
            b = P(a, 11, 0);
            0 !== b && L(c, 11, b);
            b = P(a, 12, 0);
            0 !== b && L(c, 12, b);
            b = P(a, 13, "");
            0 < b.length && Je(c, 13, b);
            return Ge(c)
        }

        function Xf(a, c) {
            for (; ue(c) && 4 != c.b;) switch (c.c) {
                case 1:
                    var b = ye(c);
                    vg(a, b);
                    break;
                case 2:
                    b = xe(c);
                    wg(a, b);
                    break;
                case 3:
                    b = ye(c);
                    xg(a, b);
                    break;
                case 4:
                    b = ye(c);
                    yg(a, b);
                    break;
                case 5:
                    b = ye(c);
                    zg(a, b);
                    break;
                case 6:
                    b = !!c.a.b();
                    Ag(a, b);
                    break;
                default:
                    ve(c)
            }
            return a
        }

        function ng(a, c) {
            var b = P(a, 1, "");
            0 < b.length && Je(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && L(c, 2, b);
            b = P(a, 3, "");
            0 < b.length && Je(c, 3, b);
            b = P(a, 4, "");
            0 < b.length && Je(c, 4, b);
            b = P(a, 5, "");
            0 < b.length && Je(c, 5, b);
            (b = Re(a, 6)) && He(c, 6, b)
        }

        function vg(a, c) {
            S(a, 1, c)
        }

        function wg(a, c) {
            Q(a, 2, c)
        }

        function xg(a, c) {
            S(a, 3, c)
        }

        function yg(a, c) {
            S(a, 4, c)
        }

        function zg(a, c) {
            S(a, 5, c)
        }

        function Ag(a, c) {
            R(a, 6, c, !1)
        }

        function Zf(a, c) {
            for (; ue(c) && 4 != c.b;) switch (c.c) {
                case 1:
                    var b = xe(c);
                    Bg(a, b);
                    break;
                case 2:
                    b = xe(c);
                    Cg(a, b);
                    break;
                case 3:
                    b = ye(c);
                    Dg(a, b);
                    break;
                default:
                    ve(c)
            }
            return a
        }

        function og(a, c) {
            var b = P(a, 1, 0);
            0 !== b && L(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && L(c, 2, b);
            b = P(a, 3, "");
            0 < b.length && Je(c, 3, b)
        }

        function Bg(a, c) {
            Q(a, 1, c)
        }

        function Cg(a, c) {
            Q(a, 2, c)
        }

        function Dg(a, c) {
            S(a, 3, c)
        }

        function ag(a, c) {
            for (; ue(c) && 4 != c.b;) switch (c.c) {
                case 1:
                    var b = xe(c);
                    Eg(a, b);
                    break;
                case 2:
                    b = ye(c);
                    Fg(a, b);
                    break;
                case 3:
                    b = ye(c);
                    Gg(a, b);
                    break;
                default:
                    ve(c)
            }
            return a
        }

        function qg(a, c) {
            var b = P(a, 1, 0);
            0 !== b && L(c, 1, b);
            b = P(a, 2, "");
            0 < b.length && Je(c, 2, b);
            b = P(a, 3, "");
            0 < b.length && Je(c, 3, b)
        }

        function Eg(a, c) {
            Q(a, 1, c)
        }

        function Fg(a, c) {
            S(a, 2, c)
        }

        function Gg(a, c) {
            S(a, 3, c)
        }

        function cg(a, c) {
            for (; ue(c) && 4 != c.b;) switch (c.c) {
                case 1:
                    var b = ye(c);
                    Hg(a, b);
                    break;
                case 2:
                    b = ye(c);
                    Ig(a, b);
                    break;
                case 3:
                    b = ye(c);
                    Jg(a, b);
                    break;
                default:
                    ve(c)
            }
            return a
        }

        function rg(a, c) {
            var b = P(a, 1, "");
            0 < b.length && Je(c, 1, b);
            b = P(a, 2, "");
            0 < b.length && Je(c, 2, b);
            b = P(a, 3, "");
            0 < b.length && Je(c, 3, b)
        }

        function Hg(a, c) {
            S(a, 1, c)
        }

        function Ig(a, c) {
            S(a, 2, c)
        }

        function Jg(a, c) {
            S(a, 3, c)
        }

        function eg(a, c) {
            for (; ue(c) && 4 != c.b;) switch (c.c) {
                case 1:
                    var b = xe(c);
                    Q(a, 1, b);
                    break;
                case 2:
                    b = ye(c);
                    S(a, 2, b);
                    break;
                case 3:
                    b = xe(c);
                    Q(a, 3, b);
                    break;
                case 4:
                    b = xe(c);
                    Q(a, 4, b);
                    break;
                case 5:
                    b = xe(c);
                    Q(a, 5, b);
                    break;
                case 6:
                    b = xe(c);
                    Q(a, 6, b);
                    break;
                case 7:
                    b = !!c.a.b();
                    R(a, 7, b, !1);
                    break;
                default:
                    ve(c)
            }
            return a
        }

        function sg(a, c) {
            var b = P(a, 1, 0);
            0 !== b && L(c, 1, b);
            b = P(a, 2, "");
            0 < b.length && Je(c, 2, b);
            b = P(a, 3, 0);
            0 !== b && L(c, 3, b);
            b = P(a, 4, 0);
            0 !== b && L(c, 4, b);
            b = P(a, 5, 0);
            0 !== b && L(c, 5, b);
            b = P(a, 6, 0);
            0 !== b && L(c, 6, b);
            (b = Re(a, 7)) && He(c, 7, b)
        }

        function gg(a, c) {
            for (; ue(c) && 4 != c.b;) switch (c.c) {
                case 1:
                    var b = xe(c);
                    Kg(a, b);
                    break;
                case 2:
                    b = xe(c);
                    Lg(a, b);
                    break;
                default:
                    ve(c)
            }
            return a
        }

        function ug(a, c) {
            var b = P(a, 1, 0);
            0 !== b && L(c, 1, b);
            b = P(a, 2, 0);
            0 !== b && L(c, 2, b)
        }

        function Kg(a, c) {
            Q(a, 1, c)
        }

        function Lg(a, c) {
            Q(a, 2, c)
        }

        function Wf(a, c) {
            S(a, 2, c)
        }

        function W(a) {
            return Te(a, Of, 3)
        }

        function Yf(a, c) {
            We(a, 3, c)
        }

        function Mg(a) {
            return null != O(a, 3)
        }

        function X(a) {
            return Te(a, Pf, 4)
        }

        function $f(a, c) {
            We(a, 4, c)
        }

        function pg(a) {
            return Te(a, Qf, 5)
        }

        function bg(a, c) {
            We(a, 5, c)
        }

        function Y(a) {
            return Te(a, Rf, 6)
        }

        function dg(a, c) {
            We(a, 6, c)
        }

        function fg(a, c) {
            Ve(a, Sf, 8);
            var b = a.a[8];
            b || (b = a.a[8] = []);
            var d = c ? c : new Sf;
            var e = O(a, 8);
            b.push(d);
            e.push(d.m)
        }

        function tg(a) {
            return Te(a, Tf, 9)
        }

        function hg(a, c) {
            We(a, 9, c)
        }

        function ig(a, c) {
            Q(a, 10, c)
        }

        function jg(a, c) {
            Q(a, 11, c)
        }

        function kg(a, c) {
            Q(a, 12, c)
        }

        function lg(a, c) {
            S(a, 13, c)
        }

        function Ng(a) {
            var c = new De;
            var b = P(a, 1, 0);
            0 !== b && K(c, 1, b);
            b = P(a, 2, "");
            0 < b.length && Je(c, 2, b);
            return Ge(c)
        }

        function Og(a, c) {
            S(a, 2, c)
        };

        function Pg() {
            0 != Qg && (Object.prototype.hasOwnProperty.call(this, za) && this[za] || (this[za] = ++Aa))
        }

        var Qg = 0;

        function Rg(a, c) {
            if (!ya(a)) if (a && "function" == typeof a.handleEvent) a = Da(a.handleEvent, a); else throw Error("Invalid listener argument");
            return 2147483647 < Number(c) ? -1 : n.setTimeout(a, c || 0)
        };

        function Sg(a, c, b) {
            Pg.call(this);
            this.j = null != b ? a.bind(b) : a;
            this.h = c;
            this.a = null;
            this.b = !1;
            this.c = null
        }

        Sg.prototype = ca(Pg.prototype);
        Sg.prototype.constructor = Sg;
        if (na) na(Sg, Pg); else for (var Tg in Pg) if ("prototype" != Tg) if (Object.defineProperties) {
            var Ug = Object.getOwnPropertyDescriptor(Pg, Tg);
            Ug && Object.defineProperty(Sg, Tg, Ug)
        } else Sg[Tg] = Pg[Tg];
        Sg.prototype.f = function (a) {
            this.a = arguments;
            this.c ? this.b = !0 : Vg(this)
        };

        function Vg(a) {
            a.c = Rg(function () {
                a.c = null;
                a.b && (a.b = !1, Vg(a))
            }, a.h);
            var c = a.a;
            a.a = null;
            a.j.apply(null, c)
        };

        function Wg() {
            this.C = qb.i();
            this.v = window;
            this.N = this.v.document;
            this.P = this.v.navigator;
            this.O = this.v.location;
            this.a = new ce;
            this.j = xd();
            this.c = new Set;
            this.h = [];
            this.s = new wb;
            this.f = xd();
            this.G = [];
            this.B = new wb;
            this.R = [];
            this.I = new wb;
            this.b = new Map;
            this.u = new Set;
            this.K = [];
            this.S = new Sg(function () {
                Xg(this)
            }, 2E3, this)
        }

        va(Wg);
        var Yg = Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Fa()).toString(36);

        function Zg(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            d = !1;
            b = c.init;
            null != b && Ja(b) && (d = b);
            b = c.block_id;
            if (null == b || !y(b) || 0 > b) I(e, Z("block_id")); else {
                var f = b;
                b = c.source_block_id;
                if (null != b && (!y(b) || 0 > b)) I(e, Z("source_block_id")); else {
                    var g = 0;
                    b = c.topic_id;
                    if (null != b) {
                        if (!y(b) || 0 > b) {
                            I(e, Z("topic_id"));
                            return
                        }
                        g = b
                    }
                    var h = 0;
                    b = c.strategy_id;
                    if (null != b) {
                        if (!y(b) || 0 > b) {
                            I(e, Z("strategy_id"));
                            return
                        }
                        h = b
                    }
                    var k = 0;
                    b = c.source_id;
                    null != b && y(b) && 0 < b && (k = b);
                    var m = 10;
                    b = c.count;
                    if (null != b) {
                        if (!y(b) ||
                            0 > b || 100 < b) {
                            I(e, Z("count"));
                            return
                        }
                        m = b
                    }
                    var p = 0;
                    b = c.fields;
                    if (null != b) if (y(b)) p = b; else {
                        I(e, Z("fields"));
                        return
                    }
                    var v = null;
                    b = c.filter_news;
                    if (null != b) if (Ka(b)) v = b; else {
                        I(e, Z("filter_news"));
                        return
                    }
                    var x = null;
                    b = window["jsapi_local_news_" + f];
                    if (null != b) if (Ka(b)) x = b; else {
                        I(e, Z("local_news"));
                        return
                    }
                    d && (a.c["delete"](f), a.u["delete"](f));
                    a.j = a.j.then(function () {
                        return new G(function (w) {
                            Sd(e, w);
                            Wc("jsapi.dao.Dao#getNews", function () {
                                if (null != x) {
                                    for (var A = [], U = 0, J = x.length; U < J && !(A.length >= m); U++) {
                                        var Ia =
                                            x[U];
                                        if (null != Ia && q(Ia)) {
                                            var Ra = Ia.id;
                                            if (null != Ra && y(Ra)) {
                                                if (null != v) {
                                                    if (0 <= Ma(v, Ra)) continue
                                                } else if (0 <= Ma(a.h, Ra)) continue; else a.h.push(Ra);
                                                A.push(Ia)
                                            }
                                        }
                                    }
                                    a.c.add(f);
                                    Od(e, A)
                                } else {
                                    U = 0 | (a.c.has(f) ? 1 : 0);
                                    var Ea = null;
                                    null != v ? (Ea = new wb, Na(v, function (qa) {
                                        xb(Ea, dc(qa))
                                    })) : null != a.s && (Ea = a.s);
                                    A = de++ % 65535;
                                    J = new mf;
                                    Q(J, 1, T(A));
                                    Q(J, 2, V(p));
                                    Q(J, 3, T(f));
                                    Q(J, 4, T(k));
                                    Q(J, 5, T(g));
                                    Q(J, 6, T(h));
                                    Q(J, 7, T(k));
                                    Q(J, 8, V(m));
                                    Q(J, 9, V(U));
                                    null != Ea && Bf(J, new Uint8Array(Sa(Ea.a.a)));
                                    U = ke(Af(J));
                                    ee(a.a, $g(a, "news", U), A, function (qa) {
                                        qa &&
                                        0 < qa.length && Na(qa, function ($a) {
                                            null == v && ($a = $a.id) && (a.h.push($a), xb(a.s, dc($a)))
                                        });
                                        a.c.add(f);
                                        Od(e, qa)
                                    }, function () {
                                        I(e, Error("Failed to get news"))
                                    })
                                }
                            }, function () {
                            }, function (A) {
                                I(e, A)
                            })
                        })
                    })
                }
            }
        }

        function ah(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            b = c.block_id;
            if (null == b || !y(b) || 0 > b) I(e, Z("block_id")); else {
                var f = b;
                b = c.news_id;
                if (null == b || !y(b) || 0 > b) I(e, Z("news_id")); else {
                    var g = b;
                    var h = 0;
                    b = c.image_width;
                    if (null != b) {
                        if (!y(b) || 0 > b) {
                            I(e, Z("image_width"));
                            return
                        }
                        h = b
                    }
                    var k = 0;
                    b = c.image_height;
                    if (null != b) {
                        if (!y(b) || 0 > b) {
                            I(e, Z("image_height"));
                            return
                        }
                        k = b
                    }
                    var m = 0;
                    b = c.fields;
                    if (null != b) if (y(b)) m = b; else {
                        I(e, Z("fields"));
                        return
                    }
                    var p = 0;
                    b = c.strategy_id;
                    if (null != b) {
                        if (!y(b) || 0 >
                            b) {
                            I(e, Z("strategy_id"));
                            return
                        }
                        p = b
                    }
                    var v = 0;
                    b = c.source_id;
                    null != b && y(b) && 0 < b && (v = b);
                    a.f = a.f.then(function () {
                        return new G(function (x) {
                            Sd(e, x);
                            Wc("jsapi.dao.Dao#getNewsDetails", function () {
                                var w = de++ % 65535, A = new lf;
                                Q(A, 1, T(w));
                                Q(A, 2, V(m));
                                Q(A, 3, T(f));
                                Q(A, 4, T(g));
                                Q(A, 5, V(h));
                                Q(A, 6, V(k));
                                Q(A, 7, V(p));
                                Q(A, 8, T(v));
                                A = ke(zf(A));
                                ee(a.a, $g(a, "news_details", A), w, function (U) {
                                    if (U) {
                                        var J = U.id;
                                        J && (a.h.push(J), xb(a.s, dc(J)))
                                    }
                                    Od(e, U)
                                }, function () {
                                    I(e, Error("Failed to get news details"))
                                })
                            }, function () {
                            }, function (w) {
                                I(e,
                                    w)
                            })
                        })
                    })
                }
            }
        }

        function bh(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            var f = new Uf;
            d = null;
            b = window.jsapi_rtb_ctx;
            if (null != b) try {
                d = Vf(me(b))
            } catch (g) {
            }
            b = c.user_id;
            if (null != b) if (u(b)) Og(f, Hf(b)); else {
                I(e, Z("user_id"));
                return
            } else if (null != d && Mg(d) && !B(P(W(d), 1, ""))) Og(f, P(W(d), 1, "")); else {
                I(e, Z("user_id"));
                return
            }
            a.j = a.j.then(function () {
                return new G(function (g) {
                    Sd(e, g);
                    Wc("jsapi.dao.Dao#getRtbCookieMatching", function () {
                        var h = de++ % 65535;
                        Q(f, 1, h);
                        var k = ke(Ng(f));
                        ee(a.a, "//" + ub(a.C) + "/jsapi?action=rtb_cookie_matching&payload=" +
                            k, h, function (m) {
                            q(m) && Array.isArray(m.urls) && Na(m.urls, function (p) {
                                if (u(p)) try {
                                    var v = window;
                                    v[Yg] || (v[Yg] = []);
                                    var x = Sc("img", {src: p, alt: ""});
                                    v[Yg].push(x)
                                } catch (w) {
                                }
                            });
                            Od(e, m)
                        }, function () {
                            I(e, Error("Failed to handle RTB CookieMatching"))
                        })
                    }, function () {
                    }, function (h) {
                        I(e, h)
                    })
                })
            })
        }

        function ch(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            var f = new Mf;
            b = null;
            var g = window.jsapi_rtb_ctx;
            if (null != g) try {
                b = Vf(me(g))
            } catch (m) {
            }
            d = !1;
            g = c.init;
            null != g && Ja(g) && (d = g);
            g = c.request_id;
            if (null != g) if (u(g)) Wf(f, Hf(g)); else {
                I(e, Z("request_id"));
                return
            } else Wf(f, Jf().toString());
            g = c.user;
            if (null != g) if (q(g)) {
                Yf(f, new Of);
                var h = g;
                g = h.id;
                if (null != g) if (u(g)) vg(W(f), Hf(g)); else {
                    I(e, Z("user.id"));
                    return
                } else null != b && Mg(b) && !B(P(W(b), 1, "")) && vg(W(f), P(W(b), 1, ""));
                g = h.created;
                if (null !=
                    g) {
                    if (!y(g) || 0 > g) {
                        I(e, Z("user.created"));
                        return
                    }
                    wg(W(f), V(g))
                } else null != b && Mg(b) && 0 !== P(W(b), 2, 0) && wg(W(f), P(W(b), 2, 0));
                g = h.session_id;
                if (null != g) if (u(g)) xg(W(f), Hf(g)); else {
                    I(e, Z("user.session_id"));
                    return
                } else null != b && Mg(b) && !B(P(W(b), 3, "")) && xg(W(f), P(W(b), 3, ""));
                g = h.locale;
                if (null != g) if (u(g)) yg(W(f), Hf(g)); else {
                    I(e, Z("user.locale"));
                    return
                } else null != b && Mg(b) && !B(P(W(b), 4, "")) && yg(W(f), P(W(b), 4, ""));
                g = h.ip;
                if (null != g) if (u(g)) zg(W(f), Hf(g)); else {
                    I(e, Z("user.ip"));
                    return
                } else null != b && Mg(b) &&
                !B(P(W(b), 5, "")) && zg(W(f), P(W(b), 5, ""));
                g = h.is_robot;
                if (null != g) if (Ja(g)) Ag(W(f), Gf(g)); else {
                    I(e, Z("user.is_robot"));
                    return
                } else null != b && Mg(b) && Ag(W(f), Re(W(b), 6))
            } else {
                I(e, Z("user"));
                return
            } else null != b && Mg(b) && Yf(f, W(b));
            g = c.device;
            if (null != g) if (q(g)) {
                $f(f, new Pf);
                h = g;
                g = h.screen_width;
                if (null != g) {
                    if (!y(g) || 0 > g) {
                        I(e, Z("device.screen_width"));
                        return
                    }
                    Bg(X(f), V(g))
                } else null != b && null != O(b, 4) && 0 !== P(X(b), 1, 0) && Bg(X(f), P(X(b), 1, 0));
                g = h.screen_height;
                if (null != g) {
                    if (!y(g) || 0 > g) {
                        I(e, Z("device.screen_height"));
                        return
                    }
                    Cg(X(f), V(g))
                } else null != b && null != O(b, 4) && 0 !== P(X(b), 2, 0) && Cg(X(f), P(X(b), 2, 0));
                g = h.user_agent;
                if (null != g) if (u(g)) Dg(X(f), Hf(g)); else {
                    I(e, Z("device.user_agent"));
                    return
                } else null != b && null != O(b, 4) && !B(P(X(b), 3, "")) && Dg(X(f), P(X(b), 3, ""))
            } else {
                I(e, Z("device"));
                return
            } else null != b && null != O(b, 4) && $f(f, X(b));
            null != O(f, 4) || $f(f, new Pf);
            0 === P(X(f), 1, 0) && (h = dh(a), null != h && 0 !== h && Bg(X(f), h));
            0 === P(X(f), 2, 0) && (h = eh(a), null != h && 0 !== h && Cg(X(f), h));
            B(P(X(f), 3, "")) && (h = a.P.userAgent, null == h || B(h) || Dg(X(f),
                h));
            g = c.site;
            if (null != g) if (q(g)) {
                bg(f, new Qf);
                h = g;
                g = h.id;
                if (null != g) {
                    if (!y(g) || 0 > g) {
                        I(e, Z("site.id"));
                        return
                    }
                    Eg(pg(f), V(g))
                } else null != b && null != O(b, 5) && 0 !== P(pg(b), 1, 0) && Eg(pg(f), P(pg(b), 1, 0));
                g = h.name;
                if (null != g) if (u(g)) Fg(pg(f), Hf(g)); else {
                    I(e, Z("site.name"));
                    return
                } else null != b && null != O(b, 5) && !B(P(pg(b), 2, "")) && Fg(pg(f), P(pg(b), 2, ""));
                g = h.domain;
                if (null != g) if (u(g)) Gg(pg(f), Hf(g)); else {
                    I(e, Z("site.domain"));
                    return
                } else null != b && null != O(b, 5) && !B(P(pg(b), 3, "")) && Gg(pg(f), P(pg(b), 3, ""))
            } else {
                I(e, Z("site"));
                return
            } else null != b && null != O(b, 5) && bg(f, pg(b));
            g = c.page;
            if (null != g) if (q(g)) {
                dg(f, new Rf);
                h = g;
                g = h.url;
                if (null != g) if (u(g)) Hg(Y(f), Hf(g)); else {
                    I(e, Z("page.url"));
                    return
                } else null != b && null != O(b, 6) && !B(P(Y(b), 1, "")) && Hg(Y(f), P(Y(b), 1, ""));
                g = h.canonical;
                if (null != g) if (u(g)) Ig(Y(f), Hf(g)); else {
                    I(e, Z("page.canonical"));
                    return
                } else null != b && null != O(b, 6) && !B(P(Y(b), 2, "")) && Ig(Y(f), P(Y(b), 2, ""));
                g = h.referrer;
                if (null != g) if (u(g)) Jg(Y(f), Hf(g)); else {
                    I(e, Z("page.referrer"));
                    return
                } else null != b && null != O(b, 6) && !B(P(Y(b),
                    3, "")) && Jg(Y(f), P(Y(b), 3, ""))
            } else {
                I(e, Z("page"));
                return
            } else null != b && null != O(b, 6) && dg(f, Y(b));
            null != O(f, 6) || dg(f, new Rf);
            B(P(Y(f), 1, "")) && (h = a.O.href, null == h || B(h) || Hg(Y(f), h));
            B(P(Y(f), 2, "")) && (h = fh(), null == h || B(h) || Ig(Y(f), h));
            B(P(Y(f), 3, "")) && (h = a.N.referrer, null == h || B(h) || Jg(Y(f), h));
            var k = null;
            g = c.filter_ids;
            if (null != g) if (Array.isArray(g)) k = g; else {
                I(e, Z("filter_ids"));
                return
            }
            g = c.blocks;
            if (null != g) if (Array.isArray(g)) Na(g, function (m, p) {
                if (q(m)) {
                    var v = new Sf;
                    g = m.block_id;
                    if (null != g) {
                        if (!y(g) ||
                            0 > g) {
                            I(e, Z("blocks[" + p + "].block_id"));
                            return
                        }
                        Q(v, 1, V(g))
                    }
                    g = m.tag_id;
                    if (null != g) if (u(g)) S(v, 2, Hf(g)); else {
                        I(e, Z("blocks[" + p + "].tag_id"));
                        return
                    }
                    g = m.fields;
                    if (null != g) {
                        if (!y(g) || 0 > g) {
                            I(e, Z("blocks[" + p + "].fields"));
                            return
                        }
                        Q(v, 3, V(g))
                    }
                    g = m.count;
                    if (null != g) {
                        if (!y(g) || 0 > g) {
                            I(e, Z("blocks[" + p + "].count"));
                            return
                        }
                        Q(v, 4, V(g))
                    }
                    g = m.image_width;
                    if (null != g) {
                        if (!y(g) || 0 > g) {
                            I(e, Z("blocks[" + p + "].image_width"));
                            return
                        }
                        Q(v, 5, V(g))
                    }
                    g = m.image_height;
                    if (null != g) {
                        if (!y(g) || 0 > g) {
                            I(e, Z("blocks[" + p + "].image_height"));
                            return
                        }
                        Q(v,
                            6, V(g))
                    }
                    g = m.ignore_block_view;
                    if (null != g) if (Ja(g)) R(v, 7, Gf(g), !1); else {
                        I(e, Z("blocks[" + p + "].ignore_block_view"));
                        return
                    } else {
                        var x = Gf(a.c.has(P(v, 1, 0)));
                        R(v, 7, x, !1)
                    }
                    fg(f, v)
                }
            }); else {
                I(e, Z("blocks"));
                return
            }
            g = c.adpreview;
            if (null != g) if (q(g)) {
                hg(f, new Tf);
                h = g;
                g = h.main_news_id;
                if (null != g) {
                    if (!y(g) || 0 > g) {
                        I(e, Z("adpreview.main_news_id"));
                        return
                    }
                    Kg(tg(f), V(g))
                } else null != b && null != O(b, 9) && 0 !== P(tg(b), 1, 0) && Kg(tg(f), P(tg(b), 1, 0));
                g = h.body_id;
                if (null != g) {
                    if (!y(g) || 0 > g) {
                        I(e, Z("adpreview.body_id"));
                        return
                    }
                    Lg(tg(f),
                        V(g))
                } else null != b && null != O(b, 9) && 0 !== P(tg(b), 2, 0) && Lg(tg(f), P(tg(b), 2, 0))
            } else {
                I(e, Z("adpreview"));
                return
            } else null != b && null != O(b, 9) && hg(f, tg(b));
            g = c.source_block_id;
            if (null != g) {
                if (!y(g) || 0 > g) {
                    I(e, Z("source_block_id"));
                    return
                }
                ig(f, V(g))
            } else null != b && 0 !== P(b, 10, 0) && ig(f, P(b, 10, 0));
            g = c.source_id;
            if (null != g) {
                if (!y(g) || 0 > g) {
                    I(e, Z("source_id"));
                    return
                }
                jg(f, V(g))
            } else null != b && 0 !== P(b, 11, 0) && jg(f, P(b, 11, 0));
            g = c.strategy_id;
            if (null != g) {
                if (!y(g) || 0 > g) {
                    I(e, Z("strategy_id"));
                    return
                }
                kg(f, V(g))
            } else null !=
            b && 0 !== P(b, 12, 0) && kg(f, P(b, 12, 0));
            g = c.ab_test;
            if (null != g) if (u(g)) lg(f, Hf(g)); else {
                I(e, Z("ab_test"));
                return
            } else null == b || B(P(b, 13, "")) || lg(f, P(b, 13, ""));
            d && Na(Ue(f, Sf, 8), function (m) {
                a.c["delete"](P(m, 1, 0));
                a.u["delete"](P(m, 1, 0))
            });
            a.j = a.j.then(function () {
                return new G(function (m) {
                    Sd(e, m);
                    Wc("jsapi.dao.Dao#getRtbNews", function () {
                        var p = de++ % 65535;
                        Q(f, 1, p);
                        Se(f, 7, (null != k && Ha(k) ? k : a.h) || []);
                        var v = ke(mg(f));
                        ee(a.a, "//" + ub(a.C) + "/jsapi?action=rtb_news&payload=" + v, p, function (x) {
                            if (q(x) && (Array.isArray(x.blocks) &&
                            Na(x.blocks, function (w) {
                                q(w) && (y(w.block_id) && a.c.add(w.block_id), Array.isArray(w.items) && Na(w.items, function (A) {
                                    y(A.id) && (A = A.id, a.h.push(A), xb(a.s, dc(A)))
                                }))
                            }), Array.isArray(x.trace))) try {
                                Na(x.trace, function (w) {
                                    if (q(w) && u(w.type) && Ha(w.value)) {
                                        var A = w.value;
                                        switch (w.type) {
                                            case "info":
                                                w = console.info;
                                                break;
                                            case "warn":
                                                w = console.warn;
                                                break;
                                            case "error":
                                                w = console.error;
                                                break;
                                            case "table":
                                                w = console.table;
                                                break;
                                            default:
                                                w = console.log
                                        }
                                        w.call(this, A)
                                    }
                                })
                            } catch (w) {
                                console.error("Failed to process RTB trace object")
                            }
                            Od(e,
                                x)
                        }, function () {
                            I(e, Error("Failed to get RTB news"))
                        })
                    }, function () {
                    }, function (p) {
                        I(e, p)
                    })
                })
            })
        }

        function gh(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            d = !1;
            b = c.init;
            null != b && Ja(b) && (d = b);
            b = c.block_id;
            if (null == b || !y(b) || 0 > b) I(e, Z("block_id")); else {
                var f = b;
                var g = 1;
                b = c.sort_type;
                null != b && (y(b) ? g = b : I(e, Z("sort_type")));
                var h = 10;
                b = c.count;
                if (null != b) {
                    if (!y(b) || 0 > b || 100 < b) {
                        I(e, Z("count"));
                        return
                    }
                    h = b
                }
                var k = 0;
                b = c.fields;
                if (null != b) if (y(b)) k = b; else {
                    I(e, Z("fields"));
                    return
                }
                var m = !1;
                b = c.has_images;
                if (null != b) if (Ja(b)) m = b; else {
                    I(e, Z("has_images"));
                    return
                }
                var p = !1;
                b = c.has_amp_url;
                if (null != b) if (Ja(b)) p = b; else {
                    I(e, Z("has_amp_url"));
                    return
                }
                var v = !1;
                b = c.has_recommend;
                if (null != b) if (Ja(b)) v = b; else {
                    I(e, Z("has_recommend"));
                    return
                }
                var x = !1;
                b = c.is_good_feed;
                if (null != b) if (Ja(b)) x = b; else {
                    I(e, Z("is_good_feed"));
                    return
                }
                var w = 1;
                b = c.ctx;
                if (null != b) if (y(b)) w = b; else {
                    I(e, Z("ctx"));
                    return
                }
                var A = 0;
                b = c.story;
                if (null != b) if (y(b)) A = b; else {
                    I(e, Z("story"));
                    return
                }
                var U = 0;
                b = c.story_article;
                if (null != b) if (y(b)) U = b; else {
                    I(e, Z("story_article"));
                    return
                }
                var J = null;
                b = c.filter_ids;
                if (null != b) if (Ka(b)) J = b; else {
                    I(e,
                        Z("filter_ids"));
                    return
                }
                var Ia = null;
                b = c.topics;
                if (null != b) if (Ka(b)) Ia = b; else {
                    I(e, Z("topics"));
                    return
                }
                var Ra = 0;
                b = c.publisher;
                if (null != b) if (y(b)) Ra = b; else {
                    I(e, Z("publisher"));
                    return
                }
                var Ea = null;
                b = c.filter_publishers;
                if (null != b) if (Ka(b)) Ea = b; else {
                    I(e, Z("filter_publishers"));
                    return
                }
                var qa = null;
                b = c.loc_id;
                if (null != b) if (y(b)) qa = b; else {
                    I(e, Z("loc_id"));
                    return
                }
                var $a = 0;
                b = c.strategy_id;
                if (null != b) {
                    if (!y(b) || 0 > b) {
                        I(e, Z("strategy_id"));
                        return
                    }
                    $a = b
                }
                var bf = 0;
                b = c.trend_id;
                if (null != b) if (y(b)) bf = b; else {
                    I(e, Z("trend_id"));
                    return
                }
                var cf = 0;
                b = c.tag_id;
                if (null != b) if (y(b)) cf = b; else {
                    I(e, Z("tag_id"));
                    return
                }
                var df = 0;
                b = c.image_width;
                if (null != b) {
                    if (!y(b) || 0 > b) {
                        I(e, Z("image_width"));
                        return
                    }
                    df = b
                }
                var ef = 0;
                b = c.image_height;
                if (null != b) {
                    if (!y(b) || 0 > b) {
                        I(e, Z("image_height"));
                        return
                    }
                    ef = b
                }
                var ff = 0;
                b = c.similar_article_id;
                if (null != b) if (y(b)) ff = b; else {
                    I(e, Z("similar_article_id"));
                    return
                }
                d && (a.b["delete"](f), a.u["delete"](f));
                a.f = a.f.then(function () {
                    return new G(function (ih) {
                        Sd(e, ih);
                        Wc("jsapi.dao.Dao#getArticles", function () {
                            var Kb = null !=
                            J ? J.length : a.b.has(f) ? a.b.get(f) : 0;
                            var gf = new vb(128);
                            null != Ia && 0 < Ia.length && Na(Ia, function (ja) {
                                0 < ja && 128 > ja && gf.set(ja)
                            });
                            var hf = new wb;
                            null != Ea && 0 < Ea.length && Na(Ea, function (ja) {
                                xb(hf, dc(ja))
                            });
                            qa = null != qa ? qa : -1;
                            var Lb = 0 | (a.b.has(f) ? 1 : 0);
                            Lb |= m ? 2 : 0;
                            Lb |= p ? 4 : 0;
                            Lb |= v ? 8 : 0;
                            Lb |= x ? 16 : 0;
                            if (null != J) {
                                var pd = new wb;
                                Na(J, function (ja) {
                                    xb(pd, dc(ja))
                                })
                            } else pd = 2 === w ? a.I : a.B;
                            var jf = de++ % 65535, D = new Ze;
                            Q(D, 1, T(jf));
                            Q(D, 2, V(k));
                            Q(D, 3, T(f));
                            switch (w) {
                                case 2:
                                    R(D, 4, 1, 0);
                                    break;
                                default:
                                    R(D, 4, 0, 0)
                            }
                            switch (g) {
                                case 2:
                                    R(D, 5,
                                        1, 0);
                                    break;
                                case 4:
                                    R(D, 5, 2, 0);
                                    break;
                                case 8:
                                    R(D, 5, 3, 0);
                                    break;
                                case 16:
                                    R(D, 5, 4, 0);
                                    break;
                                case 32:
                                    R(D, 5, 5, 0);
                                    break;
                                case 64:
                                    R(D, 5, 6, 0);
                                    break;
                                case 128:
                                    R(D, 5, 7, 0);
                                    break;
                                case 256:
                                    R(D, 5, 8, 0);
                                    break;
                                case 512:
                                    R(D, 5, 9, 0);
                                    break;
                                case 1024:
                                    R(D, 5, 10, 0);
                                    break;
                                case 2048:
                                    R(D, 5, 11, 0);
                                    break;
                                default:
                                    R(D, 5, 0, 0)
                            }
                            Q(D, 6, V(h));
                            Q(D, 7, V(Kb));
                            Q(D, 8, V(Lb));
                            Q(D, 9, V(df));
                            Q(D, 10, V(ef));
                            Q(D, 11, V($a));
                            uf(D, new Uint8Array(Sa(pd.a.a)));
                            Q(D, 13, T(qa));
                            vf(D, new Uint8Array(Sa(gf.a)));
                            Q(D, 15, T(Ra));
                            wf(D, new Uint8Array(Sa(hf.a.a)));
                            Q(D, 17, T(A));
                            Q(D, 19, T(U));
                            Q(D, 20, T(bf));
                            Q(D, 21, T(cf));
                            Q(D, 23, T(ff));
                            Kb = ke(tf(D));
                            ee(a.a, $g(a, "articles", Kb), jf, function (ja) {
                                null == J && ja && 0 < ja.length && (Na(ja, function (Mb) {
                                    var qd = Mb.id;
                                    qd && (a.G.push(qd), xb(a.B, dc(qd)));
                                    if (Mb = Mb.story_id) a.R.push(Mb), xb(a.I, dc(Mb))
                                }), a.b.set(f, (a.b.has(f) ? a.b.get(f) : 0) + ja.length));
                                Od(e, ja)
                            }, function () {
                                I(e, Error("Failed to get articles"))
                            })
                        }, function () {
                        }, function (Kb) {
                            I(e, Kb)
                        })
                    })
                })
            }
        }

        function hh(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            b = c.block_id;
            if (null == b || !y(b) || 0 > b) I(e, Z("block_id")); else {
                var f = b;
                b = c.article_id;
                if (null == b || !y(b) || 0 > b) I(e, Z("article_id")); else {
                    var g = b;
                    var h = 0;
                    b = c.image_width;
                    if (null != b) {
                        if (!y(b) || 0 > b) {
                            I(e, Z("image_width"));
                            return
                        }
                        h = b
                    }
                    var k = 0;
                    b = c.image_height;
                    if (null != b) {
                        if (!y(b) || 0 > b) {
                            I(e, Z("image_height"));
                            return
                        }
                        k = b
                    }
                    var m = 0;
                    b = c.fields;
                    if (null != b) if (y(b)) m = b; else {
                        I(e, Z("fields"));
                        return
                    }
                    var p = 0;
                    b = c.strategy_id;
                    if (null != b) {
                        if (!y(b) ||
                            0 > b) {
                            I(e, Z("strategy_id"));
                            return
                        }
                        p = b
                    }
                    a.f = a.f.then(function () {
                        return new G(function (v) {
                            Sd(e, v);
                            Wc("jsapi.dao.Dao#getArticleDetails", function () {
                                var x = de++ % 65535, w = new Ye;
                                Q(w, 1, T(x));
                                Q(w, 2, V(m));
                                Q(w, 3, T(f));
                                Q(w, 4, T(g));
                                Q(w, 5, V(h));
                                Q(w, 6, V(k));
                                Q(w, 7, V(p));
                                w = ke(sf(w));
                                ee(a.a, $g(a, "article_details", w), x, function (A) {
                                    if (A) {
                                        var U = A.id;
                                        U && (a.G.push(U), xb(a.B, dc(U)))
                                    }
                                    Od(e, A)
                                }, function () {
                                    I(e, Error("Failed to get article details"))
                                })
                            }, function () {
                            }, function (x) {
                                I(e, x)
                            })
                        })
                    })
                }
            }
        }

        function jh(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            b = c.block_id;
            if (null == b || !y(b) || 0 > b) I(e, Z("block_id")); else {
                var f = b;
                var g = 10;
                b = c.tags_count;
                null != b && (!y(b) || 0 > b ? I(e, Z("tags_count")) : g = b);
                var h = 1;
                b = c.tags_type;
                null != b && (y(b) ? h = b : I(e, Z("tags_type")));
                var k = 0;
                b = c.fields;
                if (null != b) if (y(b)) k = b; else {
                    I(e, Z("fields"));
                    return
                }
                Wc("jsapi.dao.Dao#getProperties", function () {
                    var m = de++ % 65535, p = new nf;
                    Q(p, 1, T(m));
                    Q(p, 2, T(f));
                    Q(p, 3, T(g));
                    switch (h) {
                        case 1:
                            R(p, 4, 1, 0);
                            break;
                        case 2:
                            R(p,
                                4, 2, 0);
                            break;
                        default:
                            R(p, 4, 0, 0)
                    }
                    Q(p, 5, V(k));
                    p = ke(Cf(p));
                    ee(a.a, $g(a, "properties", p), m, function (v) {
                        Od(e, v)
                    }, function () {
                        I(e, Error("Failed to get properties"))
                    })
                }, function () {
                }, function (m) {
                    I(e, m)
                })
            }
        }

        function kh(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            b = c.block_id;
            if (null == b || !y(b) || 0 > b) I(e, Z("block_id")); else {
                var f = b;
                b = c.tag_id;
                if (null == b || !y(b) || 0 > b) I(e, Z("tag_id")); else {
                    var g = b;
                    Wc("jsapi.dao.Dao#getTagDetails", function () {
                        var h = de++ % 65535, k = new of;
                        Q(k, 1, T(h));
                        Q(k, 3, T(f));
                        Q(k, 2, T(g));
                        k = ke(Df(k));
                        ee(a.a, $g(a, "tag_details", k), h, function (m) {
                            Od(e, m)
                        }, function () {
                            I(e, Error("Failed to get tag details"))
                        })
                    }, function () {
                    }, function (h) {
                        I(e, h)
                    })
                }
            }
        }

        function lh(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            var f = c.block_id;
            null == f || !y(f) || 0 > f ? I(e, Z("block_id")) : Wc("jsapi.dao.Dao#getLocation", function () {
                var g = de++ % 65535, h = new kf;
                Q(h, 1, T(g));
                Q(h, 2, T(f));
                h = ke(yf(h));
                ee(a.a, $g(a, "location", h), g, function (k) {
                    Od(e, k)
                }, function () {
                    I(e, Error("Failed to get location"))
                })
            }, function () {
            }, function (g) {
                I(e, g)
            })
        }

        function mh(a, c, b, d) {
            var e = new H;
            null != b && z(b) && Pd(e, b);
            null != d && z(d) && Rd(e, d);
            var f = c.block_id;
            null == f || !y(f) || 0 > f ? I(e, Z("block_id")) : Wc("jsapi.dao.Dao#getCurrency", function () {
                var g = de++ % 65535, h = new af;
                Q(h, 1, T(g));
                Q(h, 2, T(f));
                h = ke(xf(h));
                ee(a.a, $g(a, "currency", h), g, function (k) {
                    Od(e, k)
                }, function () {
                    I(e, Error("Failed to get currency"))
                })
            }, function () {
            }, function (g) {
                I(e, g)
            })
        }

        function nh(a, c) {
            null != c && (Ka(c) ? Na(c, function (b) {
                q(b) && oh(a, b)
            }) : q(c) && oh(a, c))
        }

        function oh(a, c) {
            var b = 0;
            var d = c.news_id;
            if (null != d) if (y(d)) b = d; else return;
            var e = 0;
            d = c.article_id;
            if (null != d) if (y(d)) e = d; else return;
            var f = 0;
            d = c.block_id;
            if (null != d) if (y(d)) f = d; else return;
            var g = 0;
            d = c.strategy_id;
            if (null != d) {
                if (!y(d) || 0 > d) return;
                g = d
            }
            var h = 0;
            d = c.source_id;
            if (null != d) if (y(d)) h = d; else return;
            var k = null;
            d = c.bvuuid;
            if (null != d) if (u(d)) k = d; else return;
            var m = null;
            d = c.ignore_block_view;
            null != d && Ja(d) && (m = d);
            var p = null;
            d = c.ab_test;
            if (null != d) if (u(d)) p = d; else return;
            d = new rf;
            0 !== b && Q(d, 1, T(b));
            0 !== e && Q(d, 2, T(e));
            0 !== f && (Q(d, 3, T(f)), null != m ? R(d, 7, Gf(m), !1) : (b = Gf(a.u.has(f)), R(d, 7, b, !1)), a.u.add(f));
            0 !== g && Q(d, 4, V(g));
            0 !== h && Q(d, 5, T(h));
            null == k || B(k) || S(d, 6, Hf(k));
            null == p || B(p) || S(d, 8, Hf(p));
            a.K.push(d);
            a.S.f()
        }

        function Xg(a) {
            for (var c = [], b; null != (b = a.K.pop());) c.push(b);
            0 !== c.length && Wc("jsapi.dao.Dao#viewability", function () {
                var d = de++ % 65535, e = new pf;
                Q(e, 1, T(d));
                Xe(e, c);
                e = ke(Ef(e));
                ee(a.a, $g(a, "viewability", e), d, function () {
                }, function () {
                })
            }, function () {
            }, function () {
            })
        }

        function Z(a) {
            return Error("The '" + a + "' parameter is invalid")
        }

        function fh() {
            try {
                var a = Pc();
                if (null != a && xa(a)) {
                    var c = Oa(a, function (d) {
                        return "canonical" === d.getAttribute("rel") && null != d.getAttribute("href")
                    }), b;
                    if (0 != c.length && !B(b = c[0].getAttribute("href"))) return b
                }
            } catch (d) {
            }
            return null
        }

        function dh(a) {
            a = a.v.screen;
            return Ha(a) && (a = a.width, Ha(a)) ? a : 0
        }

        function eh(a) {
            a = a.v.screen;
            return Ha(a) && (a = a.height, Ha(a)) ? a : 0
        }

        function $g(a, c, b) {
            return "//" + tb(a.C) + "/newdata/jsapi?action=" + c + "&payload=" + b
        };r("JsDao.Config.getAppName", function () {
            qb.i();
            return "JsDao Library"
        });
        r("JsDao.Config.getAppVersion", function () {
            qb.i();
            return "3.6.0"
        });
        r("JsDao.Config.getAppNameVersion", function () {
            return sb(qb.i())
        });
        r("JsDao.Config.getDomain", function () {
            return tb(qb.i())
        });
        r("JsDao.Config.setDomain", function (a) {
            qb.i().a = rb(a)
        });
        r("JsDao.Config.getRtbDomain", function () {
            return ub(qb.i())
        });
        r("JsDao.Config.setRtbDomain", function (a) {
            qb.i().b = rb(a)
        });
        r("JsDao.ArticleField.DATE", 1);
        r("JsDao.ArticleField.IMAGE", 2);
        r("JsDao.ArticleField.TITLE", 4);
        r("JsDao.ArticleField.TOPIC", 8);
        r("JsDao.ArticleField.ANNOUNCE", 16);
        r("JsDao.ArticleField.TEXT", 32);
        r("JsDao.ArticleField.SHARE_URL", 64);
        r("JsDao.ArticleField.PUBLISHER_ID", 128);
        r("JsDao.ArticleField.PUBLISHER_NAME", 256);
        r("JsDao.ArticleField.PUBLISHER_DOMAIN", 512);
        r("JsDao.ArticleField.PUBLISHER_LOGO_URL", 1024);
        r("JsDao.ArticleField.SHARES", 2048);
        r("JsDao.ArticleField.VOTES", 4096);
        r("JsDao.ArticleField.COMMENTS", 8192);
        r("JsDao.ArticleField.KEYWORDS", 32768);
        r("JsDao.ArticleField.STORY_MARK", 16384);
        r("JsDao.ArticleField.TAGS", 65536);
        r("JsDao.ArticleField.TRENDS", 131072);
        r("JsDao.ArticleField.FULLTEXT_PROPERTIES", 262144);
        r("JsDao.ArticleField.ORIGINAL_URL", 524288);
        r("JsDao.ArticleField.MT_POST_ID", 1048576);
        r("JsDao.ArticleField.RANKS", 2097152);
        r("JsDao.NewsField.TYPE", 1);
        r("JsDao.NewsField.IMAGE", 2);
        r("JsDao.NewsField.TOPIC", 4);
        r("JsDao.NewsField.TITLE", 8);
        r("JsDao.NewsField.TEXT", 16);
        r("JsDao.NewsField.DOMAIN", 32);
        r("JsDao.NewsField.AUTHOR", 64);
        r("JsDao.NewsField.DATE", 128);
        r("JsDao.NewsField.SHARES", 256);
        r("JsDao.NewsField.VOTES", 512);
        r("JsDao.NewsField.COMMENTS", 1024);
        r("JsDao.NewsField.LOGO", 2048);
        r("JsDao.NewsField.PARTNER_TYPE", 4096);
        r("JsDao.NewsField.VIDEO_URL", 8192);
        r("JsDao.RtbNewsField.DATETIME", 1);
        r("JsDao.RtbNewsField.TITLE", 2);
        r("JsDao.RtbNewsField.ANNOUNCE", 4);
        r("JsDao.RtbNewsField.IMAGE", 8);
        r("JsDao.RtbNewsField.CATEGORY", 16);
        r("JsDao.RtbNewsField.KEYWORDS", 32);
        r("JsDao.RtbNewsField.PUBLISHER", 64);
        r("JsDao.PropertyField.LOCATIONS", 1);
        r("JsDao.PropertyField.TOPICS", 2);
        r("JsDao.PropertyField.PUBLISHERS", 4);
        r("JsDao.PropertyField.TRENDS", 8);
        r("JsDao.PropertyField.TAGS", 16);
        r("JsDao.SortType.RANK", 1);
        r("JsDao.SortType.SEARCH", 2);
        r("JsDao.SortType.SOCIAL", 4);
        r("JsDao.SortType.DATE", 8);
        r("JsDao.SortType.LOCAL", 16);
        r("JsDao.SortType.NEWS", 32);
        r("JsDao.SortType.RANK24", 64);
        r("JsDao.SortType.SEARCH24", 128);
        r("JsDao.SortType.SOCIAL24", 256);
        r("JsDao.SortType.DATE24", 512);
        r("JsDao.SortType.LOCAL24", 1024);
        r("JsDao.SortType.NEWS24", 2048);
        r("JsDao.Context.ARTICLES", 1);
        r("JsDao.Context.STORIES", 2);
        r("JsDao.StoryMark.DEFAULT", 0);
        r("JsDao.StoryMark.IMPORTANT", 1);
        r("JsDao.TagType.ALL", 0);
        r("JsDao.TagType.MAIN", 1);
        r("JsDao.TagType.PERSON", 2);
        r("JsDao.getArticles", function (a, c, b) {
            return gh(Wg.i(), a, c, b)
        });
        r("JsDao.getArticleDetails", function (a, c, b) {
            return hh(Wg.i(), a, c, b)
        });
        r("JsDao.getCurrency", function (a, c, b) {
            return mh(Wg.i(), a, c, b)
        });
        r("JsDao.getLocation", function (a, c, b) {
            return lh(Wg.i(), a, c, b)
        });
        r("JsDao.getNews", function (a, c, b) {
            return Zg(Wg.i(), a, c, b)
        });
        r("JsDao.getNewsDetails", function (a, c, b) {
            return ah(Wg.i(), a, c, b)
        });
        r("JsDao.rtbCookieMatching", function (a, c, b) {
            return bh(Wg.i(), a, c, b)
        });
        r("JsDao.getRtbNews", function (a, c, b) {
            return ch(Wg.i(), a, c, b)
        });
        r("JsDao.getProperties", function (a, c, b) {
            return jh(Wg.i(), a, c, b)
        });
        r("JsDao.getTagDetails", function (a, c, b) {
            return kh(Wg.i(), a, c, b)
        });
        r("JsDao.enqueueViewability", function (a) {
            return nh(Wg.i(), a)
        });
        (function () {
            var a = window.jsdao;
            if (a) {
                a.push = function (a) {
                    try {
                        a()
                    } catch (b) {
                    }
                };
                for (var b; b = a.shift();) try {
                    b()
                } catch (c) {
                }
            }
        })()
    }());
}
