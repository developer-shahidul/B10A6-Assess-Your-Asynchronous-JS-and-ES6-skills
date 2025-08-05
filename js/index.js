//
// loading
setTimeout(() => {
  const loader = document.getElementById("body-loader");
  loader.style.display = "none";
}, 2000);

//
const loadAnimalCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log("error :", err));
};

const displayCatagories = (item) => {
  const CatagoryContainer = document.getElementById("animale-catagories");
  CatagoryContainer.innerHTML = ""; // আগেরগুলা ক্লিয়ার করো

  item.forEach((category) => {
    const btn = document.createElement("button");
    btn.className =
      " focus:bg-[#0E7A8110] focus:[border-radius:120px] p-6 rounded-lg border h-full w-full flex gap-6 justify-center items-center";

    btn.innerHTML = `
      <img class="category-btn size-14" src="${category.category_icon}" />
      <h2 class="text-6 font-bold ">${category.category}</h2>
    `;

    // ✅ Click event attach
    btn.addEventListener("click", () => {
      loadCatagoriesName(category.category);
    });

    CatagoryContainer.appendChild(btn);
  });
};
////////////////////////////////////////// click pets naem or show pets
const loadCatagoriesName = (name) => {
  const animleContainer = document.getElementById("animale-container");

  animleContainer.classList.remove("grid");

  // ধাপ ১: কন্টেইনার খালি করে সেখানে সরাসরি একটি লোডার বসিয়ে দিন
  animleContainer.innerHTML = `
    <div class="w-full h-full flex justify-center items-center">
      <span class="loading loading-bars loading-lg text-primary"></span>
    </div>
  `;

  // ধাপ ২: দুটি Promise তৈরি করা
  // Promise 1: API থেকে ডেটা আনা
  const fetchData = fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${name}`
  ).then((res) => res.json());

  // Promise 2: ২ সেকেন্ডের একটি ডিলে তৈরি করা
  const delay = new Promise((resolve) => setTimeout(resolve, 2000)); // 2000ms = 2 সেকেন্ড

  // ধাপ ৩: Promise.all() দিয়ে দুটি কাজই শেষ হওয়ার জন্য অপেক্ষা করা
  Promise.all([fetchData, delay])
    .then(([dataResult]) => {
      // যখন ডেটা এবং ডিলে দুটোই সম্পন্ন হবে, তখন এই কোড চলবে
      // dataResult হলো fetchData থেকে পাওয়া ডেটা
      displyAnimales(dataResult.data);
    })

    .catch((error) => console.log(error));
};
loadAnimalCatagories();

//////////////////////////////////

// all animals load////////////////////
const loadAllAnimales = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displyAnimales(data.pets))
    .catch((error) => console.log(error));
};
loadAllAnimales();

const displyAnimales = (animales) => {
  // for sort
  allPets = animales;
  //
  const animleContainer = document.getElementById("animale-container");
  animleContainer.innerHTML = "";

  if (!animales || animales.length === 0) {
    animleContainer.classList.remove("grid");
    animleContainer.innerHTML = `
    <div class="min-h-[400px] flex flex-col gap-5 justify-center items-center text-center bg-[#13131303] rounded-lg
    ">
    <img class="size-[155px]" src="./images/error.webp" Alt=""/>

    <h2 class="text-center text-3xl font-bold">No Information Available</h2>
    <p class="text-base text-[#13131370] lg:w-[760px]">It is a long established fact that a reader will be distracted by the readable content of a page
     when looking at its layout. The point of using Lorem Ipsum is that it has a.
    </p>
    </div>`;
    return;
  } else {
    animleContainer.classList.add("grid");
  }
  animales.forEach((animal) => {
    const div = document.createElement("div");
    div.className = "animale-card border p-5 rounded-lg";
    div.innerHTML = `
    <div class="h-[160px mb-6"><img class="h-full w-full object-cover rounded-lg" src="${
      animal.image
    }" alt=""/></div>
     <div>
     <h3 class="text-xl font-bold">${animal.pet_name}</h3>
      <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/plumpy/24/deviation.png" alt=""/> 
      <p class="text-base text-[#13131370]">Breed : <span>${
        animal.breed ?? "N/A"
      }</span> </p></div>

      <div class="flex gap-2"><img class="size-5 object-cover rounded-lg" 
      src="https://img.icons8.com/material-outlined/48/calendar--v1.png" alt=""/>
       <p class="text-base text-[#13131370]">Birth : <span>${
         animal.date_of_birth ?? "Date unavailable"
       }</span> </p>
       </div>

      <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/windows/32/gender.png" alt=""/>
       <p class="text-base text-[#13131370]">Gender : <span>${
         animal.gender ?? "Others"
       }</span> </p>
       </div>

      <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/material-outlined/48/us-dollar--v1.png" alt=""/> 
      <p class="text-base text-[#13131370]">Price :  <span>${
        animal.price ?? "Free"
      }</span> 💲 </p></div>

     </div>
     <hr/>
    <div class="flex flex-row gap-2 py-2">

<button onclick="loadanimalId('${animal._id}"
     class="like-btn p-2 border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2
      focus:ring-blue-500 transition">
     <img
    class="size-5 object-cover"
    src="https://img.icons8.com/material-rounded/50/facebook-like.png"
    alt="Like icon"
     />
