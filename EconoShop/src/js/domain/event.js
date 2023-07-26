const events = [
    { name: "Econovation Summer Dev", date: "7월 28일", image: "../img/EventBlock.png" },
    { name: "Econo Shop booth event", date: "7월 28일", image: "../img/boothevent.png" },
  ];
  
  const eventblock = document.querySelector("#event-block");
  
  const eventHTML = events.map(
    (event) => `
    <div class="event-div">
      <div>
        <img class="event-img" src="${event.image}" alt="${event.name}">
      </div>
      <div class="contents">
        <span class="name">${event.name}</span>
        <span class="date">${event.date}</span>
      </div>
    </div>
  `
  );
  console.log(eventHTML);
  const alleventsHTML = eventHTML.join("");
  console.log(alleventsHTML);
  eventblock.innerHTML = alleventsHTML;