!function(){var t,e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}function o(t){e.disabled=t,n.disabled=!t}e.addEventListener("click",(function(){o(!0),t=setInterval(a,1e3)})),n.addEventListener("click",(function(){clearInterval(t),o(!1)}))}();
//# sourceMappingURL=01-color-switcher.d4a9b0b4.js.map