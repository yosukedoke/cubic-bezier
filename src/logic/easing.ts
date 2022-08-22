export type EasingFunction = (t: number) => number

export const Linear = (t: number) => t

export const CubicBezier = (p1x: number, p1y: number, p2x: number, p2y: number) => {
  // Refer: https://web.analogstd.com/tips/posts/js/cubic-bezier.php
  const cx = 3 * p1x,
    bx = 3 * (p2x - p1x) - cx,
    ax = 1 - cx - bx
  const cy = 3 * p1y,
    by = 3 * (p2y - p1y) - cy,
    ay = 1 - cy - by

  // 媒介変数表示したX座標
  const bezierX = function (time: number) {
    return time * (cx + time * (bx + time * ax))
  }

  // X座標のt微分
  const bezierDX = function(time: number){
    return cx + time * (2 * bx + 3 * ax * time)
  }
  // ニュートン法で数値解析する
  const newtonRaphson = (x: number)=> {
    if(x <= 0){
      return 0
    }
    if(x >= 1){
      return 1
    }
    
    let prev, t = x

    do{
      prev = t
      t = t - ((bezierX(t) - x) / bezierDX(t))
    } while(Math.abs(t - prev) > 1e-4)
    return t
  }
  
  return (time: number) => {
    // const x = calcBezier(t, p0x, p1x, p2x, p3x)
    // const y = calcBezier(x, p0y, p1y, p2y, p3y)

		const t = newtonRaphson(time)
		// Y座標(Easing量)を計算する
		return t * (cy + t * (by + t * ay))
  }
}