</button>

    <button id="disAdapt"  class="adopt-btn py-[9px] px-[16px] border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2
     focus:ring-blue-500 transition">Adopt</button>

    <button onclick="loadanimalId('${
      animal.petId
    }')" class="py-[9px] px-[16px] border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2
     focus:ring-blue-500 transition">Details</button>
    </div>
    `;
    const btn = div.querySelector(".like-btn");
    btn.addEventListener("click", () => {
      loadpetsId(animal.petId, btn);
    });

    const adoptBtn = div.querySelector(".adopt-btn"); // ⬅️ adopt button টা খুঁজে আনলাম

    // ⬇️ এখন ইভেন্ট বসাও
    adoptBtn.addEventListener("click", () => {
      showAdoptModal(adoptBtn); // ⬅️ এই adopt button কে পাঠাচ্ছি
    });
    animleContainer.appendChild(div);
  });
};

// adopt aer jonnno
///////////////////////////
const showAdoptModal = (adoptBtn) => {
  const modal = document.getElementById("my_modal_3");
  const countdown = document.getElementById("adopt-countdown");

  // id container check pacce ne
  if (!modal || !countdown || !adoptBtn) {
    console.error("Modal or button not found!");
    return;
  }

  let number = 3;
  countdown.textContent = number;
  modal.showModal();

  const adaptId = setInterval(() => {
    number--;
    countdown.textContent = number;

    if (number === 0) {
      clearInterval(adaptId);
      modal.close();

      adoptBtn.disabled = true;
      adoptBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
  }, 1000);
};
// like to photo add///////////////////////////////////
const loadpetsId = async (animalId, clickedButton) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${animalId}`
    );
    const data = await res.json();
    animalLike(data);
  } catch (error) {
    console.log("error  :", error);
  }
};

const animalLike = (data) => {
  const likeContainer = document.getElementById("like-animale");
  // console.log(data.petData);
  const pet = data.petData;
  const div = document.createElement("div");
  div.className = "h-24";

  div.innerHTML = `
    <img src="${pet.image}" class="w-full h-full object-cover rounded" />
    `;
  likeContainer.appendChild(div);
};
/////////////////////////////////////////////////
// sort
let allPets = []; // global scope e rakha
const sortByprice = (viewStr) => {
  if (!viewStr) return 0; // null, undefined, empty string হলে 0 return করো
  return parseFloat(viewStr.toString().replace(/[^0-9.]/g, ""));
};

const sortAnimalPrice = () => {
  const animleContainer = document.getElementById("animale-container");

  // ⏳ Step 1: প্রথমে লোডার দেখাও
  animleContainer.innerHTML = `
      <div class="w-full h-full flex justify-center items-center">
        <span class="loading loading-bars loading-lg text-primary"></span>
      </div>
    `;
  animleContainer.classList.remove("grid");
  setTimeout(() => {
    allPets.sort((a, b) => {
      return sortByprice(b.price) - sortByprice(a.price);
    });
    animleContainer.classList.add("grid");
    // আগে পুরনোগুলো মুছে ফেলো
    animleContainer.innerHTML = "";

    // তারপর নতুনগুলো দেখাও
    displyAnimales(allPets);
  }, 2000);
};

////////////////// datails
/////////////////////////////////////////
const loadanimalId = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    const data = await res.json();
    displayAnimaleDatails(data.petData);
  } catch (err) {
    console.log("error :", err);
  }
};

const displayAnimaleDatails = (datails) => {
  const datailsButtonContainer = document.getElementById("AnimalesDatails");
  // console.log(datails);
  datailsButtonContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div>
      <div class="h-80">
      <img class="h-full w-full object-cover rounded-lg" src="${
        datails.image
      }" alt=""/>
      </div>
  <h2 class="text-xl font-bold mb-4">${datails.pet_name}</h2>
  <div class="flex gap-28 my-4">
   <div class="flex flex-col gap-2">
        <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/plumpy/24/deviation.png" alt=""/> 
      <p class="text-base text-[#13131370]">Breed : <span>${
        datails.breed ?? "N/A"
      }</span>
     </p> 
      </div>  
          <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/windows/32/gender.png" alt=""/>
       <p class="text-base text-[#13131370]">Gender : <span>${
         datails.gender ?? "Others"
       }</span> </p>
       </div>
            <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/windows/32/gender.png" alt=""/>
       <p class="text-base text-[#13131370]">vaccinated_status : <span>${
         datails.vaccinated_status ?? "Others"
       }</span> </p>
       </div>
  </div>
  
  <div class="flex flex-col gap-2">
       <div class="flex gap-2"><img class="size-5 object-cover rounded-lg" 
      src="https://img.icons8.com/material-outlined/48/calendar--v1.png" alt=""/>
       <p class="text-base text-[#13131370]">Birth : <span>${
         datails.date_of_birth ?? "Date unavailable"
       }</span> </p>
       </div>
       <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/material-outlined/48/us-dollar--v1.png" alt=""/> 
      <p class="text-base text-[#13131370]">Price :  <span>${
        datails.price ?? "Free"
      }💲 </p>
        
      </span> 
     </div>
  </div>
  
  </div> 
  <hr/>
  <div class="py-4">  
 <h2 class="text-base font-semibold mb-3">Details Information</h2>
  <p class="text-base text-[#13131370]">${datails.pet_details}</p>
 
</div>
       <div class="modal-action justify-center w-full">
              <form method="dialog " class="w-full">
                <!-- if there is a button in form, it will close the modal -->
                <button  class="btn w-full bg-[#0E7A8120]">Close</button>
              </form>
        </div> 
</div>

`;
  datailsButtonContainer.appendChild(div);
  //way 1

  // document.getElementById("showModalData").click();

  // way 2

  document.getElementById("my_modal_5").showModal();
};

const loader = clickedButton.querySelector(".like-loader");
const icon = clickedButton.querySelector(".like-icon");

// const number = 0;
// const clockId = setInterval(() => {
//   number++;
//   // console.log(clockId, number);
//   if (number > 10) {
//     clearInterval(clockId);
//   }
//   console.log(clockId, number);
// }, 2000); // 2s porpor cholte oi thakbe
