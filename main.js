addLinkToStorage = e => {
   e.preventDefault();
   const enterName = document.querySelector("#name").value;
   const enterLink = document.querySelector("#url").value;

   const valueObj = {
      name: enterName,
      link: enterLink
   };
   if (!checkValidateForm(enterName, enterLink)) {
      return false;
   }

   if (localStorage.getItem("saveLinks") === null) {
      const saveLinks = [];
      saveLinks.push(valueObj);
      localStorage.setItem("saveLinks", JSON.stringify(saveLinks));
   } else {
      const saveLinks = JSON.parse(localStorage.getItem("saveLinks"));
      saveLinks.push(valueObj);
      localStorage.setItem("saveLinks", JSON.stringify(saveLinks));
   }
   getLinkfromStorage();

   document.querySelector(".submitForm").reset();
};

removeLink = link => {
   const saveLinks = JSON.parse(localStorage.getItem("saveLinks"));
   for (var i = 0; i < saveLinks.length; i++) {
      if (saveLinks[i].link == link) {
         saveLinks.splice(i, 1);
      }
   }
   localStorage.setItem("saveLinks", JSON.stringify(saveLinks));
   getLinkfromStorage();
};
checkValidateForm = (enterName, enterLink) => {
   if (!enterName || !enterLink) {
      alert("Empty field(s). Please, fill in. ");
      return;
   }
   const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
   const regex = new RegExp(expression);

   if (!enterLink.match(regex)) {
      alert("Wrong URL. Please, paste correct one.");
      return;
   }
   return true;
};

getLinkfromStorage = () => {
   const saveLinks = JSON.parse(localStorage.getItem("saveLinks"));
   console.log(saveLinks);

   const showAddedLinks = document.querySelector(".showAddedLinks");

   const mapResult = saveLinks
      .map(item => {
         return `<div class='item'><h3>${item.name}</h3><a href=${
            item.link
         } target='_blank'><div class="right"><i class="fas fa-hand-pointer"><p>Click</p></i></a><i class='fas fa-trash' onclick="removeLink('${
            item.link
         }')"></i></div></div>`;
      })
      .join("");
   showAddedLinks.innerHTML = mapResult;
};
const hideHeader = () => {
   const header = document.querySelector("header");
   setTimeout(() => {
      header.classList.add("hide");
   }, 10000);
};

window.addEventListener("load", hideHeader);
document.querySelector(".submitForm").addEventListener("submit", addLinkToStorage);
window.addEventListener("load", getLinkfromStorage);
