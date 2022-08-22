# Cubic bezier のプロパティインスペクターを再現する

## 確認方法

```
npm i
npm run dev
```

Launch `http://localhost:5173/` on your browser.

## 概要設計

### ユースケース

```
<cubic-bezier-editor v-model:easing="cubic-bezier(.17,.67,.83,.67)" />
```

### 入力

```
props: {
  easing: String
}
```

```
emits: {
  ['update:easing']: (payload: string) => boolean
}
```

## 詳細設計

### EasingFunction

```
// 0 <= t <= 1
type EasingFunction = (t: number) => number
```

### CubicBezier

@see https://drafts.csswg.org/css-easing-1/#cubic-bzier-easing-function

- px1: `number` [0.0-1.0]
- py1: `number` [0.0-1.0]
- px2: `number` [0.0-1.0]
- py2: `number` [0.0-1.0]

```
type CubicBezier = (px1: number, py1: number, px2: number, py2: number) => EasingFunction

// const t = 0.2
// const v = cubicBezier(px1, py1, px2, py2)(t)
```

### parseStringFuction

```
type parseFunction = (name: string) => (value: string) => string[]

// const [px1, py1, px2, py2] = parseFunction('cubic-bezier')(value).map((v) => Number(v))
```

### Utils

- `type isNumber = (value: unknown) => boolean`
- `type clamp = (value: number, min: number, max: number) => number`
- `type percent = (min: number, max: number) => (value: number) => number`
- `type mapEasing = (from: number, to: number, easing: EasingFunction) => (t: number) => number `

### ラフの実装イメージ

```
const mapEasing = (from: number, to: number, easing: EasingFunction) => (t: number) => from + (to - from) * easing(t)

const easing = cubicBezier(px1, py1, px2, py2)
const from = 10
const to = 100
const value = mapEasing(from, to, easing)

const duration = 3000
const update = (time: number) => {
  const t = percent(time / duration)
  return value(t)
}
```
