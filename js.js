console.log("first");
var colorList = [];

$("#selectLimit").select2();
$("#selectLimit").val(5);
// $("#selectLimit").val(null).trigger("change");

const generateRandomColor = () => {
  return [...Array(6)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
};

const getRandomWidth = () => {
  return Math.round(Math.random() * 1000) + 50;
};

const getRandomHeight = () => {
  return Math.round(Math.random() * 200) + 50;
};

const generateListRandomColor = (count) => {
  console.log(generateRandomColor);
  let list = [];
  for (let index = 0; index < count; index++) {
    let a = "#" + generateRandomColor();
    list.push(a);
  }
  console.log("cek list", list);
  return list;
};

const getRandomColor = async () => {
  await $.ajax({
    type: "get",
    url: "https://random-flat-colors.vercel.app/api/random?count=5",
    success: async (res) => {
      console.log("test", res.colors);
      result = res.colors;
      addElementColor(res.colors);
    },
    error: (err) => {
      alert(err);
    },
  });
};

const getColorDetail = async (hex) => {
  let result;
  hex = hex.substring(1);
  await $.ajax({
    type: "get",
    url: "https://www.thecolorapi.com/id?hex=" + hex,
    success: async (res) => {
      console.log("color detail", res);
      result = res;
    },
    error: (err) => {
      alert(err);
    },
  });
  return result;
};

const addElementColor = async (data) => {
  console.log("cek data");
  for (const element of data) {
    let a = await getColorDetail(element);
    let width = getRandomWidth();
    let height = getRandomHeight();
    console.log("first color", a);
    $("#color").append(
      `<div id="colorList" style="background-color:${element};width:${width}px;">
        <span style="color:${a?.contrast?.value}">${a?.hex?.value}</span>
        <span style="color:${a?.contrast?.value}">${a?.name?.value}</span>
      </div>`
    );
  }
};

let listColor = generateListRandomColor(5);
addElementColor(listColor);

$("#selectLimit").on("change", () => {
  $("#color").empty();
  let count = $("#selectLimit").val();
  let x = generateListRandomColor(count);
  addElementColor(x);
  console.log("first", $("#selectLimit").val());
});
