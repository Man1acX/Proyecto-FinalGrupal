const submitBtn = document.getElementById("submit-btn");
const topBtn = document.getElementById("topbtn");
const footerEl = document.getElementById("footer");

function generateGif() {

  footerEl.style.display = "none";
  setTimeout(function(){
    footerEl.style.display = "block";
  }, 4000);
  

  const loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none";


  const q = document.getElementById("search-box").value;

  let gifCount = 50;

  const finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML = "";


  fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
      console.log(info.data);
      topFunction();


      const gifsData = info.data;

      if (gifsData.length === 0) {
        alert("No se encontro Gifs para la busqueda actual.");
        loader.style.display = "none";
      }else{
        
          gifsData.forEach((gif) => {
            topFunction();

            const container = document.createElement("div");
            container.classList.add("container");
            const iframe = document.createElement("img");
            console.log(gif);
            iframe.setAttribute("src", gif.images.downsized_medium.url);
            iframe.onload = () => {
    
              gifCount--;
              if (gifCount == 0) {
    
                loader.style.display = "none";
                document.querySelector(".wrapper").style.display = "grid";
              }
            };
            container.append(iframe);
    
    
            const copyBtn = document.createElement("button");
            copyBtn.innerText = "Get Gif";
            copyBtn.onclick = () => {
              topFunction();

              const copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
    
              navigator.clipboard
                .writeText(copyLink)
                .then(() => {
                  alert("GIF copied to clipboard");
                })
                .catch(() => {
    
                  alert("GIF copied to clipboard");
    
                  const hiddenInput = document.createElement("input");
                  hiddenInput.setAttribute("type", "text");
                  document.body.appendChild(hiddenInput);
                  hiddenInput.value = copyLink;
    
                  hiddenInput.select();
    
                  document.execCommand("copy");
    
                  document.body.removeChild(hiddenInput);
                });
            };
            container.append(copyBtn);
            document.querySelector(".wrapper").append(container);
          });
      }
    });
};
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

function topFunction(){
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);