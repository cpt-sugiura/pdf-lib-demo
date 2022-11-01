import yoga from "yoga-layout-prebuilt";

const Node = yoga.Node;

// フレックスボックスのルートになる箱の要素の生成
const rootNode = Node.create();
// 大きさの確定
rootNode.setWidth(170);
rootNode.setHeight(97);
rootNode.setPadding(yoga.EDGE_ALL, 5)
// 内部の並び方の確定
rootNode.setJustifyContent(yoga.JUSTIFY_SPACE_BETWEEN);
rootNode.setAlignItems(yoga.ALIGN_CENTER);
rootNode.setFlexWrap(yoga.WRAP_WRAP);
rootNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

// フレックスボックス内部の要素の生成
const one = Node.create();
one.setWidth(60);
one.setHeight(40);
// // 右側にマージンをつける
// one.setMargin(yoga.EDGE_RIGHT, 12);

// フレックスボックス内部の生成
const two = Node.create();
two.setWidth(60);
two.setHeight(40);

// フレックスボックス内部の生成
const three = Node.create();
three.setWidth(60);
three.setHeight(40);

// 親子関係を生成
rootNode.insertChild(one, 0);
rootNode.insertChild(two, 1);
rootNode.insertChild(three, 2);

// 配置を計算
rootNode.calculateLayout(500, 300, yoga.DIRECTION_LTR);

console.log(JSON.stringify(rootNode.getComputedLayout()));
console.log(JSON.stringify(one.getComputedLayout()));
console.log(JSON.stringify(two.getComputedLayout()));
console.log(JSON.stringify(three.getComputedLayout()));
// {"left":0,"right":0,"top":0,"bottom":0,"width":220,"height":97}
// {"left":0,"right":0,"top":9,"bottom":0,"width":60,"height":40}
// {"left":0,"right":0,"top":49,"bottom":0,"width":60,"height":40}
// {"left":60,"right":0,"top":29,"bottom":0,"width":60,"height":40}

// ↑を元に position: absolute と座標と大きさ指定でデザイン生成の例
function layout2el(l) {
  const el = document.createElement("div");
  el.style.top = l.top + "px";
  el.style.left = l.left + "px";
  el.style.width = l.width + "px";
  el.style.height = l.height + "px";
  el.style.position = "absolute";
  el.style.border = "solid 1px #000";
  return el;
}
const rootEl = layout2el(rootNode.getComputedLayout());
rootEl.style.position = "relative";
const oneEl = layout2el(one.getComputedLayout());
oneEl.innerText = "one";
const twoEl = layout2el(two.getComputedLayout());
twoEl.innerText = "two";
const threeEl = layout2el(three.getComputedLayout());
threeEl.innerText = "three";
rootEl.appendChild(oneEl);
rootEl.appendChild(twoEl);
rootEl.appendChild(threeEl);
document.getElementById("app").appendChild(rootEl);

// position absolute でセット
// 見える
// pdf-lib などでこれを使うと便利
// 世がとあは違うけどｇりｄもある
// javascript はブラウザゲーム界などcanvasを使ってなんやかんや座標直指定の出番があるからか
// レイアウトエンジンのライブラリが探すと見つかります。
