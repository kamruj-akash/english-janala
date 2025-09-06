// re-useable functions
const getID = (id) => document.getElementById(id);

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((lessons) => allLessons(lessons.data));
};

const allLessons = (lessons) => {
  const levelContainer = getID("level_Container");
  levelContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <button id="active-Btn-${lesson.level_no}"  onClick="loadLessonLevel(${lesson.level_no})" class="btn bg-transparent border-2 border-[#422AD5] text-[#422AD5]  hover:text-white hover:bg-[#422AD5] remove-active" ><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no} </button>
    `;
    levelContainer.append(newDiv);
  });
};

const loadLessonLevel = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      lessonWords(data.data);
      removeActive();
      const activeBtn = getID(`active-Btn-${id}`);
      activeBtn.classList.add("bg-[#422AD5]", "text-white");
      activeBtn.classList.remove("bg-transparent");
    });
};

const removeActive = () => {
  const removeActiveBtn = document.querySelectorAll(".remove-active");
  removeActiveBtn.forEach((btn) =>
    btn.classList.remove("bg-[#422AD5]", "text-white")
  );
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  modalPopUp(details);
};

const manageSpinner = (spin) => {
  if (spin == true) {
    getID("spinner").classList.remove("hidden");
    getID("words_cards").classList.add("hidden");
  } else {
    getID("spinner").classList.add("hidden");
    getID("words_cards").classList.remove("hidden");
  }
};

const synonymsLoad = (arr) => {
  const joinArr = arr.map(
    (arr) =>
      `<button class="btn bg-[#EDF7FF] text-black font-normal">${arr}</button>`
  );
  return joinArr.join(" ");
};

const modalPopUp = (word) => {
  getID("modal_popUp").showModal();
  const modalDiv = getID("word_info_div");
  modalDiv.innerHTML = "";
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
            <h2 class="card-title text-4xl">
              ${
                word.data.word
              } (<i class="fa-solid fa-microphone-lines"></i>:>${
    word.data.pronunciation
  })
            </h2>
            <p class="mt-3 text-xl font-thin">Meaning</p>
            <h2 class="card-title text-2xl text-bangla">${
              word.data.meaning
            }</h2>
            <p class="mt-3 text-xl font-thin">Example</p>
            <h2 class="card-title text-xl font-normal text-bangla">
             ${word.data.sentence}
            </h2>
            <p class="mt-3 mb-1 text-xl text-bangla font-thin">
              সমার্থক শব্দ গুলো
            </p>
            <div class="flex gap-2">${synonymsLoad(word.data.synonyms)}</div>
  `;
  modalDiv.appendChild(newDiv);
};

const lessonWords = (words) => {
  const wordsCards = getID("words_cards");
  wordsCards.innerHTML = "";
  if (words.length == 0) {
    wordsCards.innerHTML = `
    <div class="col-span-full items-center flex flex-col text-center ">
    <img src="../assets/alert-error.png" alt="alert">
     <p class="my-4 text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="card-title text-4xl text-bangla">
          নেক্সট Lesson এ যান
          </h2>
        </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((words) => {
    const word = words.word;
    const meaning = words.meaning;
    const pronunciation = words.pronunciation;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class="card text-black bg-white rounded-lg p-5">
          <div class="card-body items-center text-center">
            <h2 class="card-title text-4xl">${word ? word : "undefined"}</h2>
            <p class="my-4 text-xl">Meaning / Pronounciation</p>
            <h2 class="card-title text-4xl text-bangla">"${
              meaning ? meaning : "undefined"
            } / ${pronunciation ? pronunciation : "undefined"}"</h2>
          </div>
          
          <div class="flex justify-between w-full">
              <button id="word_info_btn" class="btn btn-ghost"
                  onclick="loadWordDetails(${words.id})" >
                  
                  <i class="fa-solid fa-circle-info"></i>
              </button>

              <button id="word_speak_btn" class="btn btn-ghost">
                <i class="fa-solid fa-volume-high"></i>
              </button>
          </div>
      </div> 
    `;
    //my_modal_1.showModal() -> modal function
    wordsCards.appendChild(newDiv);
  });
  manageSpinner(false);
};
// default function call
loadLessons();
