const addBtn = document.getElementById("addSkill");
const skillsBox = document.getElementById("skillsBox");

addBtn.onclick = function(){

let skill = prompt("Enter a skill");

if(skill && skill.trim() !== ""){

let tag = document.createElement("div");
tag.className = "skill";
tag.innerHTML = skill + " <span>x</span>";

tag.querySelector("span").onclick = function(){
tag.remove();
};

skillsBox.appendChild(tag);

}

};