// Function to handle drag events
function allowDrop(event) {
  event.preventDefault();
}
function cha() {
  var blogPreview = document.getElementById("blogPreview");

  var a = document.querySelector("textarea").value;
  blogPreview.append(a);
}
function nee(es) {
  console.log(es.target);
  var modal = document.getElementById("rmm");
  var a = modal.showModal();
  document.getElementById("yyyy").onclick = () => {
    var s = document.querySelectorAll("#" + es.target.parentElement.id);
    var i = 0;
    s?.forEach((item) => {
      if (
        item.getAttribute("no") == es.target.parentElement.getAttribute("no")
      ) {
        i++;
      }
    });
    console.log(i);
    // if (i > 1) {
    es.target.parentElement.remove();
    es.target?.remove();
    // } else {
    //   document.querySelectorAll("#blogContent").forEach((item) => {
    //     if (
    //       item.getAttribute("no") == es.target.parentElement.getAttribute("no")
    //     ) {
    //       item.remove();
    //       document.getElementById(
    //         "txts" + es.target.parentElement.getAttribute("no")
    //       );
    //       es.target.parentElement.remove();
    //       es.target?.remove();
    //     }
    //   });
    // }
  };
}
function txtchange(event) {
  const textarea = document.getElementById("blogContent");
  // alert(event.target.getAttribute("no"));
  var num = event.target.getAttribute("no");
  const blogPreview = document.getElementById("blogPreview");
  if (document.getElementById("txts" + num)) {
    var ty = document.getElementById("txts" + num);
    ty.innerText = event.target.value;
  } else {
    var a = document.createElement("div");
    a.id = "txts" + num;
    a.innerText = event.target.value;
    blogPreview.append(a);
  }
}

// Add the event listener to the textarea
const textarea = document.getElementById("blogContent");
textarea.addEventListener("change", txtchange);

function drop(event) {
  localStorage.setItem("flag", "false");
  event.preventDefault();
  var files = event.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();

    reader.onload = function (e) {
      var fileType = file.type.split("/")[0];
      var element;

      if (fileType === "image") {
        element = document.createElement("img");
        element.src = e.target.result;
      } else if (fileType === "video") {
        element = document.createElement("video");
        element.src = e.target.result;
        element.controls = true;
      }

      if (element) {
        var blogContent = document.getElementById("blogContent");
        var blogPreview = document.getElementById("blogPreview");
        var w = document.createElement("div");
        w.id = "nhh";
        w.appendChild(element);
        w.setAttribute(
          "no",
          parseInt(document.querySelectorAll("#blogContent").length)
        );
        element.onclick = (e) => nee(e);
        blogPreview.appendChild(w);

        localStorage.setItem("flag", "true");
        // blogContent.value += "\n\n" + e.target.result;
      }
    };

    reader.readAsDataURL(file);
  }

  reader.onloadend = () => {
    if (localStorage.getItem("flag") == "true") {
      var ttty = parseInt(document.querySelectorAll("#blogContent").length);
      var aas = document.createElement("textarea");
      aas.id = "blogContent";
      aas.placeholder =
        "Continue writing from here to write after the " +
        ttty +
        " set of image/videos";
      aas.onchange = (e) => txtchange(e);
      aas.setAttribute("no", ttty);
      document.getElementById("editor").append(aas);
      var blogPreview = document.getElementById("blogPreview");
      let num = parseInt(document.querySelectorAll("#blogContent").length);
      var a = document.createElement("div");
      a.id = "txts" + ttty;
      blogPreview.append(a);
    } else {
      alert(100);
    }
  };
}
