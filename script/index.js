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
    <button onClick="loadLessonLevel(${lesson.level_no})" class="btn bg-transparent border-2 border-[#422AD5] text-[#422AD5]" ><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no} </button>
    `;
    levelContainer.append(newDiv);
  });
};

const loadLessonLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => lessonWords(data.data));
};

const lessonWords = (words) => {
  const wordsCards = getID("words_cards");
  wordsCards.innerHTML = "";
  words.forEach((words) => {
    const word = words.word;
    const meaning = words.meaning;
    const pronunciation = words.pronunciation;

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class="card text-black bg-white rounded-lg">
          <div class="card-body items-center text-center">
            <h2 class="card-title text-4xl">${word}</h2>
            <p class="my-4 text-xl">Meaning /Pronounciation</p>
            <h2 class="card-title text-4xl text-bangla">"${meaning} / ${pronunciation}"</h2>
            <div class="justify-between w-full">
              <button class="btn btn-ghost">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button class="btn btn-ghost">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        </div>
    `;
    wordsCards.appendChild(newDiv);
  });
};
// default function call
loadLessons();
