let close_rules = document.querySelector(".rules-close");
let rules_btn = document.querySelector(".rules-btn");
let rules = document.querySelector(".rules");

let items = document.querySelectorAll(".game");

let component_1 = document.querySelector(".comp-1");
let component_2 = document.querySelector(".comp-2");

let placeholder = document.querySelector(".placeholder");

let left_side = document.querySelector(".left-side");
let right_side = document.querySelector(".right-side");

let play_again_btn = document.querySelector(".play-again-btn");
let message = document.querySelector(".msg");

let score_num = document.querySelector(".score-num");

rules_btn.addEventListener('click', () => {
    rules.style.display = "inline-block";
    document.querySelector(".black-screen").style.display = "block";
});

close_rules.addEventListener('click', () => {
    rules.style.display = "none";
    document.querySelector(".black-screen").style.display = "none";
});

items.forEach((item,index) => {
    item.addEventListener('click', () => {
        let items_clone = Array.from(items);
        items_clone.splice(index,1);
        let picked_item = item.cloneNode(true);
        let random_item = items_clone[Math.floor(Math.random() * items_clone.length)].cloneNode(true);
        
        picked_item.classList.remove("game");
        picked_item.classList.add("picked");
        picked_item.classList.remove("rock");
        picked_item.classList.remove("paper");
        picked_item.classList.remove("scissors");

        if (picked_item.hasAttribute("rock")) {
            picked_item.classList.add("rock-2");
        } else if (picked_item.hasAttribute("paper")) {
            picked_item.classList.add("paper-2");
        } else if (picked_item.hasAttribute("scissors")) {
            picked_item.classList.add("scissors-2");
        }

        random_item.classList.remove("game");
        random_item.classList.add("enemy-picked");
        random_item.classList.remove("rock");
        random_item.classList.remove("paper");
        random_item.classList.remove("scissors");

        if (random_item.hasAttribute("rock")) {
            random_item.classList.add("rock-2");
        } else if (random_item.hasAttribute("paper")) {
            random_item.classList.add("paper-2");
        } else if (random_item.hasAttribute("scissors")) {
            random_item.classList.add("scissors-2");
        }

        component_1.style.display = "none";
        component_2.style.display = "block";
        left_side.appendChild(picked_item);

        placeholder.style.display = "none";

        console.log(picked_item);
        console.log(random_item);

        setTimeout(() => {
            right_side.appendChild(random_item);
        },1000);

        setTimeout(() => {
            left_side.classList.add("left-side-anim");
            right_side.classList.add("right-side-anim");

            if (
                picked_item.classList.contains("rock-2") && random_item.classList.contains("scissors-2") ||
                picked_item.classList.contains("scissors-2") && random_item.classList.contains("paper-2") ||
                picked_item.classList.contains("paper-2") && random_item.classList.contains("rock-2")
            ) {
                picked_item.classList.add("highlighted");
                play_again_btn.style.display = "block";
                play_again_btn.style.color = "var(--dark-blue)";
                message.style.display = "block";
                message.innerText = "YOU WIN"
                score_num.innerText++;
            } else {
                random_item.classList.add("highlighted");
                play_again_btn.style.display = "block";
                play_again_btn.style.color = "var(--usual-red)";
                message.style.display = "block";
                message.innerText = "YOU LOSE";
                if (score_num.innerText > 0) {
                    score_num.innerText--;
                }
            }
        },1500);
    });
});

play_again_btn.addEventListener('click', () => {
    component_2.querySelectorAll(".item").forEach((item) => {
        item.classList.remove("highlighted");
    });
    left_side.removeChild(component_2.querySelector(".picked"));
    right_side.removeChild(component_2.querySelector(".enemy-picked"));
    left_side.classList.remove("left-side-anim");
    right_side.classList.remove("right-side-anim");
    placeholder.style.display = "block";
    message.style.display = "none";
    play_again_btn.style.display = "none";
    component_2.style.display = "none";
    component_1.style.display = "flex";
});